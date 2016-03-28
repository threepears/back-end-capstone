"use strict";

const express = require("express");
const app = express();
const request = require("request");

const path = require("path");
const routes = require("./routes/");
const bodyparser = require("body-parser");

const PORT = process.env.PORT || 3000;


// CORS (Cross-Origin Resource Sharing) headers to support Cross-site HTTP requests
app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("X-Frame-Options", "SAMEORIGIN");
    next();
});


app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyparser.json());
app.use(routes);


app.listen(PORT, () => {
  console.log(`Node.js server started. Listening on port ${PORT}`);
});


