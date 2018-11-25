var express = require('express');
var router = express.Router();
const { Customer } = require(appRoot + '/helpers/sequelize');

router.get('/:id', function(req, res) {
  const response = {
    status: 200,
    message: 'OK',
    data: ''
  };
  var customer_id = req.params.id;
  Customer.findOne({ where: {customer_id} })
  .then(customer => {
    if (customer !== null){
      response.message = 'Customer data found';
      response.data = customer;
    } else {
      response.status = 201;
      response.message = 'Customer data not found';
    }
    res.json(response);
  })
  .catch((error) => {
    response.status = 500;
    response.message = 'Error occurred';
    response.data = error;
    res.json(response);
    console.error(error);
  });
});

router.post('/', function(req, res) {
  const response = {
    status: 300,
    message: '',
    data: ''
  };
  var email = req.body.email;
  var name = req.body.name;
  var address = req.body.address;
  var bank_account = req.body.bank_account;
  var bank_name = req.body.bank_name;
  Customer.create({
    email,
    name,
    address,
    bank_account,
    bank_name,
  }).then(() => {
    Customer.findOrCreate({
      where: { email }
    });
  })
  .spread((user, created) => {
    if (created) {
      response.status = 200;
      response.message = 'Customer account created';
      response.data = user;
    } else {
      response.status = 300;
      response.message = 'email already registered';
    }
    res.json(response);
  })
  .catch(error => {
    response.status = 500;
    response.message = 'Error occurred';
    response.data = error;
    res.json(response);
    console.error(error);
  });
});

router.put('/', function(req, res) {
  const response = {
    status: 300,
    message: '',
    data: ''
  };
  var customer_id = req.body.customer_id;
  var email = req.body.email;
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
    where: { email }
  }).then(response => {
    res.json({
      response: response
    });
  })
  .catch(error => {
    response.status = 500;
    response.message = 'Error occurred';
    response.data = error;
    res.json(response);
    console.log(error);
  });
});

/*router.delete('/', function(req, res) {
  const response = {
    status: 300,
    message: '',
    data: ''
  };
  var customer_id = req.body.customer_id;
  Customer.destroy({
    where: { customer_id },
  })
  .then(response => {
    response.status = 200;
    response.data = 'Customer data deleted';
  });
});*/

module.exports = router;
