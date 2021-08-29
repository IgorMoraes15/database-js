const Sequelize = require("sequelize");

function defineCustomer(sequelize) {
  const Customer = sequelize.define(
    "customer",
    {
      accountId: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      latitude: {
        type: Sequelize.DECIMAL,
        allowNull: false,
      },
      longitude: {
        type: Sequelize.DECIMAL,
        allowNull: false,
      },
      archived: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
      },
    },
    { timestamps: false }
  );

  return Customer;
}

module.exports = defineCustomer;
