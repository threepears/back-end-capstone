app.controller("ResultsControl",
  ["$scope", "$location", "StockInfo", function($scope, $location, stockinfo) {

    $scope.companyName = stockinfo.getCompanyName();
    $scope.indivStock = stockinfo.getIndivStock();


    // $scope.getName = function() {
    //   $scope.companyName = stockinfo.getCompanyName();
    //   console.log($scope.companyName);
    // };



}]);
