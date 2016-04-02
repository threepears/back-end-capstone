app.controller("ProfileControl", ["$scope", "$rootScope", "$location", "$http", "UserInfo", function($scope, $rootScope, $location, $http, userinfo) {

  let getSession = localStorage.getItem('logged');
  let checkSession = JSON.parse(getSession);

  $scope.$parent.userName = checkSession.username;
  $scope.$parent.bankAccount = checkSession.bankaccount;
  $scope.$parent.userId = checkSession.userid;
  $scope.$parent.loggedIn = checkSession.loggedin;


  $http.post('../userstocks', {
      userid: $scope.$parent.userId } )
    .then(function (response) {
      console.log("SUCCESS", response);
      $scope.ownedStocks = response.data;
      console.log($scope.ownedStocks);
      }, function (error) {
      console.log(error);
  });

}]);
