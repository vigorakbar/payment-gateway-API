module.exports = (sequelize, type) => {
  return sequelize.define('bill', {
    bill_id: {
      type: type.UUID,
      defaultValue: type.UUIDV1,
      primaryKey: true
    },
    customer_id: {
      type: type.UUID,
      allowNull: false,
      references: {
        model: 'customers',
        key: 'customer_id'
      }
    },
    merchant_id: {
      type: type.UUID,
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
