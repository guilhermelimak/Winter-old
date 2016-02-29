(() => {
	'use strict';

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

	  $scope.appendToEl = angular.element(document.querySelector('#dropdown-long-content'));
	}]);
})();
