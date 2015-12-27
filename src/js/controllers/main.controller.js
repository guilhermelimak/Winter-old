(function() {
  'use strict';

  angular
  .module('winter')
  .controller('MainController', MainController);

  function MainController() {
    var vm = this;

    vm.auth = auth;
    vm.reset = reset;

    function reset(form) {
      if (form) {
        form.$setPristine();
        form.$setUntouched();
      }
      
      vm.user = {};
    }

    function auth() {
      console.log(vm.user);
    }
  }
})();
