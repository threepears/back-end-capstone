var app = angular.module("TakingStockApp", ["ngRoute", "angular.filter"])


app.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'app/partials/home.html',
        controller: 'HomeControl'
      })
      // .when('/login', {
      //   templateUrl: 'app/partials/login.html',
      //   controller: 'LoginControl'
      // })
      .when('/results', {
        templateUrl: 'app/partials/results.html',
        controller: 'ResultsControl'
      })
      .when('/buy', {
        templateUrl: 'app/partials/buy.html',
        controller: 'BuyControl'
      })
      .otherwise('/');
  }]);
