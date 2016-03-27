app.controller("LoginControl", ["$scope", "$rootScope", "$location", "StockInfo", "$http", function($scope, $rootScope, $location, stockinfo, $http) {


  $scope.loginUser = function() {
    let emailAddress = $("#loginEmail").val();

    console.log(emailAddress);

    $http.post('../redisdata', {
      email: emailAddress } )
    .then(function (response) {
      console.log("SUCCESS", response);
      }, function (error) {
      console.log(error);
    });
  };


}]);
