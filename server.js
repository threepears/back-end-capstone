"use strict";

const express = require("express");
const app = express();
const request = require("request");
const session = require("express-session");

const path = require("path");
const routes = require("./routes/");
const bodyparser = require("body-parser");

const PORT = process.env.PORT || 3000;
console.log("SERVER DATABASE URL", process.env.DATABASE_URL)
console.log("SERVER API KEY", process.env.API_KEY)

// CORS (Cross-Origin Resource Sharing) headers to support Cross-site HTTP requests
app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("X-Frame-Options", "SAMEORIGIN");
    next();
});


app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyparser.json());

app.use(session({
  secret: 'stock game',
  resave: false,
  saveUninitialized: false
}));

let sess;
app.get('/',function(req,res){
    sess = req.session;

    console.log(sess);
    /*
    * Here we have assign the 'session' to 'sess'.
    * Now we can create any number of session variable we want.
    * in PHP we do as $_SESSION['var name'].
    * Here we do like this.
    */
    sess.email; // equivalent to $_SESSION['email'] in PHP.
    //sess.username; // equivalent to $_SESSION['username'] in PHP.
    console.log(sess.email);
});

app.use(routes);


app.listen(PORT, () => {
  console.log(`Node.js server started. Listening on port ${PORT}`);
});


