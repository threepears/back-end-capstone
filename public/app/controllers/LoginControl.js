app.controller("LoginControl", ["$scope", "$rootScope", "$location", "UserInfo", "$http", function($scope, $rootScope, $location, userinfo, $http) {


  $scope.loginUser = function() {
    let emailAddress = $("#loginEmail").val();

    console.log(emailAddress);

    $http.post('../redisdata', {
      email: emailAddress } )
    .then(function (response) {
      console.log("CONTROLLER SUCCESS", response);
      userinfo.setUserName(response.data[0].firstname);
      userinfo.setUserMoney(response.data[0].bankAccount);
      userinfo.setUserId(response.data[0].id);
      userinfo.setLoggedIn(true);

      $location.path('/profile').replace();

      // $scope.loggedIn = true;
      // $scope.userName = response.data[0].firstname;
      }, function (error) {
      console.log("CONTROLLER ERROR", error);
      $scope.loginError = "You have not yet registered. Please register now!";
    });
  };


}]);
