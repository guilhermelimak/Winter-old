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
					console.log("fila da puta");
					console.log(error);
				} else {
					console.log(error)
					console.log(response);
					console.log(data + "lol");
					$scope.tweets = data;
					$scope.$apply();
				}
			})

		client.getStream('user',
			{"with": "followingds"},
			token.accessToken,
			token.accessTokenSecret,
			(error, data, response) => {
				if (error) {
					console.log(error);
				} else { 
					console.log(data + "rox");
					console.log(data);
					$scope.$apply();
				}
			},			
			(error, data, response) => {
				if (error) {
					console.log("eita porra");
				} else {
					console.log(data);
				}
			}
		);
	}

	$scope.getTweets();
}])