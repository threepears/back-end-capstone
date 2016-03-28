app.controller("ProfileControl", ["$scope", "$rootScope", "$location", "$http", "UserInfo", function($scope, $rootScope, $location, $http, userinfo) {


  $scope.$parent.userName = userinfo.getUserName();
  $scope.$parent.bankAccount = userinfo.getUserMoney();
  $scope.$parent.userId = userinfo.getUserId();
  $scope.$parent.loggedIn = userinfo.getLoggedIn();


  $http.post('../userstocks', {
      userid: $scope.$parent.userId } )
    .then(function (response) {
      console.log("SUCCESS", response);
      $scope.ownedStocks = response.data;
      }, function (error) {
      console.log(error);
  });


  // var userStocks = stockinfo.setCurrentStockInfo(stockPick);

  // userStocks.then((response) => {
  //   stockinfo.setCompanyName(response.data.companyname);
  //   stockinfo.setIndivStock(response.data.indivStock);
  //   stockinfo.setLastPrice(response.data.lastprice);
  //   stockinfo.setTodaysHigh(response.data.todayshigh);
  //   stockinfo.setTodaysLow(response.data.todayslow);
  //   stockinfo.setTodaysOpen(response.data.todaysopen);

  //   $location.path('/results').replace();
  // });


}]);
