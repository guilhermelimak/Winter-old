(() => {
	'use strict';

	angular
	.module('winter')
	.controller('navbarController', ['$scope', '$location', 'Modal', ($scope, $location, Modal) => {
		$scope.showNewTweetModal = Modal.showNewTweetModal;

		$scope.goHome = function() {
			$location.url('/timeline')
		};
	}]);
})();
