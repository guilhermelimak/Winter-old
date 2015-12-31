(() => {
	'use strict';

	angular.module('winter')
		.controller('TimelineController', (Twitter, $location) => new TimelineController(Twitter, $location));

	class TimelineController {
		constructor(Twitter, $location) {
			this.Twitter = Twitter;
			this.$location = $location;

			this.sendTweet();
		}

		getToken() 	{
			return JSON.parse(window.localStorage.getItem('accessTokenObject'));
		}

		sendTweet() {
			var token = this.getToken();

			var client = new this.Twitter;

			client.getTimeline('home',
				null,
				token.accessToken,
				token.accessTokenSecret,
				(error, data, response) => {
					if (error) {
						console.log(error);
					} else {
						console.log(response, data);
					}
				}
			);
		}
	}

})();
