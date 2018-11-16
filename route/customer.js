var express = require('express');
var router = express.Router();
const Customer = require('../models/Customer');

router.get('/:id', function(req, res) {
  var id = req.params.id;
  Customer.findOne({ where: {id} }).then((error, customer) => {
    if (error) throw error;
    res.json({
      id: customer.customer_id,
      name: customer.name,
      address: customer.address,
      bank_account: customer.bank_account,
      bank_name: customer.bank_name,
    });
  });
});

router.post('/', function(req, res) {
  var name = req.body.name;
  var address = req.body.address;
  var bank_account = req.body.bank_account;
  var bank_name = req.body.bank_name;
  Customer.create({
    name,
    address,
    bank_account,
    bank_name,
  }).then((error, response) => {
    if (error) throw error;
    res.json({
      id: response.id,
      status: "create success",
    });
  });
});

router.put('/', function(req, res) {
  var id = req.body.id;
  var name = req.body.name;
  var address = req.body.address;
  var bank_account = req.body.bank_account;
  var bank_name = req.body.bank_name;
  Customer.update({
    name,
    address,
    bank_account,
    bank_name,
  },{
    where: { customer_id: id }
  }).then((error, response) => {
    if (error) throw error;
    res.json({
      id: response.id,
      status: "update success",
    });
  });
});

router.delete('/', function(req, res) {
  var id = req.body.id;
  Customer.destroy({
    where: { customer_id: id },
  });
});

module.exports = router;
