'use strict';

const express = require('express');
const router = express.Router();
const request = require("request");

const passwordless = require("passwordless");
// const redis = require("redis");
// const redisClient = redis.createClient();
// const redisStore = require("passwordless-redisstore");
// const emailToken = require("emailjs");

// const pathToRedis = null;

// const smtpServer = emailToken.server.connect({
//   user: yourEmail,
//   password: yourPwd,
//   host: yourSmtp,
//   ssl: true
// });

// passwordless.init(new redisStore(PORT));




// router.post("/redis", (req, res) => {
//   console.log(req.body);

//   const stock = req.params.stock;
//   console.log("Stock name>>>>>>", stock);

//   request('http://dev.markitondemand.com/MODApis/Api/v2/Quote/json?symbol=' + stock, (error, response, body) => {

//     let str = '';
//     let result;

//     result = JSON.parse(body);

//     res.send({
//       indivStock: stock,
//       companyname: result["Name"],
//       lastprice: result["LastPrice"],
//       todaysopen: result["Open"],
//       todayshigh: result["High"],
//       todayslow: result["Low"]
//     });
//   });
// });

module.exports = router;
