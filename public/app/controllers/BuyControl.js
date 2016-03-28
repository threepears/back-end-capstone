app.controller("BuyControl", ["$scope", "$rootScope", "$location", "$http", "StockInfo", "UserInfo", function($scope, $rootScope, $location, $http, stockinfo, userinfo) {


  // $scope.quantityOwned = 25;
  // $scope.initialPrice = 15;

  $scope.count = Math.floor($scope.$parent.bankAccount / $scope.lastPrice);

  // $scope.totalValue = Math.round(($scope.lastPrice - $scope.initialPrice) * $scope.quantityOwned);

  $scope.makePurchase = function() {
    let quantity = $("#stockQuantity").val();
    let cost = (quantity * $scope.lastPrice);

    $scope.bankAccount = $scope.bankAccount - cost;

    userinfo.setUserMoney($scope.bankAccount);

    $http.put('../postgres', {
      bankAccount: $scope.bankAccount,
      stocksymbol: $scope.indivStock,
      stockname: $scope.companyName,
      quantityowned: quantity,
      purchaseprice: $scope.lastPrice,
      userid: $scope.userId} )
    .then(function (response) {
      console.log("SUCCESS", response);
      $location.path('/profile').replace();
      }, function (error) {
      console.log(error);
    });

  }

}]);
