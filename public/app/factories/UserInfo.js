app.factory("UserInfo",
  ["$http", "$q", function($http, $q) {

    var userName;
    var userMoney;
    var userId;
    var loggedIn;


    return {

      getSessionInfo: function(){
          return $q(function(resolve, reject){
          $http.get('/')
            .then(function (response) {
              resolve(response);
            }, function (error) {
              reject(error);
          })
        });
      },

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
