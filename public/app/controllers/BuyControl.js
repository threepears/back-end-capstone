app.controller("BuyControl", ["$scope", "$rootScope", "$location", "StockInfo", function($scope, $rootScope, $location, stockinfo) {


  /* Assign Buy Control variables */
  $scope.user = "Mike";
  $scope.bankAccount = 1000;
  $scope.quantityOwned = 25;
  $scope.initialPrice = 15;
  currentPrice = stockinfo.getLastPrice();

  $scope.count = Math.floor($scope.bankAccount / currentPrice);
  $scope.totalValue = Math.round((currentPrice - $scope.initialPrice) * $scope.quantityOwned);

}]);
