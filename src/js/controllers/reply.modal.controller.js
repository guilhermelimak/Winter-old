(() => {
  'use strict';

  angular
  .module('winter')
  .controller('ReplyModalController', ($scope, $uibModalInstance, tweet, Modal) => {
    $scope.tweet = tweet;

    $scope.showProfileModal = Modal.showProfileModal;

    $scope.replyObject = {
      in_reply_to_status_id: tweet.id_str,
      status: `@${tweet.user.screen_name} `
    };

    $scope.ok = () => {
      $uibModalInstance.close($scope.replyObject);
    };

    $scope.cancel = () => {
      $uibModalInstance.dismiss('cancel');
    };
  });
})();
