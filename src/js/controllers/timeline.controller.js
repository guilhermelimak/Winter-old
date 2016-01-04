angular
.module('winter')
.controller('TimelineController', ['$scope', '$interval', 'Twitter','$sce', 'Modal', 'HotkeyRegistry', function($scope, $interval, Twitter, $sce, Modal, HotkeyRegistry) {
	const client = new Twitter();
	
	function retweet(tweet) {
		client.statuses("retweet", { id: tweet.id_str }, angular.noop);
	}

	function favorite(tweet) {
		type = tweet.favorited ? 'destroy' : 'create';
		tweet.favorited = !tweet.favorited;
		client.favorites(type, { id: tweet.id_str }, angular.noop);
	}

	function reply(replyObject) {
		client.statuses('update', replyObject, angular.noop);
	}

}]);
