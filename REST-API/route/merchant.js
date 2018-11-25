var express = require('express');
var router = express.Router();
const { Merchant } = require(appRoot + '/helpers/sequelize');

router.get('/:id', function(req, res) {
  const response = {
    status: 300,
    message: '',
    data: ''
  };
  var merchant_id = req.params.id;
  Merchant.findOne({ where: {merchant_id} }).then(merchant => {
    if (merchant !== null){
      response.status = 200;
      response.message = 'Merchant data found';
      response.data = merchant;
    } else {
      response.status = 201;
      response.message = 'Merchant data not found';
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
  var username = req.body.username;
  var name = req.body.name;
  var address = req.body.address;
  var bank_account = req.body.bank_account;
  var bank_name = req.body.bank_name;
  Merchant.create({
    name,
    address,
    bank_account,
    bank_name,
  }).then(() => {
    Merchant.findOrCreate({
      where: { username }
    });
  })
  .spread((merchant, created) => {
    if (created) {
      response.status = 200;
      response.message = 'Merchant id created';
      response.data = merchant;
    } else {
      response.status = 201;
      response.message = 'Merchant id already registered';
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
  var merchant_id = req.body.merchant_id;
  Merchant.destroy({
    where: { merchant_id },
  });
});*/

module.exports = router;
