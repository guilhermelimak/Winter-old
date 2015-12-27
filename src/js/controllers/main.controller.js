(() => {
  'use strict';

  angular
  .module('winter')
  .controller('MainController', () => new MainController());

  class MainController {
    auth() {
      console.log(this.user);
    }

    reset(form) {
      if (form) {
        form.$setPristine();
        form.$setUntouched();
      }

      this.user = {};
    }
  }
})();
