app.controller("BuyControl", ["$scope", "$rootScope", "$location", "StockInfo", function($scope, $rootScope, $location, stockinfo) {


  /* Assign Buy Control variables */
  $scope.user = "Mike";
  $scope.bankAccount = 1000;
  currentPrice = stockinfo.getLastPrice();

  $scope.count = Math.floor($scope.bankAccount / currentPrice);

}]);
