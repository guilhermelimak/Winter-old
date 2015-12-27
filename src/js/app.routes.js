angular
.module('winter')
.config(function($routeProvider, $locationProvider) {
  $routeProvider
  .when('/', {
    templateUrl: 'views/main/main.html',
    controller: 'MainController as main'
  })
  .otherwise('/');
});
