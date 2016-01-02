(() => {
  'use strict';

  angular
  .module('winter')
  .controller('NewTweetModalController', ($scope, $uibModalInstance) => {
    $scope.newTweet = {
      status: null
    };
    
    $scope.ok = () => {
      $uibModalInstance.close($scope.newTweet);
    };

    $scope.cancel = () => {
      $uibModalInstance.dismiss('cancel');
    };
  });
})();