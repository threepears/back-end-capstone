app.controller("ProfileControl", ["$scope", "$rootScope", "$location", "$http", "UserInfo", function($scope, $rootScope, $location, $http, userinfo) {

  var getSession = localStorage.getItem('logged');
  var checkSession = JSON.parse(getSession);
  userinfo.setUserProfit(checkSession.currentTotalProfit);

  $scope.$parent.userName = checkSession.userName;
  $scope.$parent.bankAccount = checkSession.bankAccount;
  $scope.$parent.userId = checkSession.userId;
  $scope.$parent.loggedIn = checkSession.loggedIn;
  $scope.$parent.currentTotalProfit = checkSession.currentTotalProfit;

  var getRank = currentProfit => {
    if (currentProfit > 1000000000000) {
      $(".profilepic").css("background-image", "url(../images/rich-guy.jpg)");
      return "Tycoon"
    } else if (currentProfit > 1000000000) {
      $(".profilepic").css("background-image", "url(../images/movie-star.jpg)");
      return "Movie Star"
    } else if (currentProfit > 1000000) {
      $(".profilepic").css("background-image", "url(../images/sports-star.jpg)");
      return "Sports Star"
    } else if (currentProfit > 100000) {
      $(".profilepic").css("background-image", "url(../images/business-man.jpg)");
      return "Business Man"
    } else if (currentProfit > 1000) {
      $(".profilepic").css("background-image", "url(../images/working-man.jpg)");
      return "Working Man"
    } else {
      $(".profilepic").css("background-image", "url(../images/beggar.jpg)");
      return "Pauper"
    }
  };

  $http.post('../userstocks', {
      userId: $scope.$parent.userId } )
    .then(function ({ data }) {
      $scope.ownedStocks = data;
      var userProfit = userinfo.getUserProfit();
      $scope.$parent.rank = getRank(userProfit);

      var portfolioValue = 
        $scope.ownedStocks.reduce((total, val) => 
          total + (val.currentPrice * val.quantityOwned), 0 );

      $scope.$parent.portfolioValue = portfolioValue || 0;
      }, function (error) {
      console.log("PROFILE CONTROL ERROR", error);
  });

}]);
