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
      if (!accessToken) {
        return new Twitter(Credentials);
      }

      var authorizedCredentials = {
        "consumer_key":        Credentials['consumerKey'],
        "consumer_secret":     Credentials['consumerSecret'],
        "access_token_key":    accessToken['accessToken'],
        "access_token_secret": accessToken['accessTokenSecret'],
      };

      return new Twitter(authorizedCredentials);
    }
  });
})();
