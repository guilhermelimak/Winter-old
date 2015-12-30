(() => {
  'use strict';

  const BrowserWindow = require('electron').remote.BrowserWindow;

  angular
  .module('winter')
  .controller('MainController', (Twitter) => new MainController(Twitter));

  class MainController {
    constructor(Twitter) {
      this.Twitter = Twitter;
    }

    authenticate() {
      let client = new this.Twitter();

      client.getRequestToken((error, requestToken, requestTokenSecret, results) => {
        if (error) {
          console.log("Error getting OAuth request token : ");
          console.log(error);
        } else {
          window.sessionStorage.setItem('requestToken', requestToken);
          window.sessionStorage.setItem('requestTokenSecret', requestTokenSecret);
          window.sessionStorage.setItem('results', results);

          var url = client.getAuthUrl(requestToken);

          var authWindow = new BrowserWindow({
            width: 1024,
            height: 640,
            "node-integration": false
          });

          authWindow.on('closed', () => {
            authWindow = null
          });

          authWindow.loadURL(`${url}&force_login=true`);
      	}
      });
    }

    authorize() {
      var client = new this.Twitter();

      console.log(this.pin);

      var requestToken = window.sessionStorage.getItem('requestToken')
      ,   requestTokenSecret = window.sessionStorage.getItem('requestTokenSecret');

      client.getAccessToken(requestToken, requestTokenSecret, this.pin, (error, accessToken, accessTokenSecret, results) => {
        if (error) {
          console.error(error);
        } else {
          var token = {
            accessToken: accessToken,
            accessTokenSecret: accessTokenSecret
          };

          console.log(token);

          client.verifyCredentials(accessToken, accessTokenSecret, (error, data, response) => {
            if (error) {
              console.log(error);
            } else {
              console.log(data, response);
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
