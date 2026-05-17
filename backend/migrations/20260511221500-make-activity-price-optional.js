'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.changeColumn('Activities', 'price', {
      type: Sequelize.DECIMAL(10, 2),
      allowNull: true,
    });

    await queryInterface.changeColumn('Activities', 'price_currency', {
      type: Sequelize.STRING(10),
      allowNull: true,
      defaultValue: 'ARS',
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.changeColumn('Activities', 'price', {
      type: Sequelize.DECIMAL(10, 2),
      allowNull: false,
    });

    await queryInterface.changeColumn('Activities', 'price_currency', {
      type: Sequelize.STRING(10),
      allowNull: false,
    });
  },
};
