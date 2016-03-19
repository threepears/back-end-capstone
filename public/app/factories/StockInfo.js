app.factory("StockInfo",
  ["$http", "$q", function($http, $q) {

    let companyName;
    let indivStock;
    let lastPrice;
    let todaysHigh;
    let todaysLow;
    let todaysOpen;


  return {

    setCurrentStockInfo: function(stockName){
        return $q(function(resolve, reject){
        $http.get('/stock/' + stockName)
          .then(function (response) {
            // companyName = response.data.companyname;
            // indivStock = response.data.indivStock;
            // lastPrice = response.data.lastprice;
            // todaysHigh = response.data.todayshigh;
            // todaysLow = response.data.todayslow;
            // todaysOpen = response.data.todaysopen;
            console.log("4", companyName);
            resolve(response);
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
      return indivStock; }
    // },

    // getCompanyName: function(){
    //   return companyName;
    // },

    // getCompanyName: function(){
    //   return companyName;
    // },

    // getCompanyName: function(){
    //   return companyName;
    // },

    // getCompanyName: function(){
    //   return companyName;
    // },

    // getCompanyName: function(){
    //   return companyName;
    // },

    // getCompanyName: function(){
    //   return companyName;
    // },

    // getCompanyName: function(){
    //   return companyName;
    // }
  }

}]);
