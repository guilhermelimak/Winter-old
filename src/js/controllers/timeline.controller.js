(() => {
	'use strict';

	angular
	.module('winter')
	.controller('TimelineController', ['$scope', '$interval', 'Twitter','$sce', 'Modal', 'HotkeyRegistry', 'UserStorage', '$compile', ($scope, $interval, Twitter, $sce, Modal, HotkeyRegistry, UserStorage, $compile) => {
		const client = new Twitter();

		$scope.tweets = [];

		$scope.user = UserStorage.user;

		$scope.logTweet = (tweet) => console.log(tweet);

		$scope.retweet = retweet;
		$scope.favorite = favorite;
		$scope.showReplyModal = Modal.showReplyModal;
		$scope.showProfileModal = Modal.showProfileModal;
		$scope.showPictureModal = Modal.showPictureModal;

		const regex = {
			mention: /((@)[^\s]+)/ig,
			url: /((http|https):\/\/[^\s]+)/gi
		};

		const patterns = {
			url: '<a onclick="openUrl(\'$1\')">$1</a>',
			mention: '<a onclick="openUrl(\'https://twitter.com/$1\')">$1</a>'
		};

		function _initialize() {
			new HotkeyRegistry();

			getTweets();
			startStream();
		}

		function getTweets() {
			client.getTimeline('home', (data, response) => {
				$scope.tweets = data.map(_detectLinks);
				$scope.$apply();
			});
		}

		function startStream() {
			client.getStream('user', { "with": "followings" }, (data, response) => {
				var wasRetweetedByUser = _wasRetweetedByUser(data)
				,		hasKeys = Object.keys(data).length != 0;

				if (_receivedReply(data)) {
					_notify(data);
				}

				if (wasRetweetedByUser) {
					data.retweeted_by_user = true;

					client.statuses("show", { id: data.id_str }, (data, response) => {
						console.log(data, response);
					});
				}

				if (data.friends == undefined &&
						data.created_at !== undefined &&
						hasKeys &&
						!data.retweeted_by_user) {
					console.log(data, 'added');
					$scope.tweets.unshift(_detectLinks(data));
					$scope.$apply();
				} else {
					console.log(data, wasRetweetedByUser ? 'retweet not added' : 'not added');
				}
			});
		}

		function retweet(tweet, index) {
			if (tweet.retweeted || tweet.retweeted_by_user) {
				client.statuses("destroy", { id: tweet.retweet_id_str }, () => _toggleRetweet(index));
			} else {
				client.statuses("retweet", { id: tweet.id_str }, (data, response) => _toggleRetweet(index, data));
			}
		}

		function favorite(tweet) {
			var type = tweet.favorited ? 'destroy' : 'create';

			client.favorites(type, { id: tweet.id_str }, () => {
				tweet.favorited = !tweet.favorited;
				$scope.$apply();
			});
		}

		function reply(replyObject) {
			client.statuses('update', replyObject, angular.noop);
		}

		function _getRetweetStatus(tweet) {
			client.statuses('retweet', { id: tweet.id_str })
		}

		function _wasRetweetedByUser(data) {
			return data.retweeted || (data.retweeted_status && data.user.screen_name == UserStorage.user.screen_name);
		}

		function _receivedReply(data) {
			return (data.in_reply_to_screen_name === UserStorage.user.screen_name);
		}

		function _notify(data) {
			if (Notification.permission !== "granted") {
				Notification.requestPermission();
			} else {
				new Notification(`Mention: ${data.text}`);
			}
		}

		function _toggleRetweet(index, data) {
			if (!data) {
				$scope.tweets[index].retweet_count--;
				$scope.tweets[index].retweet_id_str = null;
			} else {
				$scope.tweets[index].retweet_count++;
				$scope.tweets[index].retweet_id_str = data.id_str;
			}

			$scope.tweets[index].retweeted_by_user = !$scope.tweets[index].retweeted_by_user;
			$scope.$apply();
		}

		function _detectLinks(tweet) {
			try {
				if (tweet.retweeted_status) {
					tweet.retweeted_status.text =
						tweet
						.retweeted_status
						.text
						.replace(regex.url, patterns.url)
						.replace(regex.mention, patterns.mention);

					tweet.retweeted_status.text = $sce.trustAsHtml(tweet.retweeted_status.text);
				} else {
					tweet.text =
						tweet
						.text
						.replace(regex.url, patterns.url)
						.replace(regex.mention, patterns.mention);

					tweet.text = $sce.trustAsHtml(tweet.text);
				}
			} catch (e) {
				console.error("Not parseable tweet: ")
				console.error(tweet);
			}

			return tweet;
		}

		_initialize();
	}]);
})();
