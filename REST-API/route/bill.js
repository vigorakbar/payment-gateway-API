var express = require('express');
var router = express.Router();
const { Bill } = require(appRoot + '/helpers/sequelize');

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
  var email = req.body.email;
  var name = req.body.name;
  var address = req.body.address;
  var bank_account = req.body.bank_account;
  var bank_name = req.body.bank_name;
  Bill.create({
    email,
    name,
    address,
    bank_account,
    bank_name,
  }).then(response => {
    res.json({
      status: 200,
      message: "create bill success",
      data: response
    });
  })
  .catch(err => {
    console.error(err);
    res.json({
      status: 500,
      message: "Error occured",
      data: err
    })
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
