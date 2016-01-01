angular
.module('winter')
.controller('TimelineController', ['$scope', '$interval', 'Twitter', 'hotkeys', function($scope, $interval, Twitter, hotkeys) {
	const client = new Twitter;

	$scope.initialize = initialize;
	$scope.getTweets = getTweets;
	$scope.startStream = startStream;
	$scope.retweet = retweet;
	$scope.favorite = favorite;
	$scope.reply = reply;

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
		client.getStream('user', { "with": "followingds" }, (data, response) => {
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

	function reply(tweet) {
		console.log("reply");
	}

	$scope.initialize();
}]);
