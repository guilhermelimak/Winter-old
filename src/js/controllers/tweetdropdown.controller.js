(() => {
	'use strict';

	const ncp = require("copy-paste");

	angular
	.module('winter')
	.controller('TweetDropdownController',
	['$scope',
	($scope) => {
	  $scope.status = {
	    isopen: false
	  };

	  $scope.toggled = angular.noop;

	  $scope.toggleDropdown = function($event) {
	    $event.preventDefault();
	    $event.stopPropagation();
	    $scope.status.isopen = !$scope.status.isopen;
	  };

		$scope.erase = $scope.$parent.erase;
		$scope.copyUrlToClipboard = (tweet) => {
			var url = `https://twitter.com/${tweet.user.screen_name}/status/${tweet.id_str}/`;

			ncp.copy(url, () => console.log("Succesfully copied!"));
		};

	  $scope.appendToEl = angular.element(document.querySelector('#dropdown-long-content'));
	}]);
})();
