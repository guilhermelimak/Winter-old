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
		client.getStream('user', { "with": "followings" }, (data, response) => {
			if (Object.keys(data).length != 0 &&
					data.friends == undefined &&
					data.created_at !== undefined) {
				$scope.tweets.unshift(data);
				$scope.$apply();
			}
		});
	}

	function retweet(tweet) {
		client.statuses("retweet", { id: tweet.id_str }, (data, response) => {
			console.log("retweeted");
		});
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

		client.favorites(type, { id: tweet.id_str }, (data, response) => {
			console.log(response);
		});;
	}

	function reply(tweet) {
		console.log("reply");
	}

	$scope.initialize();
}]);
