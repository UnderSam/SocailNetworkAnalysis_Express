var express = require('express');
var api_router = express.Router();
var calculateRouter = require('./routes/calculate');

api_router.use('/calculate',calculateRouter);

module.exports = api_router;