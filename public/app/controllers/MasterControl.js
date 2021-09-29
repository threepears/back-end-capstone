app.controller("MasterControl", ["$scope", "$rootScope", "$location", "$http", "$route", "StockInfo", "UserInfo", function($scope, $rootScope, $location, $http, $route, stockinfo, userinfo) {

  $scope.loggedIn = false;
  $scope.ownedStocks = [];
  $scope.hasError = false;

  var getSession = localStorage.getItem('logged');

  if (getSession) {
    var checkSession = JSON.parse(getSession);

    $scope.userName = checkSession.userName;
    $scope.bankAccount = checkSession.bankAccount;
    $scope.userId = checkSession.userId;
    $scope.loggedIn = checkSession.loggedIn;
  }

  $scope.setError = function(bool) {
    $scope.hasError = bool;
  }

  $scope.changePage = function(newPath) {
    if ($location.path() === `/${newPath}`) {
      $route.reload();
    } else {
      $location.path(`/${newPath}`).replace();
    }
  }

  /***************************************
  WORK ON AUTOCOMPLETE FEATURE
  ***************************************/

  // $( "#autocomplete" ).autocomplete({
  //   source: '/stocksearch'
  // });


 // $(function() {

 //        $("#autocomplete")
 //            .focus()
 //            .autocomplete({
 //                source: function(request,response) {
 //                    $.ajax({
 //                        beforeSend: function(){
 //                            $("span.help-inline").show();
 //                            $("span.label-info").empty().hide();
 //                        },
 //                        url: "/stocksearch",
 //                        dataType: "jsonp",
 //                        data: {
 //                            input: request.term
 //                        },
 //                        success: function(data) {
 //                            console.log("SUCCESS DATA", data);
 //                            response( $.map(data, function(item) {
 //                              console.log("SUCCESS ITEM", item);
 //                                return {
 //                                    label: item.Name + " (" +item.Exchange+ ")",
 //                                    value: item.Symbol
 //                                }
 //                            }));
 //                            $("span.help-inline").hide();
 //                        },
 //                        error: function(err) {
 //                          if (err) {
 //                            console.log(err);
 //                          }
 //                        }
 //                    });
 //                },
 //                minLength: 0,
 //                select: function( event, ui ) {
 //                    //console.log(ui.item);
 //                    $("span.label-info").html("You selected " + ui.item.label).fadeIn("fast");
 //                },
 //                open: function() {
 //                    //$(this).removeClass("ui-corner-all").addClass("ui-corner-top");
 //                },
 //                close: function() {
 //                    //$(this).removeClass("ui-corner-top").addClass("ui-corner-all");
 //                }
 //            })
 //        ;
 //    });

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
    var stockResults = stockinfo.setCurrentStockInfo(stockPick.val());
    
    stockResults
      .then(function({data}) {
        stockinfo.setCompanyName(data.companyname);
        stockinfo.setIndivStock(data.indivStock);
        stockinfo.setLastPrice(data.lastprice);
        stockinfo.setTodaysHigh(data.todayshigh);
        stockinfo.setTodaysLow(data.todayslow);
        stockinfo.setTodaysOpen(data.todaysopen);
      }).then(function() {
        stockinfo.clearErrorMessage();
        $scope.setError(false);
        stockPick.val("");
        $scope.changePage('results');
      }).catch((error) => { 
        stockinfo.setIndivStock(stockPick.val());
        stockinfo.setErrorMessage(error.data);
        $scope.setError(true);
        stockPick.val("");
        $scope.changePage('results');
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
    var firstName = $("#firstName").val();
    var lastName = $("#lastName").val();
    var emailAddress = $("#registerEmail").val();

    $http.post('../postgres', {
      first_name: firstName,
      last_name: lastName,
      email: emailAddress } )
    .then(function (response) {
      }, function (error) {
      console.log(error);
    });
  };

  $scope.logout = function() {
    $scope.userName = "";
    $scope.bankAccount = "";
    $scope.userId = "";
    $scope.loggedIn = false;
    $scope.portfolioValue = 0;

    localStorage.removeItem('logged');

    $location.path('/#').replace();
  }
}]);
