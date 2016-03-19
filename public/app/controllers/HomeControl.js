app.controller("HomeControl",
  ["$scope", "$rootScope", "$location", "StockInfo", function($scope, $rootScope, $location, stockinfo) {


  /* Declare scope variables */
  /*  $scope.$parent.saveArtistButton = "Save This Artist";
  $scope.$parent.savedArtist = false;*/

  $scope.getStockInfo = function() {
    var stockPick = $("#stockName").val();

    var stockResults = stockinfo.setCurrentStockInfo(stockPick);

    stockResults.then((response) => {

      stockinfo.setCompanyName(response.data.companyname);
      stockinfo.setIndivStock(response.data.indivStock);
      // stockinfo.setLastPrice($scope.lastPrice);
      // stockinfo.setTodaysHigh($scope.todaysHigh);
      // stockinfo.setTodaysLow($scope.todaysLow);
      // stockinfo.setTodaysOpen($scope.todaysOpen);
      $location.path('/results').replace();
    });
  };


  /* Add purchased stock to user's account */
  // $scope.saveArtist = function() {
  //   var selectedArtist = $scope.artistName;
  //   console.log(selectedArtist);

  //   var userUid = Authenticate.getUid();
  //   console.log(userUid);

  //   var userRef = new Firebase("https://hoodat.firebaseio.com/users/" + userUid + "/artists");

  //   userRef.push(selectedArtist);

  //   $scope.$parent.saveArtistButton = "Artist Saved!"
  //   $scope.$parent.savedArtist = true;
  // };

}]);
