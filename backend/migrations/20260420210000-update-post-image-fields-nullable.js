'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.changeColumn('Posts', 'cover_image_url', {
      type: Sequelize.STRING(500),
      allowNull: true,
    });

    await queryInterface.changeColumn('Posts', 'cover_image_public_id', {
      type: Sequelize.STRING(255),
      allowNull: true,
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.changeColumn('Posts', 'cover_image_url', {
      type: Sequelize.STRING(500),
      allowNull: false,
    });

    await queryInterface.changeColumn('Posts', 'cover_image_public_id', {
      type: Sequelize.STRING(255),
      allowNull: false,
    });
  },
};
