"use strict";

const express = require("express");
const app = express();
const path = require("path");
const request = require("request");

const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'public')));

app.get("/stock/:stock", (req, res) => {
  const stock = req.params.stock;
  console.log("Stock name>>>>>>", stock);

  //request.get(url, (err, response, data) => {
    //const newData = JSON.parse(data)
  //})

  request('http://dev.markitondemand.com/MODApis/Api/v2/Quote/json?symbol=' + stock, (error, response, body) => {

    console.log("BODY", body);

    let str = '';
    let result;

    // response.on('data', chunk => {
    //   str += chunk;
    // });

    // console.log("STR", str);

    // response.on('end', () => {
    result = JSON.parse(body);

    console.log("RESULT", result);
    console.log("RESULT", result.name);
    console.log("RESULT", result["Name"]);
    // res.send(result);
//

    res.send({
      indivStock: stock,
      companyname: result["Name"],
      lastprice: result["LastPrice"],
      todaysopen: result["Open"],
      todayshigh: result["High"],
      todayslow: result["Low"]
    });
    // });

  });
});


app.listen(PORT, () => {
  console.log(`Node.js server started. Listening on port ${PORT}`);
});


