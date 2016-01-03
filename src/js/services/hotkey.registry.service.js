(() => {
  'use strict';

  angular
  .module('winter')
  .factory('HotkeyRegistry', ['Modal', 'hotkeys', function (Modal, hotkeys) {
    return function() {
      const hotKeyList = [
        {
          combo: 'n',
          description: 'New tweet',
          callback: Modal.showNewTweetModal
        }
      ];

      hotKeyList.forEach((hotKey) => hotkeys.add(hotKey));
    }
  }]);
})();
