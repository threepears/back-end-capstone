"use strict";

const express = require("express");
const app = express();
const path = require("path");

const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'public')));

app.get("/", (req, res) => {
  const stock = req.params.stock;
  console.log(stock);

  //request.get(url, (err, response, data) => {
    //const newData = JSON.parse(data)
  //})

  $http.request('http://dev.markitondemand.com/MODApis/Api/v2/Quote/json?symbol=' + stock, response => {

    let str = '';
    let result;

    response.on('data', chunk => {
      str += chunk;
    });

    response.on('end', () => {
      result = JSON.parse(str);

      res.render('singlestock', {
        indivStock: stock,
        companyname: result["Name"],
        lastprice: result["LastPrice"],
        todaysopen: result["Open"],
        todayshigh: result["High"],
        todayslow: result["Low"]
      });
    });

  }).end();
});





mongoose.connection.on('open', () => {
  console.log("MONGO OPEN");

  app.listen(PORT, () => {
    console.log(`Node.js server started. Listening on port ${PORT}`);
  });
});
