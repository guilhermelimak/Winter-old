(() => {
  'use strict';

  angular
  .module('winter')
  .controller('MainController', (TwitterApi) => new MainController(TwitterApi));

  class MainController {
    constructor(TwitterApi) {
      this.api = new TwitterApi();
    }

    auth() {
      console.log(this.api.getTweet());
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
