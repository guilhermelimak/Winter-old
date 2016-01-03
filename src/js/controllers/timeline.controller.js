angular
.module('winter')
.controller('TimelineController', ['$scope', '$interval', '$uibModal', 'Twitter', 'hotkeys', '$sce', function($scope, $interval, $uibModal, Twitter, hotkeys, $sce) {
	const client = new Twitter();

	$scope.tweets = [];
	$scope.getTweets = getTweets;
	$scope.startStream = startStream;
	$scope.retweet = retweet;
	$scope.favorite = favorite;
	$scope.showReplyModal = showReplyModal;

	function _initialize() {
		$scope.tweets = [];

		$scope.getTweets();
		$scope.startStream();

		hotkeys.add({
			combo: 'n',
			description: 'new tweet',
			callback: showNewTweetModal
		});
	}

  function _detectLinks(tweet) {
		if (tweet.retweeted_status) {
			tweet.retweeted_status.text = tweet.retweeted_status.text.replace(/((http|https):\/\/[^\s]+)/gi, '<a onclick="openUrl(\'$1\')">$1</a>');
			tweet.retweeted_status.text = $sce.trustAsHtml(tweet.retweeted_status.text);
		} else {
			tweet.text = tweet.text.replace(/((http|https):\/\/[^\s]+)/gi, '<a onclick="openUrl(\'$1\')">$1</a>');
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
		type = tweet.favorited ? 'destroy' : 'create';
		tweet.favorited = !tweet.favorited;

		client.favorites(type, { id: tweet.id_str }, angular.noop);
	}

	function reply(replyObject) {
		client.statuses('update', replyObject, angular.noop);
	}

	function showReplyModal(tweet) {
		var modalInstance = $uibModal.open({
      animation: true,
      templateUrl: 'views/modals/reply.html',
      controller: 'ReplyModalController',
			resolve: {
				tweet: () => tweet
			}
    });

    modalInstance
    .result
    .then(function(replyObject) {
			client.statuses('update', replyObject, angular.noop);
		}, angular.noop);
  }

  function showNewTweetModal(tweet) {
		var modalInstance = $uibModal.open({
      animation: true,
      templateUrl: 'views/modals/new-tweet.html',
      controller: 'NewTweetModalController'
    });

    modalInstance
    .result
    .then(function(newTweet) {
			client.statuses('update', newTweet, angular.noop);
		}, angular.noop);
  }

	_initialize();
}]);
