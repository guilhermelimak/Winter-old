angular
.module('winter')
.controller('navbarController', ['$scope', '$location', function($scope, $location) {

	$scope.goHome = function() {
		$location.url('/timeline')
	};

}]);