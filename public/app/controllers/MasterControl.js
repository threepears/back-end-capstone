app.controller("MasterControl", ["$scope", "$rootScope", "$location", function($scope, $rootScope, $location) {


  $scope.changePage = function(newPath) {
      $location.path(newPath).replace();
    }



}]);
