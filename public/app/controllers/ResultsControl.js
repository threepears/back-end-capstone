app.controller("ResultsControl",
  ["$scope", "$location", "StockInfo", function($scope, $location, stockinfo) {

    $scope.companyName = stockinfo.getCompanyName();
    $scope.indivStock = stockinfo.getIndivStock();
    $scope.lastPrice = stockinfo.getLastPrice();
    $scope.todaysHigh = stockinfo.getTodaysHigh();
    $scope.todaysLow = stockinfo.getTodaysLow();
    $scope.todaysOpen = stockinfo.getTodaysOpen();


}]);
