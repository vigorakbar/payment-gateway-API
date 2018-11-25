module.exports = (sequelize, type) => {
  return sequelize.define('merchant', {
    merchant_id: {
      type: type.INTEGER(10),
      primaryKey: true,
      autoIncrement: true
    },
    username: {
      type: type.STRING(64),
      allowNull: false,
      unique: true
    },
    name: {
      type: type.STRING(64),
      allowNull: false
    },
    address: type.STRING(128),
    bank_account: type.STRING(32),
    bank_name: type.STRING(32)
  });

};
