'use strict';

const express = require('express');
const router = express.Router();
const request = require("request");


router.get("/stock/:stock", (req, res) => {
  const stock = req.params.stock;
  console.log("Stock name>>>>>>", stock);

  request('http://dev.markitondemand.com/MODApis/Api/v2/Quote/json?symbol=' + stock, (error, response, body) => {

    let str = '';
    let result;

    result = JSON.parse(body);

    res.send({
      indivStock: stock,
      companyname: result["Name"],
      lastprice: result["LastPrice"],
      todaysopen: result["Open"],
      todayshigh: result["High"],
      todayslow: result["Low"]
    });
  });
});


router.get("/stocksearch/:stock", (req, res) => {
  const stock = req.params.stock;


  request('http://dev.markitondemand.com/Api/v2/Lookup/json?input=' + stock, (error, response, body) => {


    let result = JSON.parse(body);

    res.send(result);
  });
});


module.exports = router;
