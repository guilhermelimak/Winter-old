(() => {
  'use strict';

  angular
  .module('winter')
  .controller('NewTweetModalController', ($scope, $uibModalInstance, hotkeys) => {
    $scope.newTweet = {
      status: null
    };

    $scope.ok = ok;
    $scope.cancel = cancel;

    hotkeys.add({
      combo: 'enter',
      description: 'Submit tweet',
      allowIn: ['TEXTAREA'],
      callback: $scope.ok
    });

    function ok() {
      $uibModalInstance.close($scope.newTweet);
    }

    function cancel() {
      $uibModalInstance.dismiss('cancel');
    }
  });
})();
