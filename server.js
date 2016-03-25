"use strict";

const express = require("express");
const app = express();
const request = require("request");

const path = require("path");
const routes = require("./routes/");
const bodyparser = require("body-parser");

const PORT = process.env.PORT || 3000;


app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyparser.json());
app.use(routes);


app.listen(PORT, () => {
  console.log(`Node.js server started. Listening on port ${PORT}`);
});


