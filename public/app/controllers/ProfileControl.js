app.controller("ProfileControl", ["$scope", "$rootScope", "$location", "$http", "UserInfo", function($scope, $rootScope, $location, $http, userinfo) {

  var getSession = localStorage.getItem('logged');
  var checkSession = JSON.parse(getSession);
  console.log("CHECK SESSIONSSSSSSSSSS", checkSession)
  $scope.$parent.userName = checkSession.username;
  $scope.$parent.bankAccount = checkSession.bankaccount;
  $scope.$parent.userId = checkSession.userid;
  $scope.$parent.loggedIn = checkSession.loggedin;
  console.log("SESSION USERNAME", $scope.$parent.userName)
  console.log("SESSION BANK ACCOUNT", $scope.$parent.bankAccount)
  console.log("SESSION LOGGED IN", $scope.$parent.loggedIn)
  console.log("DATABASE URL", process.env.DATABASE_URL)
  console.log("API KEY", process.env.API_KEY)

  $http.post('../userstocks', {
      userid: $scope.$parent.userId } )
    .then(function (response) {
      console.log("WHO IS IT?", checkSession.userid)
      console.log("USER STOCKS SUCCESS", response);
      $scope.ownedStocks = response.data;
      var portfolioValue = $scope.ownedStocks.reduce((total, val) => { 
        console.log("TOTAL", total, "VALUE", val)
        return total + (val.currentprice * val.quantityowned) 
      }, 0 )
      $scope.$parent.portfolioValue = portfolioValue || 0
      console.log("OWNED STOCKS VALUE!!!", portfolioValue);
      console.log("OWNED STOCKS VALUE!!!", $scope.ownedStocks);
      }, function (error) {
      console.log(error);
  });

}]);
