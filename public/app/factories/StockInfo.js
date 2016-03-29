app.factory("StockInfo",
  ["$http", "$q", function($http, $q) {

    let companyName;
    let indivStock;
    let lastPrice;
    let todaysHigh;
    let todaysLow;
    let todaysOpen;


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
      return $q(function(resolve, reject){
      $http.post('../userstocks', {
        userid: userId } )
        .then(function (response) {
          console.log("SUCCESS", response);
          resolve(response.data);
          }, function (error) {
          console.log(error);
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
    }
  }

}]);
