(() => {
  'use strict';

  angular
  .module('winter')
  .controller('ReplyModalController', ($scope) => {
    console.log($scope.tweet);
  });
})();
