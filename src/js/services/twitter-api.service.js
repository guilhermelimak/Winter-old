(() => {
  'use strict';

  angular
  .module('winter')
  .factory('TwitterApi', ($http) => {
    class TwitterApi {
      getTweet() {
        return $http.get('https://api.twitter.com/1.1/statuses/mentions_timeline.json');
      }
    }

    return TwitterApi;
  });
})();
