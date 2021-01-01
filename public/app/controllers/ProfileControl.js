app.controller("ProfileControl", ["$scope", "$rootScope", "$location", "$http", "UserInfo", function($scope, $rootScope, $location, $http, userinfo) {

  var getSession = localStorage.getItem('logged');
  var checkSession = JSON.parse(getSession);

  $scope.$parent.userName = checkSession.username;
  $scope.$parent.bankAccount = checkSession.bankaccount;
  $scope.$parent.userId = checkSession.userid;
  $scope.$parent.loggedIn = checkSession.loggedin;
  console.log("SESSION USERNAME", $scope.$parent.userName)
  console.log("SESSION BANK ACCOUNT", $scope.$parent.bankAccount)
  console.log("SESSION USER ID", $scope.$parent.userId)
  console.log("SESSION LOGGED IN", $scope.$parent.loggedIn)

  $http.post('../userstocks', {
      userid: $scope.$parent.userId } )
    .then(function (response) {
      console.log("USER STOCKS SUCCESS", response);
      $scope.ownedStocks = response.data;
      var portfolioValue = $scope.ownedStocks.reduce((total, val) => { 
        console.log("TOTAL", total, "VALUE", val)
        return total + (val.currentprice * val.quantityowned) 
      }, 0 )

      $scope.$parent.portfolioValue = portfolioValue || 0
      }, function (error) {
      console.log(error);
  });

}]);
