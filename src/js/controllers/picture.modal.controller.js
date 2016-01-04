angular
.module('winter')
.controller('PictureModalController',($scope, $uibModalInstance, imgLink) => {
	$scope.imgLink = imgLink;
	console.log($scope.imgLink);

  $scope.cancel = () => {
    $uibModalInstance.dismiss('cancel');
  };	
});
	