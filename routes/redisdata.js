'use strict';

const express = require('express');
const app = express();
const router = express.Router();
const session = require('express-session')

// const passwordless = require("passwordless");
// const redis = require("redis");
// const client = redis.createClient();
// const redisStore = require("passwordless-redisstore");
// const emailToken = require("emailjs");

// const smtpServer = emailToken.server.connect({

//   ssl: true
// });

// client.on("error", function (err) {
//     console.log("Error " + err);
// });


// passwordless.init(new redisStore(6379, '127.0.0.1'));

// passwordless.addDelivery(
//   function(tokenToSend, uidToSend, recipient, callback) {
//     var host = 'localhost:3000';
//     smtpServer.send({
//         text:    'Hello!\nAccess your account here: http://'
//         + host + '?token=' + tokenToSend + '&uid='
//         + encodeURIComponent(uidToSend),
//         from:    "passwordless@threepears.com",
//         to:      recipient,
//         subject: 'Token for ' + host
//     }, function(err, message) {
//         if(err) {
//             console.log(err);
//         }
//         callback(err);
//     });
// });

// app.use(session({
//   secret: 'keyboard cat',
//   resave: false,
//   saveUninitialized: false
// }));

// app.use(passwordless.sessionSupport());
// app.use(passwordless.acceptToken({ successRedirect: '/#/profile'}));



// Initializing the Knex library
const pg = require('knex')({
  client: 'pg',
  connection: process.env.DATABASE_URL || 'postgres://localhost:5432/takingstock',
  searchPath: ['knex', 'public'] // 'knex, public'
});

router.post("/redisdata", (req, res) => {
  pg('users').where({
    email: req.body.email })
    .then(function(data) {
      console.log(data.length);
      if (data.length === 0) {
        console.log("SERVER ERROR", data);
        res.sendStatus(400);
      } else {
        console.log("SERVER SUCCESS", data);
        res.send(data);
      }
    })
    .catch((err) => {
      console.log("ERROR", err);
    });
});


// Check to see if user in database
// router.post("/redisdata", (req, res) => {
//   pg('users').where({
//     email: req.body.email })
//     .then(function(data) {
//       if (data) {

//         console.log("YES DATA");
//         passwordless.requestToken(
//         function(user, delivery, callback) {
//           console.log("BEFORE CALLBACK");
//           callback(null, data[0].id);
//         }),
//         function(req, res) {
//           console.log("ID SUCCESS", req.body);
//           res.sendStatus(200);
//         };

//         console.log("DATA EMAIL", data[0].email);
//       } else {
//         res.sendStatus(400);
//       }
//      })
//     .catch((err) => {
//       console.log("ERROR", err)
//     });

//   res.sendStatus(200);
// });


module.exports = router;
