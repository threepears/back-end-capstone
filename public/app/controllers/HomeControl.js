app.controller("HomeControl",
  ["$scope", "$rootScope", "$location", "$http", "StockInfo", "UserInfo", function($scope, $rootScope, $location, $http, stockinfo, userinfo) {


  $scope.loginUser = function() {
    var emailAddress = $("#loginEmail").val();
    console.log(emailAddress, " LOGGING IN!");

    $http.patch('../updatestocks')
      .then(function () {
        $http.post('../redisdata', {
          email: emailAddress } )
          .then(function (response) {
            userinfo.setUserName(response.data[0].firstname);
            userinfo.setUserMoney(response.data[0].bankAccount);
            userinfo.setUserProfit(response.data[0].currentProfit)
            userinfo.setUserId(response.data[0].id);

            var logged = { 
              "loggedin": true, 
              "username": response.data[0].firstname, 
              "bankaccount": response.data[0].bankAccount, 
              "currentprofit": response.data[0].currentProfit, 
              "userid": response.data[0].id 
            };

            localStorage.setItem('logged', JSON.stringify(logged));

            $location.path('/profile').replace();
          }, function (_error) {
          $scope.loginError = "You have not yet registered. Please register now!";
        });
      });
  };

}]);
