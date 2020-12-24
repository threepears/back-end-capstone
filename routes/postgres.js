'use strict';

const express = require('express');
const app = express();
const router = express.Router();
const request = require("request");
// const { request } = require("gaxios");
const later = require("later");
console.log("POSTGRES DATABASE URL", process.env.DATABASE_URL)
console.log("POSTGRES API KEY", process.env.API_KEY)

// Initializing the Knex library
const pg = require('knex')({
  client: 'pg',
  connection: process.env.DATABASE_URL || 'postgres://localhost:5432/takingstock',
  searchPath: ['knex', 'public']
});


// Create tables if they don't already exist
pg.schema.hasTable('users').then(function(exists) {
  if (!exists) {
    return pg.schema.createTable('users', function (table) {
      table.increments();
      table.string('firstname');
      table.string('lastname');
      table.string('email');
      table.float('bankAccount');
      table.float('currentProfit');
    })
    .then(function (data) {
      console.log("HEY", data);
    })
    .catch(function(error) {
      console.log(error);
    });
  }
});

pg.schema.hasTable('stocks').then(function(exists) {
  if (!exists) {
    return pg.schema.createTable('stocks', function(table) {
      table.increments();
      table.string('stocksymbol');
      table.string('stockname');
      table.integer('quantityowned');
      table.float('purchaseprice');
      table.float('currentprice');
      table.date('datepurchased');
      table.float('totalvalue');
      table.integer('userid').references('users.id');
    })
    .then(function (data) {
      console.log("HEY2", data);
    })
    .catch(function(error) {
      console.log(error);
    });
  }
});



// define a new schedule
// var textSched = later.parse.text('at 15:15 every weekday');
var textSched = later.parse.text('every 1 min');

// set later to use local time
// later.date.localTime();

// execute logTime for each successive occurrence of the text schedule
// var timer =
// later.setInterval(logTime, textSched);

// function to execute
function logTime() {
  pg('stocks').distinct('stocksymbol').select()
    .then(function(data) {
      console.log("GET REQUEST LOG TIME", data.length);
      if (data.length === 0) {
        console.log("GET SERVER ERROR", data);
        res.sendStatus(400);
      } else {
        console.log("GET SERVER SUCCESS", data);
        var stocks = data.map( n => n.stocksymbol );

        stocks.forEach(function(each) {
          // const body = await request({
          //   url: 'https://cloud.iexapis.com/stable/stock/' + each + '/quote?token=sk_1c0ceff7fedd40c69e6c6276bf736ec5'
          // });
          request('https://cloud.iexapis.com/stable/stock/' + each + '/quote?token=sk_1c0ceff7fedd40c69e6c6276bf736ec5', (error, response, body) => {
            // request({ url: 'https://cloud.iexapis.com/stable/stock/' + each + '/quote?token=sk_1c0ceff7fedd40c69e6c6276bf736ec5' })
            // .then(function(body) {
            let price
            console.log("STOCKS FOR EACH", body)
            if(body !== "Unknown symbol") {
              let result = JSON.parse(body);
              console.log("RESULT", result)
              console.log("EACH PRICE", each, result.latestPrice);
              price = result.latestPrice || 0
            } else {
              price = 0
            }

            pg('stocks').where('stocksymbol', each)
              .select('quantityowned', function(data) {
                console.log("SELECTDATA", data);
              })
              .update({currentprice: price})
              .catch((err) => { console.log("ERROR", err) });
          });
        })
        // 'http://dev.markitondemand.com/MODApis/Api/v2/Quote/json?symbol=' + each
        // 'http://www.alphavantage.co/query?function=GLOBAL_QUOTE&apikey=ARC1Z4SZBAGRITSW&symbol='
        res.send(data);
      }
    })
    .catch((err) => {
      console.log("GET ERROR", err);
    })
}

// clear the interval timer when you are done
// timer2.clear();

// Get all stocks a user owns
router.get("/scoreboard", (req, res) => {
  console.log("GETTING THE SCOREBOARD", req.body);
  pg('users').select('firstname', 'currentProfit').orderBy('currentProfit', 'desc').limit(10)
    .then(function(data) {
      console.log("SHOW SCOREBOARD PEEPS", data.length);
      if (data.length === 0) {
        console.log("GET SERVER ERROR", data);
        res.sendStatus(400);
      } else {
        console.log("GET SERVER SUCCESS", data);
        res.send(data);
      }
    })
    .catch((err) => {
      console.log("GET ERROR", err);
    })
})


// Get all stocks a user owns
router.get("/userstocks", (req, res) => {

  console.log("REQ BODY GET STOCKS", req.body);
  pg('stocks').where('userid', req.body.userid)
    .then(function(data) {
      console.log("GET REQUEST ROUTE GET", data.length);
      if (data.length === 0) {
        console.log("GET SERVER ERROR", data);
        res.sendStatus(400);
      } else {
        console.log("GET SERVER SUCCESS", data);
        res.send(data);
      }
    })
    .catch((err) => {
      console.log("GET ERROR", err);
    })
});

// Update owned stock value and profit on login
router.post("/userstocks", (req, res) => {
  let userId = req.body.userid;
  console.log("USERSTOCKS USER ID", userId)
  return pg('stocks').select('stocksymbol').where('userid', userId)
    .then(function(data) {
      if (data === undefined || data.length == 0) { 
        res.send(data); 
      } else {
        data.map(({ stocksymbol }) => {
          console.log("STOCK?", stocksymbol);
          request('https://cloud.iexapis.com/stable/stock/' + stocksymbol + '/quote/latestPrice?token=sk_1c0ceff7fedd40c69e6c6276bf736ec5', (_error, _response, body) => {
            let newPrice
            console.log("BODY IN LOGIN", body)
            if(body !== "Unknown symbol") {
              newPrice = JSON.parse(body);
            } 

            pg('stocks').where('stocksymbol', stocksymbol)
              .update('currentprice', newPrice)
              .then(function() {
                console.log("HEY DATAAAAAA", data)
                pg('stocks').where('userid', userId)
                  .then(function(data) {
                    let currentProfit = data.reduce((sum, stock) => {
                      let { currentprice, purchaseprice, quantityowned } = stock;
                      let profit = (currentprice - purchaseprice) * quantityowned;
                      return sum + profit;
                    }, 0)
                    console.log("CURRENT PROFIT", currentProfit, userId)
                    pg('users').where('id', userId)
                      .update('currentProfit', currentProfit)
                      .then(function() {
                        console.log("ONE FINAL CHECK OF USER ID", userId)
                        pg('stocks').where('userid', userId) 
                          .then(function(data) {
                            console.log("GET REQUEST", data.length);
                            if (data.length === 0) {
                              console.log("GET SERVER ERROR", data);
                              res.sendStatus(400);
                            } else {
                              console.log("GET SERVER SUCCESS", data);
                              res.send(data);
                            }
                          }).catch((err) => {
                            console.log("RES SEND ERROR", err);
                          })
                      })
                  })
              })
          })
        })
      }
    }).catch((err) => {
      console.log("GET ERROR", err);
    })

  // pg('stocks').distinct('stocksymbol').select()
  //   .then(function(data) {
  //     console.log("GET REQUEST", data.length);
  //     if (data.length === 0) {
  //       console.log("GET SERVER ERROR", data);
  //       res.sendStatus(400);
  //     } else {
  //       console.log("GET SERVER SUCCESS", data);
  //       res.send(data);
  //     }
  //   })
  //   .catch((err) => {
  //     console.log("GET ERROR", err);
  //   })
});


// Insert new user into table
router.post("/postgres", (req, res) => {

  pg.insert({firstname: req.body.firstname, lastname: req.body.lastname, email: req.body.email, bankAccount: 1000, currentProfit: 0}, "id").into("users")
    .catch((err) => { console.log("ERROR", err) });

  res.sendStatus(200);
});


// Insert new stock info into table
router.put("/postgres", (req, res) => {

  let date = new Date();
  console.log("PUTTING NEW STOCK IN", req.body);

  let total = req.body.purchaseprice * req.body.quantityowned;

  pg("users").where('id', req.body.userid).update({bankAccount: req.body.bankAccount})

    .catch((err) => { console.log("ERROR", err) });

  pg.insert({stocksymbol: req.body.stocksymbol, stockname: req.body.stockname, quantityowned: req.body.quantityowned, purchaseprice: req.body.purchaseprice, currentprice: req.body.purchaseprice, datepurchased: date, totalvalue: total, userid: req.body.userid}, "id").into("stocks")
    .then(function(data) {
      res.sendStatus(200);
      })
    .catch((err) => { console.log("ERROR", err) });

});


module.exports = router;
