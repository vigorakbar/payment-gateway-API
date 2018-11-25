var express = require('express');
var router = express.Router();
const { Customer, Merchant, Bill } = require(appRoot + '/helpers/sequelize');

router.get('/:id', function(req, res) {
  const response = {
    status: 200,
    message: 'OK',
    data: ''
  };
  var bill_id = req.params.id;
  Bill.findOne({ where: {bill_id} }).then(bill => {
    if (bill !== null){
      response.message = 'Billing detail found';
      response.data = bill;
    } else {
      response.status = 201;
      response.message = 'Billing detail not found';
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
    status: 200,
    message: 'OK',
    data: ''
  };
  const customer_email = req.body.customer_email;
  const merchant_id = req.body.merchant_id;
  const total = req.body.total;
  const detail = req.body.detail;
  const findMerchant = Merchant.findOne({
      where: { merchant_id }
    })
    .then(merchant => {
      merchant !== null ? resolve() : reject();
    });

  const insertBill = findMerchant.then(() => {
    Bill.create({
      customer_email,
      merchant_id,
      total,
      detail
    });
  });
  insertBill.then(bill => {
    response.status = 'Billing detail created';
    response.data = bill;
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

module.exports = router;
