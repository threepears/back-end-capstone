app.controller("BuyControl", ["$scope", "$rootScope", "$location", "$http", "StockInfo", "UserInfo", function($scope, $rootScope, $location, $http, stockinfo, userinfo) {


  $scope.count = Math.floor($scope.$parent.bankAccount / $scope.lastPrice);

  // $scope.totalValue = Math.round(($scope.lastPrice - $scope.initialPrice) * $scope.quantityOwned);

  $scope.makePurchase = function() {

    var quantity = $("#stockQuantity").val();
    var cost = (quantity * $scope.lastPrice);
    var getSession = localStorage.getItem('logged');
    var logged = JSON.parse(getSession);

    $scope.bankAccount = $scope.bankAccount - cost;

    userinfo.setUserMoney($scope.bankAccount);

    logged.bankaccount = $scope.bankAccount;

    localStorage.setItem('logged', JSON.stringify(logged));

    $http.put('../postgres', {
      bankAccount: $scope.bankAccount,
      stocksymbol: $scope.indivStock,
      stockname: $scope.companyName,
      quantityowned: quantity,
      purchaseprice: $scope.lastPrice,
      userid: $scope.userId} )
    .then(function (response) {
      console.log("SUCCESS", response);
      var stocks = stockinfo.getCurrentStockInfo($scope.userId);
      console.log(stocks);

      stocks.then((response) => {
        console.log(response);
        $scope.ownedStocks = response;
        console.log($scope.ownedStocks);
        $location.path('/profile').replace();
      });

      }, function (error) {
      console.log(error);
    });

  }

}]);
