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

    auth() {
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

          authWindow.webContents.on('will-navigate', (event, url) => {
            event.preventDefault();
            var matched = url.match(/\?oauth_token=([^&]*)&oauth_verifier=([^&]*)/);
            var token = matched[2];
            
            console.log(matched, token);

            if (matched) {
              client.getAccessToken(requestToken, requestSecret, token, (error, accessToken, accessTokenSecret) => {
                if (error) {
                  // TODO: THIS AGAIN

                } else {
                  var token = { accessToken: accessToken, accessTokenSecret: accessTokenSecret };

                  client = new this.Twitter(token);

                  client.verifyCredentials((user) => {
                    token['screenName']   = user.screen_name;
                    token['profileImage'] = user.profile_image_url;

                    console.log(token);

                    if (authWindow) {
                      authWindow.close();
                    }
                  });

                }
              })
            }
          });

          authWindow.on('closed', () => {
            authWindow = null;
          });

          authWindow.loadURL(`${url}&force_login=true`);

          console.log(authWindow);
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
