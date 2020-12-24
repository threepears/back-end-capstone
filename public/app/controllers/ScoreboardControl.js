app.controller("ScoreboardControl",
  ["$scope", "$rootScope", "$location", "$http", "StockInfo", function($scope, $rootScope, $location, $http, stockinfo) {

    var getScoringRank = currentProfit => {
      switch(currentProfit) {
        case currentProfit < 100:
          return "Pauper";
        case currentProfit < 1000:
          return "Working Man";
        case currentProfit < 1000:
          return "Working Man";
        case currentProfit < 100000000:
          return "Joe Rogan";
        case currentProfit < 1000000000:
          return "Ted Turner";
        case currentProfit < 10000000000:
          return "Jerry Jones";
        case currentProfit > 100000000000:
          return "Jeff Bezos";
        default:
          // code block
      }
    };

    $http.get('../scoreboard', {} )
    .then(function (response) {
      console.log("SCOREBOARD SUCCESS", response);
      $scope.richestFolks = response.data;
      }, function (error) {
      console.log("SCOREBOARD ERROR", error);
    });

    // $scope.richestFolks = [
    //   {"name": "Bob", "rank": "Bill Gates", "profits": 3020.33 },
    //   {"name": "James", "rank": "Warren Buffett", "profits": 2984.25 },
    //   {"name": "Sally", "rank": "Warren Buffett", "profits": 2345.77 },
    //   {"name": "Richard", "rank": "Warren Buffett", "profits": 2101.23 },
    //   {"name": "Tina", "rank": "Jay-Z", "profits": 1998.39 },
    //   {"name": "Arnold", "rank": "Jay-Z", "profits": 1654.01 },
    //   {"name": "Daniel", "rank": "Jay-Z", "profits": 1430.44 },
    //   {"name": "Frida", "rank": "Jay-Z", "profits": 1139.69 },
    //   {"name": "Charlie", "rank": "Pauper", "profits": 800.32 },
    //   {"name": "Stephanie", "rank": "Pauper", "profits": 431.98 }
    // ];



}]);
