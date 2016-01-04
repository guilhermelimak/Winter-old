'use strict';

angular
.module('winter')
.controller('DashboardController', ["$scope", "Twitter", "$sce", "HotkeyRegistry", function($scope, Twitter, $sce, HotkeyRegistry) {
	const client = new Twitter();

	$scope.columns = [{
		name: 'home',
		type: 'home',
		tweets: []
	}];

	function _initialize() {
		new HotkeyRegistry();
		getTweets();
		startStream();
	}

  function _detectLinks(tweet) {
  	try{
			if (tweet.retweeted_status) {
				tweet.retweeted_status.text = tweet.retweeted_status.text.replace(/((http|https):\/\/[^\s]+)/gi, '<a onclick="openUrl(\'$1\')">$1</a>');
				tweet.retweeted_status.text = $sce.trustAsHtml(tweet.retweeted_status.text);
			} else {
				tweet.text = tweet.text.replace(/((http|https):\/\/[^\s]+)/gi, '<a onclick="openUrl(\'$1\')">$1</a>');
				tweet.text = $sce.trustAsHtml(tweet.text);
			}
  	} catch(e) {
  		console.error(e);
  	}
    return tweet;
  }

	function getColumnsByType (type) {
		var columns = [];
		
		for (var i = $scope.columns.length; i--;) {
			if ($scope.columns[i].type == type) {
				columns.push({
					index: i,
					column: $scope.columns[i]
				});
			}
		}

		return columns;	
	}

	function startStream() {
		var userData = JSON.parse(window.localStorage.getItem('userData'));
		console.log(userData);

		client.getStream('user', { "with": "followings" }, (data, response) => {
			if (Object.keys(data).length != 0 &&
					data.friends == undefined &&
					data.created_at !== undefined) {

				if (data.in_reply_to_screen_name === userData.screen_name) {
					new Notification(`You got a mention from @${data.user.screen_name}: ${data.text}`)
				}

				getColumnsByType('home').forEach(function(column) {
					$scope.columns[column.index].tweets.unshift(_detectLinks(data))
				});

				$scope.$apply();
			}
		});
	}

	function getTweets() {
		client.getTimeline('home', (data, response) => {
			for (var i = data.length; i--;) {
				data[i] = _detectLinks(data[i])
			}

			getColumnsByType('home').forEach(function(column) {
				$scope.columns[column.index].tweets = data;
			});

			$scope.$apply();
		});
	}

	_initialize();
}])