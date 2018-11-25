module.exports = (sequelize, type) => {
  return sequelize.define('bill', {
    bill_id: {
      type: type.UUID,
      defaultValue: type.UUIDV4,
      primaryKey: true
    },
    customer_email: {
      type: type.STRING(64),
      allowNull: false,
      references: {
        model: 'customers',
        key: 'email'
      }
    },
    merchant_id: {
      type: type.INTEGER,
      allowNull: false,
      references: {
        model: 'merchants',
        key: 'merchant_id'
      }
    },
    total: {
      type: type.INTEGER,
      allowNull: false
    },
    detail: type.STRING(128)
  });
};
