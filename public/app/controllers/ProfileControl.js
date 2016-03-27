app.controller("ProfileControl", ["$scope", "$rootScope", "$location", "UserInfo", function($scope, $rootScope, $location, userinfo) {


  $scope.userName = userinfo.getUserName();
  $scope.bankAccount = userinfo.getUserMoney();
  $scope.userId = userinfo.getUserId();
  $scope.loggedIn = userinfo.getLoggedIn();


}]);
