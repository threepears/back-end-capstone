'use strict';

const express = require('express');
const router = express.Router();
const request = require("request");

router.get("/stock/:stock", (req, res) => {
  request('https://cloud.iexapis.com/stable/stock/' + req.params.stock + '/quote?token=' + process.env.API_KEY, (_error, _response, body) => {  
    console.log("NEW API BODYYYYY", body);
    let result = JSON.parse(body);
    console.log("GET STOCK PROPS", result);

    res.send({
      indivStock: req.params.stock,
      companyname: result["companyName"],
      lastprice: result["latestPrice"],
      todaysopen: result["open"],
      todayshigh: result["high"],
      todayslow: result["low"]
    });
  });
});

// For use with AutoComplete feature in MasterControl.js
// router.get("/stocksearch", (req, res) => {

//   const stock = req.query.term;

//   request('http://dev.markitondemand.com/Api/v2/Lookup/json?input=' + stock, (error, response, body) => {
//     console.log("MARKITONDEMAND API RESPONSE", response);

//     let result = JSON.parse(body);
//     console.log("JSON RESULT", result);

//     let thingy = [];
//     result.forEach(thing => {
//       thingy.push(thing.Name);
//     });

//     res.send(thingy);
//   });
// });


module.exports = router;
