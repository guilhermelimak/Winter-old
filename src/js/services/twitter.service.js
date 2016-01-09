(() => {
  const TwitterApi = require('./js/modules/twitter-api');

  angular
  .module('winter')
  .factory('Twitter', () => {
    return function() {
      var accessTokenObject = JSON.parse(window.localStorage.getItem('accessTokenObject'));

      return TwitterApi(accessTokenObject);
    }
  });
})();
