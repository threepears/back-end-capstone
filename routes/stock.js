'use strict';

const express = require('express');
const router = express.Router();

const API_KEY = process.env.FINNHUB_API_KEY

router.get("/stock/:stock", async (req, res) => {
  const STOCK_SYMBOL = req.params.stock

  const profileUrl = `https://finnhub.io/api/v1/search?q=${req.params.stock}&token=${API_KEY}`
  const quoteUrl = `https://finnhub.io/api/v1/quote?symbol=${req.params.stock}&token=${API_KEY}`

  console.log("PROFILE URL", profileUrl)
  console.log("QUOTE URL", quoteUrl)

  try {
      // Fire both HTTP requests simultaneously
      const [quoteRes, profileRes] = await Promise.all([
          fetch(quoteUrl),
          fetch(profileUrl)
      ]);

      const quoteData = await quoteRes.json();
      const { result: profileData } = await profileRes.json();

      console.log("QUOTE DATA", quoteData)
      console.log("PROFILE DATA", profileData)

      const [ { description: stockName } ] = profileData.filter(p => p.displaySymbol === STOCK_SYMBOL)

      // Check if Finnhub returned an empty profile (invalid symbol)
      if (!stockName) {
        res.status(500).send(`We could not find a stock with the symbol of ${STOCK_SYMBOL}`);
      }

      // Return stock results
      res.send({
        indivStock: STOCK_SYMBOL,
        companyname: stockName,
        lastprice: quoteData.c,
        todaysopen: quoteData.o,
        todayshigh: quoteData.h,
        todayslow: quoteData.l
      });
  } catch (error) {
      console.error("Error finding stock symbol:", error);
  }
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
