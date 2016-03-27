app.factory("UserInfo",
  ["$http", "$q", function($http, $q) {

    let userName;
    let userMoney;
    let userId;
    let loggedIn;


    return {

      setUserName: function(name){
        userName = name;
      },

      getUserName: function(){
        return userName;
      },

      setUserMoney: function(amount){
        userMoney = amount;
      },

      getUserMoney: function(){
        return userMoney;
      },

      setUserId: function(id){
        userId = id;
      },

      getUserId: function(){
        return userId;
      },

      setLoggedIn: function(logged){
        loggedIn = logged;
      },

      getLoggedIn: function(){
        return loggedIn;
      }

  }

}]);
