(() => {
	'use strict';

	angular
	.module('winter')
	.controller('navbarController', ['$scope', '$location', ($scope, $location) => {
		$scope.goHome = function() {
			$location.url('/timeline')
		};

		$scope.toggleDevTools = function() {
			require('remote').getCurrentWindow().toggleDevTools();
		};

	}]);
})();
