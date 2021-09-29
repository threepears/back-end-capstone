app.factory("StockInfo",
  ["$http", "$q", function($http, $q) {

  var companyName;
  var indivStock;
  var lastPrice;
  var todaysHigh;
  var todaysLow;
  var todaysOpen;
  var errorMessage;

  return {

    setCurrentStockInfo: function(stockName) {
      return $q(function(resolve, reject){
      $http.get('/stock/' + stockName)
        .then(function (response) {
          resolve(response);
        }, function (error) {
          reject(error);
        })
      });
    },


    getCurrentStockInfo: function(userId) {
      return $q(function(resolve, reject) {
      $http.post('../userstocks', {
        userId: userId } )
        .then(function (response) {
          resolve(response.data);
          }, function (error) {
          reject(error);
          })
      });
    },


    setCompanyName: function(name){
      companyName = name;
    },

    getCompanyName: function(){
      return companyName;
    },

    setIndivStock: function(stock){
      indivStock = stock;
    },

    getIndivStock: function(){
      return indivStock;
    },

    setLastPrice: function(price){
      lastPrice = price;
    },

    getLastPrice: function(){
      return lastPrice;
    },

    setTodaysHigh: function(high){
      todaysHigh = high;
    },

    getTodaysHigh: function(){
      return todaysHigh;
    },

    setTodaysLow: function(low){
      todaysLow = low;
    },

    getTodaysLow: function(){
      return todaysLow;
    },

    setTodaysOpen: function(open){
      todaysOpen = open;
    },

    getTodaysOpen: function(){
      return todaysOpen;
    },

    setErrorMessage: function(error){
      errorMessage = error;
    },

    clearErrorMessage: function(){
      errorMessage = "";
    },

    getErrorMessage: function(){
      return errorMessage;
    }
  }

}]);
