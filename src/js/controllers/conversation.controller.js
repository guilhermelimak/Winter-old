(() => {
  'use strict';

  angular
  .module('winter')
  .controller('ConversationController', ($routeParams) => new ConversationController($routeParams));

  class ConversationController {
    constructor($routeParams) {
      this.params = $routeParams;
      console.log(this.params);
    }
  }
})();
