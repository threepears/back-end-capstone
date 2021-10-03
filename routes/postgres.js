'use strict';

const express = require('express');
const app = express();
const router = express.Router();
const request = require("request");
// const { request } = require("gaxios");
const later = require("later");
const API_KEY = process.env.API_KEY
console.log("HERE IS A DATABASE URL", process.env.DATABASE_URL)
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
      table.string('first_name');
      table.string('last_name');
      table.string('email');
      table.float('bank_account');
      table.float('current_total_profit');
    })
    .then(function (data) {
      console.log("USERS TABLE CREATED", data);
    })
    .catch(function(error) {
      console.log("ERROR CREATING USERS TABLE", error);
    });
  }
});

pg.schema.hasTable('stocks').then(function(exists) {
  if (!exists) {
    return pg.schema.createTable('stocks', function(table) {
      table.increments();
      table.integer('user_id').references('users.id');
      table.string('stock_symbol');
      table.string('stock_name');
      table.integer('quantity_owned');
      table.date('date_purchased');
      table.float('purchase_price');
      table.float('current_price');
      table.float('current_total_value');
      table.float('current_profit');
    })
    .then(function (data) {
      console.log("STOCKS TABLE CREATED", data);
    })
    .catch(function(error) {
      console.log("ERROR CREATING STOCKS TABLE", error);
    });
  }
});

// define a new schedule
// var textSched = later.parse.text('at 15:15 every weekday');
// var textSched = later.parse.text('every 1 min');

// set later to use local time
// later.date.localTime();

// execute logTime for each successive occurrence of the text schedule
// var timer =
// later.setInterval(logTime, textSched);

const getDistinctStocks = () => 
  pg('stocks').distinct('stock_symbol').select()

const getScoreboardInfo = () =>
  pg('users')
    .select('first_name', 'current_total_profit')
    .orderBy('current_total_profit', 'desc')
    .limit(10)

const getStockRow = stock => 
  pg('stocks').where('stock_symbol', stock)

const getUserIdFromEmail = email =>
  pg('users').select('id').where('email', email)

const getUserIds = () => pg('users').select('id')

const getUserStocksProfit = id =>
  pg('stocks').sum('current_profit').where('user_id', id)

const updateUserProfit = ( id, profit ) => 
  pg('users')
    .where('id', id)
    .update({ current_total_profit: profit || 0 })
    .then()

const updateStockInfo = (price, rowData) => 
  pg('stocks')
    .where('id', rowData.id)
    .update({
      current_price: price, 
      current_total_value: price * rowData.quantity_owned, current_profit: (price * rowData.quantity_owned) - (rowData.purchase_price * rowData.quantity_owned) || 0
    })
    .then()

router.post("/stockprofit", async (req, res) => {
  try {
    const [ { id } ] = await getUserIdFromEmail(req.body.email)
    const [ { sum } ] = await getUserStocksProfit(id)
    updateUserProfit(id, sum)

    return res.status(200).send('Stock profit written.');
  } catch (error) {
    console.error("GET STOCK PROFIT ERROR", error);
    return res.status(500).send(error);
  }
})

// function to execute
// function logTime()

router.patch("/updatestocks", async (_req, res) => {
  try {
    const distinctStocks = await getDistinctStocks()

    if (distinctStocks.length === 0) {
      return res.status(200).send('No stocks found to update.');
    } else {
      const stocks = distinctStocks.map(st => st.stock_symbol)
      let allStocks = []

      stocks.forEach((each, stocksIndex) => {
        request('https://cloud.iexapis.com/stable/stock/' + each + '/quote?token=' + API_KEY, async (_error, _response, body) => {
          try {
            let price

            if (body !== "Unknown symbol" && body !== "Not found") {
              let allStockRows = []
              let result = JSON.parse(body)
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
router.get("/scoreboard", async (_req, res) => {
  try {
    const userIds = (await getUserIds()).map(user => user.id)
    
    await Promise.all(userIds.map(async id => {
      const [ profit ] = await getUserStocksProfit(id)
      updateUserProfit(id, profit.sum)
    }))
    
    const scoreboardInfo = await getScoreboardInfo()
  
    if (scoreboardInfo.length === 0) {
      res.status(400).send('No scoreboard information available.');
    } else {
      res.send(scoreboardInfo);
    }
  } catch (error) {
    console.log("GET SCOREBOARD ERROR", error);
    return res.status(500).send(error);
  }
})

// Get a user's owned stock info on login
router.post("/userstocks", (req, res) => 
  pg('stocks').where('user_id', req.body.userId)
    .then(function(data) {
      var camelize = string => 
        string.split('_').reduce((acc, word, index,) => 
          index === 0 ? acc + word : acc + word.charAt(0).toUpperCase() + word.slice(1), "")

      var newData = data.map(stock => {
        var newObject = {}
        Object.entries(stock).map(([k, v]) => newObject[camelize(k)] = v)
        return newObject
      })
      res.send(newData); 
    }).catch((err) => {
      console.log("GET USERSTOCKS ERROR", err);
    })
);

// Insert new user into table
router.post("/postgres", (req, res) => {
  pg.insert({first_name: req.body.first_name, last_name: req.body.last_name, email: req.body.email, bank_account: 1000, current_total_profit: 0}, "id").into("users")
    .catch((err) => { console.log("ERROR", err) });

  res.sendStatus(200);
});


// Insert new stock info into table
router.put("/postgres", (req, res) => {
  let date = new Date();
  let total = req.body.purchasePrice * req.body.quantityOwned;

  pg.insert({stock_symbol: req.body.stockSymbol, stock_name: req.body.stockName, quantity_owned: req.body.quantityOwned, purchase_price: req.body.purchasePrice, current_price: req.body.purchasePrice, date_purchased: date, current_total_value: total, current_profit: 0, user_id: req.body.userId}, "id").into("stocks")
    .then(function() {
      pg("users").where('id', req.body.userId)
        .update({bank_account: req.body.bankAccount})
        .then(function(_data) { res.sendStatus(200); })
        .catch((err) => { console.log("USERS UPDATE ERROR", err) })
    })
});


module.exports = router;
