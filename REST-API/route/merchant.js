var express = require('express');
var router = express.Router();
const { Merchant } = require(appRoot + '/helpers/sequelize');

router.get('/:id', function(req, res) {
  var id = req.params.id;
  Merchant.findOne({ where: {id} }).then((error, merchant) => {
    if (error) throw error;
    res.json({
      merchant_id: merchant.merchant_id,
      name: merchant.name,
      address: merchant.address,
      bank_account: merchant.bank_account,
      bank_name: merchant.bank_name,
    });
  });
});

router.post('/', function(req, res) {
  var name = req.body.name;
  var address = req.body.address;
  var bank_account = req.body.bank_account;
  var bank_name = req.body.bank_name;
  Merchant.create({
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
  var merchant_id = req.body.merchant_id;
  var name = req.body.name;
  var address = req.body.address;
  var bank_account = req.body.bank_account;
  var bank_name = req.body.bank_name;
  Merchant.update({
    name,
    address,
    bank_account,
    bank_name,
  },{
    where: { merchant_id }
  }).then((error, response) => {
    if (error) throw error;
    res.json({
      id: response.id,
      status: "update success",
    });
  });
});

router.delete('/', function(req, res) {
  var merchant_id = req.body.merchant_id;
  Merchant.destroy({
    where: { merchant_id },
  });
});

module.exports = router;
