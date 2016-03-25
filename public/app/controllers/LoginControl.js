app.controller("LoginControl", ["$scope", "$rootScope", "$location", "StockInfo", function($scope, $rootScope, $location, stockinfo) {


  $scope.loginUser = function() {
    let email = $("#loginEmail").val();

    console.log(email);

    $http.get('../postgres', {
      email: emailAddress } )
    .then(function (response) {
      console.log("SUCCESS", response);
      }, function (error) {
      console.log(error);
    });
  };


}]);
