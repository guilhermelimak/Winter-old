(() => {
	'use strict';

	angular
	.module('winter')
	.controller('TimelineController', ['$scope', '$interval', 'Twitter','$sce', 'Modal', 'HotkeyRegistry', ($scope, $interval, Twitter, $sce, Modal, HotkeyRegistry) => {
		const client = new Twitter();

		$scope.tweets = [];
		$scope.getTweets = getTweets;
		$scope.startStream = startStream;
		$scope.retweet = retweet;
		$scope.favorite = favorite;
		$scope.showReplyModal = Modal.showReplyModal;
		$scope.showProfileModal = Modal.showProfileModal;
		$scope.showPictureModal = Modal.showPictureModal;

		function _initialize() {
			new HotkeyRegistry();

			$scope.tweets = [];
			$scope.getTweets();
			$scope.startStream();
		}

	  function _detectLinks(tweet) {
			let urlPattern = '<a onclick="openUrl(\'$1\')">$1</a>'
			,		regex = /((http|https):\/\/[^\s]+)/gi;

			if (tweet.retweeted_status) {
				tweet.retweeted_status.text = tweet.retweeted_status.text.replace(regex, urlPattern);
				tweet.retweeted_status.text = $sce.trustAsHtml(tweet.retweeted_status.text);
			} else {
				tweet.text = tweet.text.replace(regex, urlPattern);
				tweet.text = $sce.trustAsHtml(tweet.text);
			}

	    return tweet;
	  }

		function getTweets() {
			client.getTimeline('home', (data, response) => {
				for (var i = data.length; i--;) {
					data[i] = _detectLinks(data[i])
				}

				$scope.tweets = data;
				$scope.$apply();
			});
		}

		function startStream() {
			var userData = JSON.parse(window.localStorage.getItem('userData'));
			console.log(userData);

			client.getStream('user', { "with": "followings" }, (data, response) => {
				if (Object.keys(data).length != 0 &&
						data.friends == undefined &&
						data.created_at !== undefined) {

					if (data.in_reply_to_screen_name === userData.screen_name) {
						new Notification(`You got a mention from @${data.user.screen_name}: ${data.text}`)
					}

					$scope.tweets.unshift(_detectLinks(data));
					$scope.$apply();
				}
			});
		}

		function retweet(tweet) {
			client.statuses("retweet", { id: tweet.id_str }, angular.noop);
		}

		function favorite(tweet) {
			var type = tweet.favorited ? 'destroy' : 'create';
			tweet.favorited = !tweet.favorited;

			client.favorites(type, { id: tweet.id_str }, angular.noop);
		}

		function reply(replyObject) {
			client.statuses('update', replyObject, angular.noop);
		}

		_initialize();
	}]);
})();
