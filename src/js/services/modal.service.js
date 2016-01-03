angular
.module('winter')
.factory('Modal', ['Twitter', '$uibModal', function(Twitter, $uibModal) {
	const client = new Twitter();

	return {
		showReplyModal(tweet) {
			var modalInstance = $uibModal.open({
				animation: true,
				templateUrl: 'views/modals/reply.html',
				controller: 'ReplyModalController',
				resolve: {
					tweet: () => tweet
				}
			});

			modalInstance
			.result
			.then(function(replyObject) {
				client.statuses('update', replyObject, angular.noop);
			}, angular.noop);
		},
		showNewTweetModal() {
			var modalInstance = $uibModal.open({
				animation: true,
				templateUrl: 'views/modals/new-tweet.html',
				controller: 'NewTweetModalController'
			});

			modalInstance
			.result
			.then(function(newTweet) {
				client.statuses('update', newTweet, angular.noop);
			}, angular.noop);
		}
	}
}]);