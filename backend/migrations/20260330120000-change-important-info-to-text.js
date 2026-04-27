'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.changeColumn('Activities', 'important_info', {
      type: Sequelize.TEXT,
      allowNull: true,
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.changeColumn('Activities', 'important_info', {
      type: Sequelize.STRING(150),
      allowNull: true,
    });
  },
};
