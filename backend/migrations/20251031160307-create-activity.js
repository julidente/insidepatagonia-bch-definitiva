'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Activities', {
      activity_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },

      name: {
        type: Sequelize.STRING(150),
        allowNull: false,
      },

      summary: {
        type: Sequelize.STRING(150),
        allowNull: true,
      },

      description: {
        type: Sequelize.TEXT,
        allowNull: true,
      },

      location: {
        type: Sequelize.STRING(200),
        allowNull: false,
      },

      has_multiple_meeting_points: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },

      meeting_point_1: {
        type: Sequelize.STRING(200),
        allowNull: true,
      },

      meeting_point_2: {
        type: Sequelize.STRING(200),
        allowNull: true,
      },

      activity_type: {
        type: Sequelize.STRING(50),
        allowNull: false,
      },

      duration_hours: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },

      additional_cost: {
        type: Sequelize.TEXT,
        allowNull: true,
      },

      includes: {
        type: Sequelize.STRING(200),
        allowNull: true,
      },

      not_includes: {
        type: Sequelize.STRING(200),
        allowNull: true,
      },

      what_you_will_do: {
        type: Sequelize.TEXT,
        allowNull: true,
      },

      accommodation_detail: {
        type: Sequelize.STRING(200),
        allowNull: true,
      },

      transfer_detail: {
        type: Sequelize.STRING(200),
        allowNull: true,
      },

      important_info: {
        type: Sequelize.STRING(150),
        allowNull: true,
      },

      tips: {
        type: Sequelize.STRING(150),
        allowNull: true,
      },

      technical_difficulty: {
        type: Sequelize.STRING(20),
        allowNull: true,
      },

      effort_level: {
        type: Sequelize.STRING(20),
        allowNull: true,
      },

      distance: {
        type: Sequelize.STRING(100),
        allowNull: true,
      },

      activity_days: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },

      accommodation_days: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },

      accommodation_type: {
        type: Sequelize.STRING(30),
        allowNull: true,
      },

      transport_type: {
        type: Sequelize.STRING(30),
        allowNull: true,
      },

      min_participants: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },

      max_participants: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },

      price: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false,
      },

      price_currency: {
        type: Sequelize.STRING(10),
        allowNull: false,
      },

      price_additional_info: {
        type: Sequelize.STRING(150),
        allowNull: true,
      },

      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },

      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable('Activities');
  },
};
