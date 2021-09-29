app.controller("ResultsControl",
  ["$scope", "$rootScope", "$location", "StockInfo", function($scope, $rootScope, $location, stockinfo) {

    $scope.$parent.companyName = stockinfo.getCompanyName();
    $scope.$parent.indivStock = stockinfo.getIndivStock();
    $scope.$parent.lastPrice = stockinfo.getLastPrice();
    $scope.$parent.todaysHigh = stockinfo.getTodaysHigh();
    $scope.$parent.todaysLow = stockinfo.getTodaysLow();
    $scope.$parent.todaysOpen = stockinfo.getTodaysOpen();
    $scope.$parent.errorMessage = stockinfo.getErrorMessage();

    $scope.checkLogin = function() {
      if ($scope.loggedIn === false) {
        $scope.buyError = "You need to log in to make purchases!";
      } else {
        $location.path('/buy').replace();
      }
    }
}]);
