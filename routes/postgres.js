'use strict';

const express = require('express');
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
      table.integer('purchaseprice');
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


// Insert new user into table
router.post("/postgres", (req, res) => {

  pg.insert({firstname: req.body.firstname, lastname: req.body.lastname, email: req.body.email, bankAccount: 1000}, "id").into("users")
    .catch((err) => { console.log("ERROR", err) });

  res.sendStatus(200);
});

module.exports = router;
