'use strict';

const express = require('express');
const router = express.Router();

const stock = require('./stock');
const redisData = require('./redisdata');
const postgres = require('./postgres');


router.use(stock);
router.use(redisData);
router.use(postgres);


module.exports = router;
