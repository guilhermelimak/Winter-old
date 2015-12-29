(() => {
  'use strict';

  angular
  .module('winter')
  .controller('MainController', (Twitter) => new MainController(Twitter));

  class MainController {
    constructor(Twitter) {
      this.twitter = Twitter;
    }

    auth() {
      var params = {
        screen_name: 'armand1m'
      };

      this
      .twitter
      .get('statuses/user_timeline', params, (error, tweets, response) => {
        if (!error) {
          console.log(tweets);
        }
      });
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
