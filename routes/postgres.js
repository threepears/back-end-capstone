'use strict';

const express = require('express');
const app = express();
const router = express.Router();
const request = require("request");
// const { request } = require("gaxios");
const later = require("later");
const API_KEY = process.env.API_KEY

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

const getDistinctStocks = () => 
  pg('stocks').distinct('stocksymbol').select()

const getStockRow = stock => 
  pg('stocks').where('stocksymbol', stock)

const updateStockInfo = (price, rowData) => 
  pg('stocks')
    .where('id', rowData.id)
    .update({currentprice: price, totalvalue: price * rowData.quantityowned})

// function to execute
// function logTime() {
router.patch("/updatestocks", async (_req, res) => {
  try {
    const distinctStocks = await getDistinctStocks()
    console.log("DISTINCT STOCKS", distinctStocks)
    if (distinctStocks === 0) {
      return res.send(400).status('No stocks found to update.');
    } else {
      const stocks = distinctStocks.map(st => st.stocksymbol)
      let allStocks = []
      console.log("STONKS", stocks)
      stocks.forEach((each, stocksIndex) => {
        request('https://cloud.iexapis.com/stable/stock/' + each + '/quote?token=' + API_KEY, async (_error, _response, body) => {
          try {
            let price
            console.log("GETTING STOCKS BODY CHECK", body)
            if (body !== "Unknown symbol" || body !== "Not found") {
              let allStockRows = []
              console.log("GETTING READY TO PARSE", body)
              let result = JSON.parse(body)
              console.log("WE DONE PARSED THAT", result)
              price = result.latestPrice || 0
              const stockRow = await getStockRow(each)

              stockRow.forEach(async (row, stockRowIndex) => {
                let updated = await updateStockInfo(price, row)
                updated && allStockRows.push(stockRowIndex)

                if (stockRow.length === allStockRows.length) {
                  allStocks.push(stocksIndex)
                }

                if (allStocks.length === stocks.length) {
                  res.sendStatus(200)
                }
              })
            }
          } catch (error) {
            console.error("FOR EACH STOCK UPDATE ERROR", error)
          }
        })
      })
    }
  } catch (error) {
    console.error("UPDATE STOCKS ERROR", error)
  }
});

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
        console.log("SCOREBOARD - GET SERVER SUCCESS", data);
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
        console.log("GET USERSTOCKS - GET SERVER SUCCESS", data);
        res.send(data);
      }
    })
    .catch((err) => {
      console.log("GET ERROR", err);
    })
});

// Get a user's owned stock info on login
router.post("/userstocks", (req, res) => {
  let userId = req.body.userid;

  return pg('stocks').where('userid', userId)
    .then(function(data) {
        res.send(data); 
    }).catch((err) => {
      console.log("GET ERROR", err);
    })
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
