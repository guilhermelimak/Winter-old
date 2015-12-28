angular
.module('winter')
.config(($routeProvider, $locationProvider, $httpProvider) => {
  $routeProvider
  .when('/', {
    templateUrl: 'views/main/main.html',
    controller: 'MainController as main'
  })
  .otherwise('/');

  $httpProvider.interceptors.push('HttpRequestInterceptor');
});
