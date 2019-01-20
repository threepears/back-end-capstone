'use strict';

const express = require('express');
const app = express();
const router = express.Router();
const request = require("request");
const later = require("later");


// Initializing the Knex library
const pg = require('knex')({
  client: 'pg',
  connection: process.env.DATABASE_URL || 'postgres://localhost:5432/takingstock',
  searchPath: 'knex, public'
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
later.date.localTime();

// execute logTime for each successive occurrence of the text schedule
var timer = later.setInterval(logTime, textSched);

// function to execute
function logTime() {
  // console.log(new Date());
  pg('stocks').distinct('stocksymbol').select()
    .then(function(data) {
      console.log("GET REQUEST", data.length);
      if (data.length === 0) {
        console.log("GET SERVER ERROR", data);
        res.sendStatus(400);
      } else {
        console.log("GET SERVER SUCCESS", data);
        var stocks = data.map( n => n.stocksymbol );
console.log("STOCKS", stocks)
        var list = [];
        stocks.forEach(function(each) {
          console.log("EACH", each)
          request('http://dev.markitondemand.com/MODApis/Api/v2/Quote/json?symbol=' + each, (error, response, body) => {
console.log("BODY", body)
            let result = JSON.parse(body);
            console.log("RESULT", result)
            console.log(each, result.LastPrice);
            let price = result.LastPrice || 0

            pg('stocks').where('stocksymbol', each)
              .select('quantityowned', function(data) {
                console.log("SELECTDATA", data);

              })
              .update({currentprice: price})
              .catch((err) => { console.log("ERROR", err) });
          });
        })
        // res.send(data);
      }
    })
    .catch((err) => {
      console.log("GET ERROR", err);
    })
}

// clear the interval timer when you are done
// timer2.clear();


// Get all stocks a user owns
router.post("/userstocks", (req, res) => {

  console.log("REQ BODY", req.body);
  pg('stocks').where('userid', req.body.userid)
    .then(function(data) {
      console.log("GET REQUEST", data.length);
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
router.put("/userstocks", (req, res) => {

  console.log("REQ BODY", req.body);

  // get all individual stocks in database
  // look up current price of each stock
  // update current price of each stock in database


  // pg('stocks').distinct('stocksymbol').select()
  //   .then(function(data) {
  //     console.log("GET REQUEST", data.length);
  //     if (data.length === 0) {
  //       console.log("GET SERVER ERROR", data);
  //       res.sendStatus(400);
  //     } else {
  //       console.log("GET SERVER SUCCESS", data);
  //       // res.send(data);
  //     }
  //   })
  //   .catch((err) => {
  //     console.log("GET ERROR", err);
  //   })
});


// Insert new user into table
router.post("/postgres", (req, res) => {

  pg.insert({firstname: req.body.firstname, lastname: req.body.lastname, email: req.body.email, bankAccount: 1000}, "id").into("users")
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
