app.controller("ProfileControl", ["$scope", "$rootScope", "$location", "$http", "UserInfo", function($scope, $rootScope, $location, $http, userinfo) {

  var getSession = localStorage.getItem('logged');
  var checkSession = JSON.parse(getSession);

  $scope.$parent.userName = checkSession.username;
  $scope.$parent.bankAccount = checkSession.bankaccount;
  $scope.$parent.userId = checkSession.userid;
  $scope.$parent.loggedIn = checkSession.loggedin;


  $http.post('../userstocks', {
      userid: $scope.$parent.userId } )
    .then(function (response) {
      console.log("SUCCESS", response);
      $scope.ownedStocks = response.data;
      $scope.$parent.portfolioValue = $scope.ownedStocks.reduce((total, val) => { return total + (val.currentprice * val.quantityowned) }, 0 )
      console.log($scope.ownedStocks);
      }, function (error) {
      console.log(error);
  });

}]);
