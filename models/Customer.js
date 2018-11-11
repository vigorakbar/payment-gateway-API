module.exports = (sequelize, type) => {
  return sequelize.define('customer', {
    customer_id: {
      type: type.UUID,
      defaultValue: type.UUIDV1,
      primaryKey: true
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
