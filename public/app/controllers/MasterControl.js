app.controller("MasterControl", ["$scope", "$rootScope", "$location", function($scope, $rootScope, $location) {


  $scope.goHome = function() {
      $location.path("/").replace();
    }



}]);
