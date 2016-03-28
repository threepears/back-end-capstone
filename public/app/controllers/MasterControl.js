app.controller("MasterControl", ["$scope", "$rootScope", "$location", "$http", "$route", "StockInfo", "UserInfo", function($scope, $rootScope, $location, $http, $route, stockinfo, userinfo) {

  $scope.loggedIn = false;

  $scope.changePage = function(newPath) {
    $location.path(newPath).replace();
  }


  // $( "#autocomplete" ).autocomplete({
  //   source: '/stocksearch/' + $scope.symbolSearch
  // });


  // var cache = {};
  // $("#autocomplete").autocomplete({
  //   source: function(request, response) {
  //     var term          = request.term.toLowerCase(),
  //         element       = this.element,
  //         cache         = this.element.data('autocompleteCache') || {},
  //         foundInCache  = false;

  //     $.each(cache, function(key, data){
  //       if (term.indexOf(key) === 0 && data.length > 0) {
  //         response(data);
  //         foundInCache = true;
  //         return;
  //       }
  //     });

  //       if (foundInCache) return;

  //       $.ajax({
  //           url: '/stocksearch/' + request,
  //           dataType: "json",
  //           data: request,
  //           success: function(data) {
  //               cache[term] = data;
  //               element.data('autocompleteCache', cache);
  //               response(data);
  //           }
  //       });
  //   },
  //   minLength: 2
  // });


  $scope.getStockInfo = function() {
    var stockPick = $(".stockName");

    console.log(stockPick.val());

    var stockResults = stockinfo.setCurrentStockInfo(stockPick.val());

    console.log(stockResults);

    stockResults.then((response) => {
      console.log(response);
      stockinfo.setCompanyName(response.data.companyname);
      stockinfo.setIndivStock(response.data.indivStock);
      stockinfo.setLastPrice(response.data.lastprice);
      stockinfo.setTodaysHigh(response.data.todayshigh);
      stockinfo.setTodaysLow(response.data.todayslow);
      stockinfo.setTodaysOpen(response.data.todaysopen);

      stockPick.val("");

      if ($location.path() === '/results') {
        $route.reload();
      } else {
        $location.path('/results').replace();
      }
    });
  };


  $scope.closeNav = function() {
    var dropdown_toggle = $(".dropdown-toggle");

    if ($('.dropdown-menu').is(':visible')) {
      dropdown_toggle.trigger('click');
    }
  };


  $scope.loginWindow = function() {
    $(".homeheadertext").css("display", "none");
    $(".homeregister").css("display", "none");
    $(".homelogin").css({"display": "inline-block", "width": "55%"});
  };


  $scope.registerWindow = function() {
    $(".homeheadertext").css("display", "none");
    $(".homelogin").css("display", "none");
    $(".homeregister").css({"display": "inline-block", "width": "55%"});
  };


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


  $scope.logout = function() {
    $scope.userName = "";
    $scope.bankAccount = "";
    $scope.userId = "";
    $scope.loggedIn = false;

    $location.path('/#').replace();
  }

}]);
