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
    if (currentProfit > 10000000000) {
      $(".profilepic").css("background-image", "url(https://pbs.twimg.com/profile_images/669103856106668033/UF3cgUk4_400x400.jpg)");
      return "Jeff Bezos"
    } else if (currentProfit > 1000000000) {
      $(".profilepic").css("background-image", "url(https://thumbor.forbes.com/thumbor/fit-in/416x416/filters%3Aformat%28jpg%29/https%3A%2F%2Fspecials-images.forbesimg.com%2Fimageserve%2F5d8a639e6de3150009a4f883%2F0x0.jpg%3Fbackground%3D000000%26cropX1%3D943%26cropX2%3D2577%26cropY1%3D0%26cropY2%3D1633)");
      return "Jerry Jones"
    } else if (currentProfit > 100000000) {
      $(".profilepic").css("background-image", "url(https://www.cablecenter.org/images/chof/2020/bresnan-award/Ted-Turner-2020-Headshot.png)");
      return "Ted Turner"
    } else if (currentProfit > 1000000) {
      $(".profilepic").css("background-image", "url(https://pbs.twimg.com/profile_images/552307347851210752/vrXDcTFC_400x400.jpeg)");
      return "Joe Rogan"
    } else if (currentProfit > 100000) {
      $(".profilepic").css("background-image", "url(https://www.advancy.com/wp-content/uploads/2017/07/portrait-defaut.jpg)");
      return "Business Man"
    } else if (currentProfit > 1000) {
      $(".profilepic").css("background-image", "url(https://agurgentcare.com/wp-content/uploads/2021/06/workerscomp-square.jpg)");
      return "Working Man"
    } else {
      $(".profilepic").css("background-image", "url(https://okgamers.com/wp-content/uploads/2016/10/facebook_event_1180173295383549.jpg)").css("background-position", "-40px");
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
