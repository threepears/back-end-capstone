app.controller("SearchControl",
  ["$scope", "$rootScope", "$location", "StockInfo", function($scope, $rootScope, $location, stockinfo) {


  $scope.getStockInfo = function() {
    var stockPick = $(".stockName").val();

    var stockResults = stockinfo.setCurrentStockInfo(stockPick);

    stockResults.then((response) => {
      stockinfo.setCompanyName(response.data.companyname);
      stockinfo.setIndivStock(response.data.indivStock);
      stockinfo.setLastPrice(response.data.lastprice);
      stockinfo.setTodaysHigh(response.data.todayshigh);
      stockinfo.setTodaysLow(response.data.todayslow);
      stockinfo.setTodaysOpen(response.data.todaysopen);

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
