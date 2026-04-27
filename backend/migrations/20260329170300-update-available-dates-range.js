'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('AvailableDates', 'start_date', {
      type: Sequelize.DATEONLY,
      allowNull: true,
    });

    await queryInterface.addColumn('AvailableDates', 'end_date', {
      type: Sequelize.DATEONLY,
      allowNull: true,
    });

    await queryInterface.sequelize.query(`
      UPDATE "AvailableDates"
      SET start_date = available_date,
          end_date = available_date
    `);

    await queryInterface.changeColumn('AvailableDates', 'start_date', {
      type: Sequelize.DATEONLY,
      allowNull: false,
    });

    await queryInterface.changeColumn('AvailableDates', 'end_date', {
      type: Sequelize.DATEONLY,
      allowNull: false,
    });

    await queryInterface.removeColumn('AvailableDates', 'available_date');
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.addColumn('AvailableDates', 'available_date', {
      type: Sequelize.DATEONLY,
      allowNull: true,
    });

    await queryInterface.sequelize.query(`
      UPDATE "AvailableDates"
      SET available_date = start_date
    `);

    await queryInterface.changeColumn('AvailableDates', 'available_date', {
      type: Sequelize.DATEONLY,
      allowNull: false,
    });

    await queryInterface.removeColumn('AvailableDates', 'start_date');
    await queryInterface.removeColumn('AvailableDates', 'end_date');
  },
};
