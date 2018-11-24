var express = require('express');
const dotenv = require('dotenv');
const path = require('path');
const bodyParser = require('body-parser');
global.appRoot = path.resolve(__dirname);

dotenv.load();
const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

var customer = require(appRoot + '/route/customer');
var merchant = require(appRoot + '/route/merchant');
const transaction = require(appRoot + '/route/transaction');
const bill = require(appRoot + '/route/bill');
app.use('/customer', customer);
app.use('/merchant', merchant);
app.use('/bill', bill);
app.use('/transaction', transaction);

app.listen(port);

console.log('RESTful API server started on: ' + port);
