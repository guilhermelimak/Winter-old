(() => {
  angular
  .module('winter')
  .config(($routeProvider) => {
    $routeProvider
    .when('/', {
      templateUrl: 'views/main/main.html',
      controller: 'MainController as main'
    })
    .when('/timeline', {
      templateUrl: 'views/timeline/timeline.html',
      controller: 'TimelineController',
      controllerAs: 'timeline'
    })
    .otherwise('/');
  });
})();
