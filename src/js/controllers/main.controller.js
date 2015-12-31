(() => {
  'use strict';

  const BrowserWindow = require('electron').remote.BrowserWindow;

  angular
  .module('winter')
  .controller('MainController', (Twitter, $location) => new MainController(Twitter, $location));

  class MainController {
    constructor(Twitter, $location) {
      this.Twitter = Twitter;
      this.$location = $location;
    }

    authenticate() {
      let client = new this.Twitter();

      client.getRequestToken((error, requestToken, requestTokenSecret, results) => {
        if (error) {
          console.log("Error getting OAuth request token : ");
          console.log(error);
        } else {
          window.localStorage.setItem('requestToken', requestToken);
          window.localStorage.setItem('requestTokenSecret', requestTokenSecret);
          window.localStorage.setItem('results', results);

          window.open(`${client.getAuthUrl(requestToken)}&force_login=true`);
      	}
      });
    }

    authorize() {
      var client = new this.Twitter();

      console.log(this.pin);

      var requestToken = window.localStorage.getItem('requestToken')
      ,   requestTokenSecret = window.localStorage.getItem('requestTokenSecret');

      client.getAccessToken(requestToken, requestTokenSecret, this.pin, (error, accessToken, accessTokenSecret, results) => {
        if (error) {
          console.error(error);
        } else {
          window
          .localStorage
          .setItem('accessTokenObject', JSON.stringify({
            accessToken: accessToken,
            accessTokenSecret: accessTokenSecret
          }));

          client.verifyCredentials(accessToken, accessTokenSecret, (error, data, response) => {
            if (error) {
              console.log(error);
            } else {
              console.log(data, response);
              this.$location.url('/timeline');
            }
          });
        }
      })
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
