'use strict';

const Twitter = require('node-twitter-api');

const Credentials = {
  consumerKey: "bgcQQWYVw8tGDH4CJiOTPsmzo",
  consumerSecret: "Pg8fIikCaXzoAOkH36z8aaymV1bRTbw0eCLhIuvblBg1R4fU6O",
  callback: 'oob'
};

var twitter = new Twitter(Credentials);

function errorCallback(error) {
  console.error(error);
}

module.exports = function(accessTokenObject) {
  return {
    getTimeline(type, callback, params) {
      twitter.getTimeline(type, params || null,
        accessTokenObject.accessToken,
        accessTokenObject.accessTokenSecret,
        (error, data, response) => {
          if (error) {
            errorCallback(error);
            return;
          }

          return callback(data, response);
        }
      );
    },
    getStream(type, params, dataCallback, endCallback) {
      twitter.getStream(type, params || null,
        accessTokenObject.accessToken,
        accessTokenObject.accessTokenSecret,
        (error, data, response) => {
          if (error) {
            errorCallback(error);
            return;
          }

          return dataCallback(data, response);
        },
        endCallback || angular.noop
      );
    },
    statuses(type, params, callback) {
      twitter.statuses(type, params,
        accessTokenObject.accessToken,
        accessTokenObject.accessTokenSecret,
        (error, data, response) => {
          if (error) {
            errorCallback(error);
            return;
          }

          return callback(data, response);
        }
      );
    },
    favorites(type, params, callback) {
      twitter.favorites(type, params,
        accessTokenObject.accessToken,
        accessTokenObject.accessTokenSecret,
        (error, data, response) => {
          if (error) {
            errorCallback(error);
            return;
          }

          return callback(data, response);
        }
      );
    },
    users(type, params, callback) {
      twitter.users(type, params,
        accessTokenObject.accessToken,
        accessTokenObject.accessTokenSecret,
        (error, data, response) => {
          if (error) {
            errorCallback(error);
            return;
          }

          return callback(data, response);
        }
      );
    },
    getRequestToken: twitter.getRequestToken.bind(twitter),
    getAccessToken: twitter.getAccessToken.bind(twitter),
    verifyCredentials: twitter.verifyCredentials.bind(twitter),
    getAuthUrl: twitter.getAuthUrl.bind(twitter)
  };
}
