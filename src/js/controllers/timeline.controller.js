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
			var token = window.localStorage.getItem('accessTokenObject');
			return token;
		}

		sendTweet() {
			var token = this.getToken();
			
			var accessToken = token['accessToken']
				, accessTokenSecret = token['accessTokenSecret'];
			
			var client = new this.Twitter;

			client.getTimeline('home', 
				null,
				accessToken,
				accessTokenSecret,
				function(error, data, response) {
					if (error) {
						console.log(error);
					} else {
						console.log(response, data);
					}
				}
			)
		}
	}

})();