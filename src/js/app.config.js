(() => {
  angular
  .module('winter')
  .config(($routeProvider) => {
    $routeProvider
    .when('/', {
      templateUrl: 'views/login/login.html',
      controller: 'LoginController as main'
    })
    .when('/timeline', {
      templateUrl: 'views/timeline/timeline.html',
      controller: 'TimelineController',
      controllerAs: 'timeline'
    })
    .otherwise('/');
  });

})();
