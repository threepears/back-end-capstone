app.controller("HomeControl",
  ["$scope", "$rootScope", "$location", "$http", "StockInfo", "UserInfo", function($scope, $rootScope, $location, $http, stockinfo, userinfo) {


  $scope.loginUser = function() {
    var emailAddress = $("#loginEmail").val();

    $http.patch('../updatestocks')
      .then(function () {
        $http.post('../stockprofit', {
          email: emailAddress } )
            .then(function () {
              $http.post('../redisdata', {
                email: emailAddress } )
                .then(function (response) {
                  userinfo.setUserName(response.data[0].first_name);
                  userinfo.setUserMoney(response.data[0].bank_account);
                  userinfo.setUserProfit(response.data[0].current_total_profit)
                  userinfo.setUserId(response.data[0].id);
                  var logged = { 
                    "loggedIn": true, 
                    "userName": response.data[0].first_name, 
                    "bankAccount": response.data[0].bank_account, 
                    "currentTotalProfit": response.data[0].current_total_profit, 
                    "userId": response.data[0].id 
                  };

                  localStorage.setItem('logged', JSON.stringify(logged));

                  $location.path('/profile').replace();
                }, function (_error) {
                $scope.loginError = "You have not yet registered. Please register now!";
              });
            });
      });
  };

}]);
