app.controller("RegisterControl", ["$scope", "$rootScope", "$location", "StockInfo", "$http", function($scope, $rootScope, $location, stockinfo, $http) {


  $scope.registerUser = function() {
    let firstName = $("#firstName").val();
    let lastName = $("#lastName").val();
    let emailAddress = $("#registerEmail").val();

    $http.post('../postgres', {
      firstname: firstName,
      lastname: lastName,
      email: emailAddress } )
    .then(function (response) {
      console.log("SUCCESS", response);
      }, function (error) {
      console.log(error);
    });
  };


}]);
