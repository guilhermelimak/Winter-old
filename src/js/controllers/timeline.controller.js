angular
.module('winter')
.controller('TimelineController', ['$scope','Twitter', function($scope, Twitter) {
	$scope.getToken = function() 	{
		return JSON.parse(window.localStorage.getItem('accessTokenObject'));
	};

	$scope.getTweets = function() {
		var token = $scope.getToken();
		var client = new Twitter;
		//do a get Timeline first to populate the timeline and after that getstream to keep geting statuses in realtime
		client.getTimeline('home',
			null,
			token.accessToken,
			token.accessTokenSecret,
			(error, data, response) => {
				if (error) {
					console.log(error);
				} else {
					$scope.tweets = data;
					$scope.$apply();
				}
			})

		client.getStream('user',
			{ "with": "followingds" },
			token.accessToken,
			token.accessTokenSecret,
			(error, data, response) => {
				if (error) {
					console.error(error);
				} else {
					console.log(data);

					if (Object.keys(data).length != 0 &&
							data.friends == undefined) {
						$scope.tweets.unshift(data);
						$scope.$apply();
					}
				}
			},
			(error, data, response) => { return }
		);
	}

	$scope.getTweets();
}]);
