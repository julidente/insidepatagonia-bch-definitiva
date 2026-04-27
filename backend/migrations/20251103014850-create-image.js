/* 'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Images', {
      image_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      url: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      activity_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Activities', // Tabla Activities
          key: 'activity_id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('NOW()'),
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('NOW()'),
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Images');
  },
}; */

/* 'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    // Obtener todas las actividades existentes
    const [activities] = await queryInterface.sequelize.query(
      `SELECT activity_id, name FROM "Activities";`
    );

    const activityMap = Object.fromEntries(activities.map(a => [a.name, a.activity_id]));

    // Generar 1 imagen por actividad existente
    const images = [];
    Object.keys(activityMap).forEach((activityName, idx) => {
      images.push({
        url: `https://res.cloudinary.com/demo/image/upload/${idx + 1}.jpg`,
        activity: activityName,
      });
    });

    // Imagen placeholder para futuras actividades
    images.push({
      url: 'https://res.cloudinary.com/demo/image/upload/placeholder.jpg',
      activity: null, // No asignada a ninguna actividad aún
    });

    const imageObjects = images.map(img => ({
      url: img.url,
      activity_id: img.activity ? activityMap[img.activity] : null,
      createdAt: new Date(),
      updatedAt: new Date(),
    }));

    return queryInterface.bulkInsert('Images', imageObjects, {});
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('Images', null, {});
  },
}; */

'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Images', {
      image_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },

      url: {
        type: Sequelize.STRING(500),
        allowNull: false,
      },

      public_id: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },

      is_cover: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },

      activity_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Activities',
          key: 'activity_id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
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
    await queryInterface.dropTable('Images');
  },
};
