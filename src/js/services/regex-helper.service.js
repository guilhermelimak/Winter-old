(() => {
	'use strict';

	angular
	.module('winter')
	.factory('RegexHelper', () => RegexHelper);

	const regex = {
		mention: '((@)[^\s]+)',
		url: /((http|https):\/\/[^\s]+)/gi
	};

	const patterns = {
		url: '<a onclick="openUrl(\'$1\')">$1</a>',
		mention: '<a ng-click="showProfileModalByScreenName(\'$1\')">$1</a>'
	};

	class RegexHelper {
		static getScreenNames(text) {
			return new RegExp(regex.mention, 'gi').exec(text);
		}

		static get patterns() {
			return patterns;
		}

		static get expressions() {
			return regex;
		}
	}
		
})();