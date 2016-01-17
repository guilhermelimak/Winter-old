(() => {
  'use strict';

	angular
	.module('winter')
	.factory('Modal', ['Twitter', '$uibModal', (Twitter, $uibModal) => {
		const client = new Twitter();

		function showReplyModal(tweet) {
			let modalInstance = $uibModal.open({
				animation: true,
				templateUrl: 'views/modals/reply.html',
				controller: 'ReplyModalController',
				resolve: {
					tweet: () => tweet
				}
			});

			modalInstance
			.result
			.then((replyObject) => client.statuses('update', replyObject, angular.noop), angular.noop);
		}

		function showNewTweetModal() {
			let modalInstance = $uibModal.open({
				animation: true,
				templateUrl: 'views/modals/new-tweet.html',
				controller: 'NewTweetModalController'
			});

			modalInstance
			.result
			.then((newTweet) => client.statuses('update', newTweet, angular.noop), angular.noop);
		}

		function showProfileModal(tweet) {
			$uibModal.open({
				animation: true,
				templateUrl: 'views/modals/profile.html',
				controller: 'ProfileModalController',
				resolve: {
					tweet: () => tweet
				}
			});
		}

		function showPictureModal(imgLink) {
			$uibModal.open({
				animation: true,
				templateUrl: 'views/modals/picture.html',
				controller: 'PictureModalController',
				resolve: {
					imgLink: () => imgLink
				}
			});
		}

    function showProfileModalByScreenName(screenName) {
      if (!screenName)
        return;

      client.users("show", { screen_name: screenName }, (data, response) => {
        console.log(`${screenName}: `, data);
      });
    }

		return {
			showReplyModal: showReplyModal,
			showNewTweetModal: showNewTweetModal,
			showProfileModal: showProfileModal,
			showPictureModal: showPictureModal,
      showProfileModalByScreenName: showProfileModalByScreenName
		};
	}]);
})();
