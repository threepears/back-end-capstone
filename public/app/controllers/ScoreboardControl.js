app.controller("ScoreboardControl",
  ["$scope", "$rootScope", "$location", "$http", "StockInfo", function($scope, $rootScope, $location, $http, stockinfo) {

    var getScoringRank = currentProfit => {
      if (currentProfit < 100) {
        return "Pauper";
      } else if (currentProfit < 1000) {
        return "Working Man";
      } else if (currentProfit < 100000000) {
        return "Joe Rogan";
      } else if (currentProfit < 1000000000) {
        return "Ted Turner";
      } else if (currentProfit < 10000000000) {
        return "Jerry Jones";
      } else if (currentProfit > 100000000000) {
        return "Jeff Bezos";
      } else {
        return "Pauper";
      }
    };

    var transformScoreboardData = data => {
      $scope.richestFolks = data.map(d => ({
        currentTotalProfit : d.current_total_profit,
        firstName: d.first_name,
        rank: getScoringRank(d.current_total_profit)
      }))
    }

    $http.get('../scoreboard', {} )
    .then(function (response) {
      transformScoreboardData(response.data)    
      }, function (error) {
      console.log("SCOREBOARD ERROR", error);
    });
}]);
