(() => {
  const Twitter = require('node-twitter-api');
  const Credentials = {
    consumerKey: "tS6cGe76gSnTvwCz85VxN7KoM",
    consumerSecret: "JGhwA8WXsfz7fyv2pvc47PmZ6NlqBMMjhWKdHx0w3fTfumCMUX",
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
