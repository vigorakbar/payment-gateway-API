module.exports = (sequelize, type) => {
  return sequelize.define('transaction', {
    transaction_id: {
      type: type.UUID,
      defaultValue: type.UUIDV4,
      primaryKey: true
    },
    bill_id: {
      type: type.UUID,
      allowNull: false,
      references: {
        model: 'bills',
        key: 'bill_id'
      }
    },
    customer_id: {
      type: type.INTEGER,
      allowNull: false,
      references: {
        model: 'customers',
        key: 'customer_id'
      }
    },
    merchant_id: {
      type: type.INTEGER,
      allowNull: false,
      references: {
        model: 'merchants',
        key: 'merchant_id'
      },
    },
    total: {
      type: type.INTEGER,
      allowNull: false
    },
    detail: type.STRING(128),
    time: {
      type: type.DATE,
      defaultValue: type.NOW
    }
  });
};
