'use strict';
angular
.module('winter')
.controller('ProfileModalController', ($scope, $uibModalInstance, Twitter, tweet) => {
	const client = new Twitter();

	function getImageSizes() {
		$scope.bigger_profile_image = $scope.user.profile_image_url.replace("_normal", "_bigger")
		$scope.original_profile_image = $scope.user.profile_image_url.replace("_normal", "")
	}

	function getUser(tweet) {
		client.users('show', {user_id: tweet.user.id_str}, (data, response) => {
			$scope.user = data 
			$scope.$apply();
			getImageSizes()
		});
	}

  $scope.ok = () => {
    $uibModalInstance.close();
  };
  
  $scope.cancel = () => {
    $uibModalInstance.dismiss('cancel');
  };

  getUser(tweet);
});
	