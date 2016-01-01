(() => {
  const Twitter = require('node-twitter-api');
  const Credentials = {
    consumerKey: "bgcQQWYVw8tGDH4CJiOTPsmzo",
    consumerSecret: "Pg8fIikCaXzoAOkH36z8aaymV1bRTbw0eCLhIuvblBg1R4fU6O",
    callback: 'oob'
  };

  angular
  .module('winter')
  .factory('Twitter', () => {
    return function(accessToken) {
      var twitter = null;

      if (!accessToken) {
        twitter = new Twitter(Credentials);
      } else {
        var authorizedCredentials = {
          "consumer_key":        Credentials['consumerKey'],
          "consumer_secret":     Credentials['consumerSecret'],
          "access_token_key":    accessToken['accessToken'],
          "access_token_secret": accessToken['accessTokenSecret'],
        };

        twitter = new Twitter(authorizedCredentials);
      }

      return {
        getTimeline(type, callback, params) {
          twitter.getTimeline(type, params || null,
      			authorizedCredentials["access_token_key"],
      			authorizedCredentials["access_token_secret"],
      			(error, data, response) => {
      				if (error) {
      					console.error(error);
                return;
      				}

              return callback(data, response);
      			}
          );
        },
        getStream(type, params, dataCallback, endCallback) {
          twitter.getStream(type, params || null,
            authorizedCredentials["access_token_key"],
      			authorizedCredentials["access_token_secret"],
      			(error, data, response) => {
      				if (error) {
      					console.error(error);
                return;
      				}

              return dataCallback(data, response);
      			},
      			endCallback || angular.noop
      		);
        },
        statuses(type, params, callback) {
          $scope.client.statuses(type, params,
            authorizedCredentials["access_token_key"],
      			authorizedCredentials["access_token_secret"],
      			(error, data, response) => {
      				if (error) {
      					console.error(error);
      					return;
      				}

              return callback(data, response);
      			}
          );
        }
      };
    }
  });
})();
