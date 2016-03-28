var app = angular.module("TakingStockApp", ["ngRoute", "angular.filter"])


app.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'app/partials/home.html',
        controller: 'HomeControl'
      })
      .when('/search', {
        templateUrl: 'app/partials/search.html',
        controller: 'SearchControl'
      })
      .when('/login', {
        templateUrl: 'app/partials/login.html',
        controller: 'LoginControl'
      })
      .when('/register', {
        templateUrl: 'app/partials/register.html',
        controller: 'RegisterControl'
      })
      .when('/results', {
        templateUrl: 'app/partials/results.html',
        controller: 'ResultsControl'
      })
      .when('/buy', {
        templateUrl: 'app/partials/buy.html',
        controller: 'BuyControl'
      })
      .when('/profile', {
        templateUrl: 'app/partials/profile.html',
        controller: 'ProfileControl'
      })
      .when('/scoreboard', {
        templateUrl: 'app/partials/scoreboard.html',
        controller: 'ScoreboardControl'
      })
      .otherwise('/');
  }]);
