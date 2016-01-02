angular
.module('winter')
.controller('TimelineController', ['$scope', '$interval', '$uibModal', 'Twitter', 'hotkeys', '$sce', function($scope, $interval, $uibModal, Twitter, hotkeys, $sce) {
	const client = new Twitter();

	$scope.tweets = [];
	$scope.getTweets = getTweets;
	$scope.startStream = startStream;
	$scope.retweet = retweet;
	$scope.favorite = favorite;
	$scope.reply = reply;
	$scope.showReplyModal = showReplyModal;

	function _initialize() {
		$scope.tweets = [];

		$scope.getTweets();
		$scope.startStream();

		hotkeys.add({
			combo: 'n',
			description: 'new tweet',
			callback: function() {
				console.log('irra');
			}
		});
	}

  function _detectLinks(tweet) {
		tweet.text = tweet.text.replace(/((http|https):\/\/[^\s]+)/gi, '<a onclick="openUrl(\'$1\')">$1</a>');
		tweet.text = $sce.trustAsHtml(tweet.text);

    return tweet;
  }

	function _getTweetType(data) {

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
		client.getStream('user', { "with": "followings" }, (data, response) => {
			if (data.retweeted_status) {
				// data = data.retweeted_status;
				console.log(data.retweeted_status);
			}

			if (Object.keys(data).length != 0 &&
					data.friends == undefined &&
					data.created_at !== undefined) {
				$scope.tweets.unshift(data);
				$scope.$apply();
			}
		});
	}

	function retweet(tweet) {
		client.statuses("retweet", { id: tweet.id_str }, angular.noop);
	}

	function favorite(tweet) {
		console.log(tweet.favorited, tweet)

		if (tweet.favorited === true) {
			type = 'destroy';
			tweet.favorited = false;
		} else {
			type = 'create';
			tweet.favorited = true;
		}

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

    modalInstance.result.then(reply, angular.noop);
	}

	_initialize();
}]);
