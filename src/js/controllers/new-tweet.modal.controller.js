(() => {
  'use strict';

  angular
  .module('winter')
  .controller('NewTweetModalController', ($scope, $uibModalInstance, hotkeys) => {
    hotkeys.add({
      combo: 'enter',
      description: 'Submit tweet',
      allowIn: ['TEXTAREA'],
      callback: ok
    });

    $scope.newTweet = {
      status: null
    };

    $scope.ok = ok;
    $scope.cancel = cancel;

    function ok() {
      $uibModalInstance.close($scope.newTweet);
    }

    function cancel() {
      $uibModalInstance.dismiss('cancel');
    }
  });
})();
