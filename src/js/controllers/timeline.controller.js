(() => {
	'use strict';

	angular
	.module('winter')
	.controller('TimelineController', ['$scope', '$interval', 'Twitter','$sce', 'Modal', 'HotkeyRegistry', 'UserStorage', '$compile', ($scope, $interval, Twitter, $sce, Modal, HotkeyRegistry, UserStorage, $compile) => {
		const client = new Twitter();

		$scope.tweets = [];

		$scope.user = UserStorage.user;

		$scope.logTweet = (tweet) => false ? angular.noop : console.log(tweet);

		$scope.retweet = retweet;
		$scope.favorite = favorite;
		$scope.showReplyModal = Modal.showReplyModal;
		$scope.showProfileModal = Modal.showProfileModal;
		$scope.showPictureModal = Modal.showPictureModal;
		$scope.showProfileModalByScreenName = Modal.showProfileModalByScreenName;

		const regex = {
			mention: /((@)[^\s]+)/ig,
			url: /((http|https):\/\/[^\s]+)/gi
		};

		const patterns = {
			url: '<a onclick="openUrl(\'$1\')">$1</a>',
			mention: '<a ng-click="showProfileModalByScreenName(\'$1\')">$1</a>'
		};

		function _initialize() {
			new HotkeyRegistry();

			getTweets();
			startStream();
		}

		function getTweets() {
			client.getTimeline('home', (data, response) => {
				var retweets = data.filter(_wasRetweetedByUser);

				for (var i = retweets.length; i--;) {
					client.statuses("retweets", { id: retweets[i].id_str }, (originalTweet, response) => {
						console.log(data, originalTweet);
					});
				}

 				$scope.tweets = data.map(_detectLinks).map(_detectResources);
				$scope.$apply();
			});
		}

		function startStream() {
			client.getStream('user', { "with": "followings" }, (data, response) => {
				if (_receivedReply(data)) _notify(data);

				if (_isTweet(data) && !(data.retweeted_by_user = _wasRetweetedByUser(data))) {
					$scope.tweets.unshift(_detectResources(_detectLinks(data)));
					$scope.$apply();
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

				if (type == 'destroy') {
					tweet.favorite_count--;
				} else {
					tweet.favorite_count++;
				}

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
			var notification = {
				title: data.user.screen_name,
				body: data.text
			}
			
			if (Notification.permission !== "granted") {
				Notification.requestPermission();
			} else {
				new Notification(notification.title, {body:notification.body});
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
				console.error("Winter: Not parseable tweet: ", tweet)
			}

			return tweet;
		}

		function _detectResources(tweet) {
			try {
				if (tweet.extended_entities) {
					tweet.extended_entities.media =
						tweet.extended_entities.media.map(_detectMediaResources);
				}

				return tweet;
			} catch (e) {
				console.error("Winter: Not parseable tweet", e)
			}
		}

		function _detectMediaResources(media) {
			if (media.type == 'video' || media.type == "animated_gif") {
				media.video_info.variants = media.video_info.variants.map(_setVariantTrustedUrl);
			}

			return media;
		}

		function _setVariantTrustedUrl(variant) {
			variant.url = $sce.trustAsResourceUrl(variant.url);
			return variant;
		}

		function _findTweetIndex(tweet) {
			for (var i = tweet.length; i--;) {
				if (tweet.id_str == $scope.tweets[i].id_str) {
					return i;
				}
			}

			return -1;
		}

		function _isTweet(data) {
			return data.friends == undefined && data.created_at !== undefined && Object.keys(data).length != 0;
		}

		_initialize();
	}]);
})();
