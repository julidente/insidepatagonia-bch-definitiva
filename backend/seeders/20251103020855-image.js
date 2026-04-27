/* 'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Images', [
      {
        // tener los url del servidor dinary
        url: 'https://res.cloudinary.com/demo/image/upload/sample1.jpg',
        activity_id: 1, // Debe existir en Activities
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        // tener los url del servidor dinary
        url: 'https://res.cloudinary.com/demo/image/upload/sample2.jpg',
        activity_id: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        // tener los url del servidor dinary
        url: 'https://res.cloudinary.com/demo/image/upload/sample3.jpg',
        activity_id: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Images', null, {});
  },
}; */

/* 'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    // Obtener las actividades existentes
    const activities = await queryInterface.sequelize.query(
      `SELECT activity_id, name FROM "Activities";`,
    );
    const activityRows = activities[0];
    const activityMap = {};
    activityRows.forEach((a) => {
      activityMap[a.name] = a.activity_id;
    });

    const images = [
      {
        url: 'https://res.cloudinary.com/demo/image/upload/sample1.jpg',
        activity: 'Escalada en roca',
      },
      {
        url: 'https://res.cloudinary.com/demo/image/upload/sample2.jpg',
        activity: 'Visita al museo',
      },
      {
        url: 'https://res.cloudinary.com/demo/image/upload/sample3.jpg',
        activity: 'Tour gastronómico',
      },
    ];

    const imageObjects = images.map((img) => ({
      url: img.url,
      activity_id: activityMap[img.activity],
      createdAt: new Date(),
      updatedAt: new Date(),
    }));

    return queryInterface.bulkInsert('Images', imageObjects, {});
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Images', null, {});
  },
}; */

'use strict';

module.exports = {
  async up(queryInterface) {
    // Obtener todas las actividades existentes
    const [activities] = await queryInterface.sequelize.query(
      `SELECT activity_id, name FROM "Activities";`,
    );

    const activityMap = Object.fromEntries(activities.map((a) => [a.name, a.activity_id]));

    // Imagenes por cada actividad existente

    // No pongas rutas absolutas de filesystem en el seeder (como ../frontend/public/images/...)
    //No pongas rutas internas del backend para las imágenes
    //Guarda URLs relativas a la raíz pública del frontend para que el frontend las pueda servir como estáticas
    //Asegúrate que el frontend esté configurado para servir la carpeta /public (usualmente por defecto en frameworks como React, Next.js, Vue, etc.
    const images = [
      { url: '/images/Bariloche-Cerveceria.jpeg', activity: 'Tour cervecero artesanal' },
      {
        url: '/images/Caba-CentroHistorico.jpeg',
        activity: 'Tour histórico por el Casco Antiguo',
      },
      { url: '/images/Caba-CenaTango.jpeg', activity: 'Cena show de tango' },
      {
        url: '/images/Calafate-ExcursionPeritoMoreno.jpeg',
        activity: 'Excursión al Glaciar Perito Moreno',
      },
      {
        url: '/images/Cayafate-Trekking.jpeg',
        activity: 'Trekking por los Valles Calchaquíes',
      },
      {
        url: '/images/Cordoba-EscaladaDeRocas.jpeg',
        activity: 'Escalada en roca en Córdoba',
      },
      {
        url: '/images/Cordoba-FestivalFolklore.jpeg',
        activity: 'Festival del Folklore de Cosquín',
      },
      {
        url: '/images/Corrientes-Safari.jpeg',
        activity: 'Safari fotográfico en Corrientes',
      },
      { url: '/images/Delta-Kayack.jpeg', activity: 'Kayak en el Delta del Tigre' },
      { url: '/images/EntreRios-Spa.jpeg', activity: 'Spa termal en Entre Ríos' },
      {
        url: '/images/LaPlata-TallerPintura.jpeg',
        activity: 'Taller de arte y pintura local',
      },
      {
        url: '/images/MarDelPlata-Surf.jpeg',
        activity: 'Clases de surf en Mar del Plata',
      },
      { url: '/images/Mendoza-CataDeVinos.jpeg', activity: 'Cata de vinos mendocinos' },
      { url: '/images/placeholder.jpeg', activity: null }, // placeholder para nuevas actividades
      {
        url: '/images/SanLuis-Astronomia.jpeg',
        activity: 'Observación astronómica en San Luis',
      },
      {
        url: '/images/Trelew-AvistamientoBallena.jpeg',
        activity: 'Avistaje de ballenas en Península Valdés',
      },
    ];

    const imageObjects = images.map((img) => ({
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
};
