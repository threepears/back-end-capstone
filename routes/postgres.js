'use strict';

const express = require('express');
const app = express();
const router = express.Router();
const request = require("request");


// Initializing the Knex library
const pg = require('knex')({
  client: 'pg',
  connection: process.env.PG_CONNECTION_STRING || 'postgres://localhost:5432/takingstock',
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
      table.date('datepurchased');
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
  // pg('stocks').where('userid', req.body.userid)
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

  pg.insert({firstname: req.body.firstname, lastname: req.body.lastname, email: req.body.email, bankAccount: 1000}, "id").into("users")
    .catch((err) => { console.log("ERROR", err) });

  res.sendStatus(200);
});


// Insert new stock info into table
router.put("/postgres", (req, res) => {

  let date = new Date();
  console.log(req.body);

  pg("users").where('id', req.body.userid).update({bankAccount: req.body.bankAccount})

    .catch((err) => { console.log("ERROR", err) });

  pg.insert({stocksymbol: req.body.stocksymbol, stockname: req.body.stockname, quantityowned: req.body.quantityowned, purchaseprice: req.body.purchaseprice, datepurchased: date, userid: req.body.userid}, "id").into("stocks")
    .then(function(data) {
      res.sendStatus(200);
      })
    .catch((err) => { console.log("ERROR", err) });

});


module.exports = router;
