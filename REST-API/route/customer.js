var express = require('express');
var router = express.Router();
const { Customer } = require(appRoot + '/helpers/sequelize');

router.get('/:id', function(req, res) {
  console.log(Customer);
  var id = req.params.id;
  Customer.findOne({ where: {id} }).then((error, customer) => {
    if (error) throw error;
    res.json({
      customer_id: customer.customer_id,
      name: customer.name,
      address: customer.address,
      bank_account: customer.bank_account,
      bank_name: customer.bank_name,
    });
  })
  .catch((error) => {
    console.error(error);
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
  }).then(response => {
    res.json({
      status: 200,
      message: "create customer success",
      data: response
    });
  })
  .catch(error => {
    console.error(error);
  });
});

router.put('/', function(req, res) {
  var customer_id = req.body.customer_id;
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
    where: { customer_id }
  }).then((error, response) => {
    if (error) throw error;
    res.json({
      id: response.id,
      status: "update success",
    });
  });
});

router.delete('/', function(req, res) {
  var customer_id = req.body.customer_id;
  Customer.destroy({
    where: { customer_id },
  });
});

module.exports = router;
