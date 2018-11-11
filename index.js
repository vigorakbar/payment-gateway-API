var express = require('express'),
  app = express(),
  port = process.env.PORT || 3000;

var customer = require('./route/customer');
var merchant = require('./route/merchant');

app.use('/customer', customer);
app.use('/merchant', merchant);

app.listen(port);

console.log('RESTful API server started on: ' + port);