(() => {
  'use strict';

  angular
  .module('winter')
  .controller('ReplyModalController', ($scope, $uibModalInstance, tweet, Modal, hotkeys, RegexHelper) => {
    hotkeys.add({
      combo: 'enter',
      description: 'Submit reply',
      allowIn: ['TEXTAREA'],
      callback: ok
    });
    console.log(RegexHelper.getScreenNames(tweet.text));
    $scope.tweet = tweet;
    $scope.replyObject = {
      in_reply_to_status_id: tweet.id_str,
      status: `@${tweet.user.screen_name} `
    };

    $scope.ok = ok;
    $scope.cancel = cancel;
    $scope.showProfileModal = Modal.showProfileModal;

    function ok() {
      $uibModalInstance.close($scope.replyObject);
    }

    function cancel() {
      $uibModalInstance.dismiss('cancel');
    }
  });
})();
