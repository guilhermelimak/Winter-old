(() => {
  'use strict';

  const BrowserWindow = require('electron').remote.BrowserWindow;

  angular
  .module('winter')
  .controller('LoginController', (Twitter, $location) => new LoginController(Twitter, $location));

  class LoginController {
    constructor(Twitter, $location) {
      var accessTokenObject = window.localStorage.getItem('accessTokenObject');

      this.Twitter = Twitter;
      this.$location = $location;

      if (accessTokenObject != null || accessTokenObject != undefined) {
        this.$location.url('/timeline');
      }
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
              window
              .localStorage
              .setItem('userData', JSON.stringify(data));

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
