angular
.module('winter')
.controller('TimelineController', ['$scope', '$interval', 'Twitter', 'hotkeys', function($scope, $interval, Twitter, hotkeys) {
	$scope.initialize = function() {
		$scope.client = new Twitter;

		$scope.getToken();
		$scope.tweets = [];
		hotkeys.add({
	    combo: 'n',
	    description: 'new tweet',
	    callback: function() {
	    	console.log('irra');
    }
  });
	}
	
	$scope.getToken = function() 	{
		$scope.token = JSON.parse(window.localStorage.getItem('accessTokenObject'));
	};

	$scope.getTweets = function() {
		//do a get Timeline first to populate the timeline and after that getstream to keep geting statuses in realtime
		$scope.client.getTimeline('home',
			null,
			$scope.token.accessToken,
			$scope.token.accessTokenSecret,
			(error, data, response) => {
				if (error) {
					console.log(error);
				} else {
					$scope.tweets = data;
					$scope.$apply();
				}
			})
	};

	$scope.startStream = function() {
		$scope.client.getStream('user',
			{ "with": "followingds" },
			$scope.token.accessToken,
			$scope.token.accessTokenSecret,
			(error, data, response) => {
				if (error) {
					console.error(error);
				} else {
					console.log(data);

					if (Object.keys(data).length != 0 &&
							data.friends == undefined &&
							data.created_at !== undefined) {
						$scope.tweets.unshift(data);
						$scope.$apply();
					}
				}
			},
			(error, data, response) => { return }
		);
	}

	$scope.retweet = function(tweet) {
		$scope.client.statuses('retweet', 
			tweet,
			$scope.token.accessToken,
			$scope.token.accessTokenSecret,
			(error, data, response) => {
				if (error) {
					console.log(error);
					console.log(tweet);
				} else {
					console.log(response);
				}
			});
	};

	$scope.favorite = function(tweet) {
		console.log("favorite");
	};

	$scope.reply = function(tweet) {
		console.log("reply");
	};

	$scope.initialize();

	$scope.getTweets();
	$scope.startStream();
}]);
