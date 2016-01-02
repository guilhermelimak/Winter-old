angular
.module('winter')
.controller('TimelineController', ['$scope', '$interval', '$uibModal', 'Twitter', 'hotkeys', function($scope, $interval, $uibModal, Twitter, hotkeys) {
	const client = new Twitter;

	$scope.initialize = initialize;
	$scope.getTweets = getTweets;
	$scope.startStream = startStream;
	$scope.retweet = retweet;
	$scope.favorite = favorite;
	$scope.reply = reply;
	$scope.showReplyModal = showReplyModal;

	function initialize() {
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

	function getTweets() {
		client.getTimeline('home', (data, response) => {
			$scope.tweets = data;
			$scope.$apply();
		});
	}

	function startStream() {
		client.getStream('user', { "with": "followings" }, (data, response) => {
			console.log(data);

			if (Object.keys(data).length != 0 &&
					data.friends == undefined &&
					data.created_at !== undefined) {
				$scope.tweets.unshift(data);
				$scope.$apply();
			}
		});
	}

	function retweet(tweet) {
		client.statuses('retweet', { id: tweet.id_str }, (data, response) => {
			console.log(data);
			console.log(response);
		});
	}

	function favorite(tweet) {
		console.log("favorite");
	}

	function reply(replyObject) {
		client.statuses('update', replyObject, (data, response) => {
			console.log(data, response);
		});
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

	$scope.initialize();
}]);
