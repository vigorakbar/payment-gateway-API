var express = require('express');
var router = express.Router();
const Transaction = require('../models/Transaction');

router.get('/:id', function(req, res) {
  var id = req.params.id;
  Transaction.findOne({ where: {id} }).then((error, transaction) => {
    if (error) throw error;
    res.json({
      id: transaction.transaction_id,
      name: transaction.name,
      address: transaction.address,
      bank_account: transaction.bank_account,
      bank_name: transaction.bank_name,
    });
  });
});

router.post('/', function(req, res) {
  var name = req.body.name;
  var address = req.body.address;
  var bank_account = req.body.bank_account;
  var bank_name = req.body.bank_name;
  Transaction.create({
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
  Transaction.update({
    name,
    address,
    bank_account,
    bank_name,
  },{
    where: { transaction_id: id }
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
  Transaction.destroy({
    where: { transaction_id: id },
  });
});

module.exports = router;
