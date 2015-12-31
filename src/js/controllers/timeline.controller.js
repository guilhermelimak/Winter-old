angular
.module('winter')
.controller('TimelineController', ['$scope','Twitter', function($scope, Twitter) {


	$scope.getToken = function() 	{
		return JSON.parse(window.localStorage.getItem('accessTokenObject'));
	};

	$scope.getTweets = function() {
		var token = $scope.getToken();
		var client = new Twitter;

		client.getTimeline('home',
			null,
			token.accessToken,
			token.accessTokenSecret,
			(error, data, response) => {
				if (error) {
					console.log("fila da puta");
				} else {
					console.log(data);
					$scope.tweets = data;
					$scope.$apply();
				}
			}
		);
	}
	$scope.getTweets();
}]);