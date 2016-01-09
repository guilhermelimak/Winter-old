(() => {
	'use strict';

	angular
	.module('winter')
	.controller('navbarController', ['$scope', '$location', ($scope, $location) => {
		$scope.goHome = function() {
			$location.url('/timeline')
		};
	}]);
})();
