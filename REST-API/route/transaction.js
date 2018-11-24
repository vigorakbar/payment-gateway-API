var express = require('express');
var router = express.Router();
const { Transaction } = require(appRoot + '/helpers/sequelize');

router.get('/:id', function(req, res) {
  var id = req.params.id;
  Transaction.findOne({ where: {id} }).then((error, transaction) => {
    if (error) throw error;
    res.json({
      transaction_id: transaction.transaction_id,
      bill_id: transaction.bill_id,
      customer_id: transaction.customer_id,
      merchant_id: transaction.merchant_id,
      amount: transaction.total,
      expired_date: transaction.expired_date
    });
  });
});

router.post('/', function(req, res) {
  var bill_id = req.body.bill_id;
  var customer_id = req.body.customer_id;
  var merchant_id = req.body.merchant_id;
  var total = req.body.total;
  var expired_date = req.body.expired_date;
  Transaction.create({
    bill_id,
    customer_id,
    merchant_id,
    total,
    expired_date
  }).then((error, response) => {
    if (error) throw error;
    res.json({
      id: response.id,
      status: "create success",
    });
  });
});

router.put('/', function(req, res) {
  var transaction_id = req.body.transaction_id;
  var bill_id = req.body.bill_id;
  var customer_id = req.body.customer_id;
  var merchant_id = req.body.merchant_id;
  var total = req.body.total;
  var expired_date = req.body.expired_date;
  Transaction.update({
    bill_id,
    customer_id,
    merchant_id,
    total,
    expired_date
  },{
    where: { transaction_id }
  }).then((error, response) => {
    if (error) throw error;
    res.json({
      id: response.id,
      status: "update success",
    });
  });
});

router.delete('/', function(req, res) {
  var transaction_id = req.body.transaction_id;
  Transaction.destroy({
    where: { transaction_id },
  });
});

module.exports = router;
