(() => {
  'use strict';

  angular
  .module('winter')
  .factory('UserStorage', () => new UserStorage());

  var keys = {
    user: 'userData'
  };

  class UserStorage {
    get user() {
      this.userData = JSON.parse(window.localStorage.getItem(keys.user));
      return this.userData;
    }

    set user(user) {
      window.localStorage.setItem(keys.user, JSON.stringify(user));
      this.userData = user;
    }
  }
})();
