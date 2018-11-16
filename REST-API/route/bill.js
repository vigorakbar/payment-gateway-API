var express = require('express');
var router = express.Router();
const Bill = require('../models/Bill');

router.get('/:id', function(req, res) {
  var id = req.params.id;
  Bill.findOne({ where: {id} }).then((error, bill) => {
    if (error) throw error;
    res.json({
      bill_id: bill.bill_id,
      name: bill.name,
      address: bill.address,
      bank_account: bill.bank_account,
      bank_name: bill.bank_name,
    });
  });
});

router.post('/', function(req, res) {
  var name = req.body.name;
  var address = req.body.address;
  var bank_account = req.body.bank_account;
  var bank_name = req.body.bank_name;
  Bill.create({
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
  var bill_id = req.body.bill_id;
  var name = req.body.name;
  var address = req.body.address;
  var bank_account = req.body.bank_account;
  var bank_name = req.body.bank_name;
  Bill.update({
    name,
    address,
    bank_account,
    bank_name,
  },{
    where: { bill_id }
  }).then((error, response) => {
    if (error) throw error;
    res.json({
      id: response.id,
      status: "update success",
    });
  });
});

router.delete('/', function(req, res) {
  var bill_id = req.body.bill_id;
  Bill.destroy({
    where: { bill_id },
  });
});

module.exports = router;
