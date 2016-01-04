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
      templateUrl: 'views/dashboard/dashboard.html',
      controller: 'DashboardController as dashboard'
    })
    .otherwise('/');
  });
})();
