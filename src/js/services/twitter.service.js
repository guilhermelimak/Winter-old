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
      var twitter = new Twitter(Credentials);
      var accessTokenObject =  JSON.parse(window.localStorage.getItem('accessTokenObject'));

      return {
        getTimeline(type, callback, params) {
          twitter.getTimeline(type, params || null,
      			accessTokenObject['accessToken'],
      			accessTokenObject['accessTokenSecret'],
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
            accessTokenObject['accessToken'],
      			accessTokenObject['accessTokenSecret'],
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
          twitter.statuses(type, params,
            accessTokenObject['accessToken'],
      			accessTokenObject['accessTokenSecret'],
      			(error, data, response) => {
      				if (error) {
      					console.error(error);
      					return;
      				}

              return callback(data, response);
      			}
          );
        },
        favorites(type, params, callback) {
          twitter.favorites(type, params,
            accessTokenObject['accessToken'],
            accessTokenObject['accessTokenSecret'],
            (error, data, response) => {
              if (error) {
                console.error(error);
                return;
              }
              return callback(data, response);
            }
            )
        },
        getRequestToken: twitter.getRequestToken.bind(twitter),
        getAccessToken: twitter.getAccessToken.bind(twitter),
        verifyCredentials: twitter.verifyCredentials.bind(twitter),
        getAuthUrl: twitter.getAuthUrl.bind(twitter)
      };
    }
  });
})();
