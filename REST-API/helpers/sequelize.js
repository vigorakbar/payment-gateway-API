const Sequelize = require('sequelize');
const Transaction_model = require('../models/Transaction');
const Bill_model = require('../models/Bill');
const Customer_model = require('../models/Customer');
const Merchant_model = require('../models/Merchant');
const dotenv = require('dotenv');

dotenv.load();
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
  host: process.env.DB_HOST,
  dialect: 'mysql',
  pool: {
    max: 10,
    min: 0,
    acquire: 30000,
    idle: 10000
  },
  operatorsAliases: false
});

const Customer = Customer_model(sequelize, Sequelize);
const Merchant = Merchant_model(sequelize, Sequelize);
const Bill = Bill_model(sequelize, Sequelize);
const Transaction = Transaction_model(sequelize, Sequelize);

sequelize.sync()
  .then(() => {
    console.log(`Database & tables created!`);
  });

module.exports = {
  Customer,
  Merchant,
  Bill,
  Transaction
};
