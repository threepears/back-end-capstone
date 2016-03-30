app.controller("ScoreboardControl",
  ["$scope", "$rootScope", "$location", "StockInfo", function($scope, $rootScope, $location, stockinfo) {

    $scope.richestFolks = [
      {"name": "Bob", "rank": "Bill Gates", "profits": 3020.33 },
      {"name": "James", "rank": "Warren Buffett", "profits": 2984.25 },
      {"name": "Sally", "rank": "Warren Buffett", "profits": 2345.77 },
      {"name": "Richard", "rank": "Warren Buffett", "profits": 2101.23 },
      {"name": "Tina", "rank": "Jay-Z", "profits": 1998.39 },
      {"name": "Arnold", "rank": "Jay-Z", "profits": 1654.01 },
      {"name": "Daniel", "rank": "Jay-Z", "profits": 1430.44 },
      {"name": "Frida", "rank": "Jay-Z", "profits": 1139.69 },
      {"name": "Charlie", "rank": "Pauper", "profits": 800.32 },
      {"name": "Stephanie", "rank": "Pauper", "profits": 431.98 }
    ];



}]);
