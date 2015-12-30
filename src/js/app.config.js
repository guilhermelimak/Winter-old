(() => {
  angular
  .module('winter')
  .config(($routeProvider) => {
    $routeProvider
    .when('/', {
      templateUrl: 'views/main/main.html',
      controller: 'MainController as main'
    })
    .otherwise('/');
  });
})();
