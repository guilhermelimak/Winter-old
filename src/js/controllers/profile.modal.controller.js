(() => {
	'use strict';

	angular
	.module('winter')
	.controller('ProfileModalController', ($scope, $uibModalInstance, Twitter, tweet, Modal) => {
		const client = new Twitter();

		$scope.user = tweet.user;
		$scope.showPictureModal = Modal.showPictureModal;

	  $scope.ok = () => {
	    $uibModalInstance.close();
	  };

	  $scope.cancel = () => {
	    $uibModalInstance.dismiss('cancel');
	  };

		function _init() {
			_getImageSizes();
		}

		function _getImageSizes() {
			$scope.bigger_profile_image = $scope.user.profile_image_url.replace("_normal", "_bigger")
			$scope.original_profile_image = $scope.user.profile_image_url.replace("_normal", "")
		}

		_init();
	});
})();
