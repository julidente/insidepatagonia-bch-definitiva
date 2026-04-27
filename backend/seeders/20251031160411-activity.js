// 'use strict';

// /** @type {import('sequelize-cli').Seeder} */
// module.exports = {
//   async up(queryInterface) {
//     await queryInterface.bulkInsert('Activities', [
//       // faltan imagenes, subscripciones
//       {
//         name: 'Escalada en roca',
//         description: 'Escalada para principiantes y expertos',
//         price: 50,
//         discount: 5,
//         //rating: 4.5,
//         location: 'Montaña ABC',
//         category_id: 1, // Aventura
//         city_id: 1,
//         createdAt: new Date(),
//         updatedAt: new Date(),
//       },
//       {
//         name: 'Visita al museo',
//         description: 'Recorrido por el museo local',
//         price: 20,
//         discount: 0,
//         //rating: 4.0,
//         location: 'Museo XYZ',
//         category_id: 2, // Cultura
//         city_id: 1,
//         createdAt: new Date(),
//         updatedAt: new Date(),
//       },
//       {
//         name: 'Tour gastronómico',
//         description: 'Degustación de platos típicos',
//         price: 35,
//         discount: 0,
//         //rating: 4.7,
//         location: 'Ciudad ABC',
//         category_id: 3, // Gastronomía
//         city_id: 1,
//         createdAt: new Date(),
//         updatedAt: new Date(),
//       },
//       {
//         name: 'Paseo en kayak',
//         description: 'Kayak en río o lago',
//         price: 45,
//         discount: 10,
//         //rating: 4.3,
//         location: 'Río XYZ',
//         category_id: 1, // Aventura
//         city_id: 2,
//         createdAt: new Date(),
//         updatedAt: new Date(),
//       },
//       {
//         name: 'Clase de pintura',
//         description: 'Aprende técnicas artísticas',
//         price: 25,
//         discount: 0,
//         //rating: 4.6,
//         location: 'Estudio de arte',
//         category_id: 2, // Cultura
//         city_id: 2,
//         createdAt: new Date(),
//         updatedAt: new Date(),
//       },
//       {
//         name: 'Ruta de senderismo',
//         description: 'Caminata guiada por la montaña',
//         price: 30,
//         discount: 0,
//         //rating: 4.8,
//         location: 'Parque Natural',
//         category_id: 1, // Aventura
//         city_id: 3,
//         createdAt: new Date(),
//         updatedAt: new Date(),
//       },
//       {
//         name: 'Clases de surf',
//         description: 'Aprende a surfear con instructor',
//         price: 55,
//         discount: 5,
//         //rating: 4.4,
//         location: 'Playa XYZ',
//         category_id: 1, // Aventura
//         city_id: 3,
//         createdAt: new Date(),
//         updatedAt: new Date(),
//       },
//       {
//         name: 'Tour histórico',
//         description: 'Visita los principales monumentos',
//         price: 40,
//         discount: 0,
//         //rating: 4.2,
//         location: 'Centro histórico',
//         category_id: 2, // Cultura
//         city_id: 1,
//         createdAt: new Date(),
//         updatedAt: new Date(),
//       },
//       {
//         name: 'Cena romántica',
//         description: 'Experiencia gastronómica especial',
//         price: 60,
//         discount: 10,
//         //rating: 4.9,
//         location: 'Restaurante ABC',
//         category_id: 3, // Gastronomía
//         city_id: 2,
//         createdAt: new Date(),
//         updatedAt: new Date(),
//       },
//       {
//         name: 'Paseo en bicicleta',
//         description: 'Recorrido guiado por la ciudad',
//         price: 25,
//         discount: 0,
//         //rating: 4.5,
//         location: 'Parque central',
//         category_id: 4, // Recreación
//         city_id: 3,
//         createdAt: new Date(),
//         updatedAt: new Date(),
//       }
//     ], {});
//   },

//   async down(queryInterface) {
//     await queryInterface.bulkDelete('Activities', {}, {});
//   }
// };

/* 'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    // Obtener categorías existentes
    const categories = await queryInterface.sequelize.query(
      `SELECT category_id, name FROM "Categories";`,
    );
    const categoryRows = categories[0];
    const categoryMap = {};
    categoryRows.forEach((c) => {
      categoryMap[c.name] = c.category_id;
    });

    // Obtener ciudades existentes
    const cities = await queryInterface.sequelize.query(`SELECT city_id, name FROM "Cities";`);
    const cityRows = cities[0];
    const cityMap = {};
    cityRows.forEach((c) => {
      cityMap[c.name] = c.city_id;
    });

    const activities = [
      {
        name: 'Escalada en roca',
        description: 'Escalada para principiantes y expertos',
        price: 50,
        discount: 5,
        location: 'Montaña ABC',
        category: 'Aventura',
        city: 'Buenos Aires',
      },
      {
        name: 'Visita al museo',
        description: 'Recorrido por el museo local',
        price: 20,
        discount: 0,
        location: 'Museo XYZ',
        category: 'Cultura',
        city: 'Buenos Aires',
      },
      {
        name: 'Tour gastronómico',
        description: 'Degustación de platos típicos',
        price: 35,
        discount: 0,
        location: 'Ciudad ABC',
        category: 'Gastronomía',
        city: 'Buenos Aires',
      },
      {
        name: 'Paseo en kayak',
        description: 'Kayak en río o lago',
        price: 45,
        discount: 10,
        location: 'Río XYZ',
        category: 'Aventura',
        city: 'La Plata',
      },
      {
        name: 'Clase de pintura',
        description: 'Aprende técnicas artísticas',
        price: 25,
        discount: 0,
        location: 'Estudio de arte',
        category: 'Cultura',
        city: 'La Plata',
      },
      {
        name: 'Ruta de senderismo',
        description: 'Caminata guiada por la montaña',
        price: 30,
        discount: 0,
        location: 'Parque Natural',
        category: 'Aventura',
        city: 'Mar del Plata',
      },
      {
        name: 'Clases de surf',
        description: 'Aprende a surfear con instructor',
        price: 55,
        discount: 5,
        location: 'Playa XYZ',
        category: 'Aventura',
        city: 'Mar del Plata',
      },
      {
        name: 'Tour histórico',
        description: 'Visita los principales monumentos',
        price: 40,
        discount: 0,
        location: 'Centro histórico',
        category: 'Cultura',
        city: 'Buenos Aires',
      },
      {
        name: 'Cena romántica',
        description: 'Experiencia gastronómica especial',
        price: 60,
        discount: 10,
        location: 'Restaurante ABC',
        category: 'Gastronomía',
        city: 'La Plata',
      },
      {
        name: 'Paseo en bicicleta',
        description: 'Recorrido guiado por la ciudad',
        price: 25,
        discount: 0,
        location: 'Parque central',
        category: 'Deportes',
        city: 'Mar del Plata',
      },
    ];

    const activityObjects = activities.map((a) => ({
      name: a.name,
      description: a.description,
      price: a.price,
      discount: a.discount,
      location: a.location,
      category_id: categoryMap[a.category],
      city_id: cityMap[a.city],
      createdAt: new Date(),
      updatedAt: new Date(),
    }));

    return queryInterface.bulkInsert('Activities', activityObjects, {});
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Activities', null, {});
  },
}; */

/* 'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    // Obtener categorías y ciudades existentes
    const [categories] = await queryInterface.sequelize.query(
      `SELECT category_id, name FROM "Categories";`
    );
    const [cities] = await queryInterface.sequelize.query(
      `SELECT city_id, name FROM "Cities";`
    );

    const categoryMap = Object.fromEntries(categories.map(c => [c.name, c.category_id]));
    const cityMap = Object.fromEntries(cities.map(c => [c.name, c.city_id]));

    // Actividades distribuidas por todo el país
    const activities = [
      { name: 'Tour por el Obelisco', description: 'Recorrido histórico por CABA', price: 30, discount: 0, location: 'Centro de Buenos Aires', category: 'Cultura', city: 'CABA' },
      { name: 'Surf en Mar del Plata', description: 'Clases de surf para principiantes y expertos', price: 50, discount: 5, location: 'Playa Bristol', category: 'Deportes', city: 'Mar del Plata' },
      { name: 'Vinos de Mendoza', description: 'Tour por bodegas y viñedos', price: 80, discount: 10, location: 'Luján de Cuyo', category: 'Gastronomía', city: 'Mendoza' },
      { name: 'Caminata por el glaciar', description: 'Explora el glaciar Perito Moreno', price: 100, discount: 0, location: 'El Calafate', category: 'Aventura', city: 'El Calafate' },
      { name: 'Trekking en Salta', description: 'Senderismo por los Valles Calchaquíes', price: 60, discount: 0, location: 'Cafayate', category: 'Aventura', city: 'Cafayate' },
      { name: 'Rafting en Córdoba', description: 'Descenso por los ríos serranos', price: 70, discount: 5, location: 'Villa Carlos Paz', category: 'Aventura', city: 'Villa Carlos Paz' },
      { name: 'Avistaje de ballenas', description: 'Excursión en Península Valdés', price: 120, discount: 0, location: 'Puerto Madryn', category: 'Naturaleza', city: 'Trelew' },
      { name: 'Pesca en Entre Ríos', description: 'Pesca deportiva en el río Paraná', price: 45, discount: 0, location: 'Paraná', category: 'Recreación', city: 'Paraná' },
      { name: 'Ruinas de Quilmes', description: 'Visita arqueológica en Tucumán', price: 35, discount: 0, location: 'Tafí Viejo', category: 'Cultura', city: 'Tafí Viejo' },
      { name: 'Cataratas del Iguazú', description: 'Excursión a una de las 7 maravillas naturales', price: 90, discount: 0, location: 'Parque Nacional Iguazú', category: 'Naturaleza', city: 'Posadas' },
      { name: 'Safari Iberá', description: 'Observación de fauna autóctona en Corrientes', price: 75, discount: 0, location: 'Colonia Pellegrini', category: 'Naturaleza', city: 'Corrientes' },
      { name: 'Travesía en 4x4', description: 'Recorrido off-road por los Andes', price: 85, discount: 10, location: 'San Juan', category: 'Aventura', city: 'San Juan' },
      { name: 'Museo del Vino', description: 'Visita al museo vitivinícola', price: 25, discount: 0, location: 'San Rafael', category: 'Cultura', city: 'San Rafael' },
      { name: 'Escalada en roca', description: 'Escalada en los cerros de La Rioja', price: 65, discount: 5, location: 'La Rioja', category: 'Aventura', city: 'La Rioja' },
      { name: 'Esquí en Chapelco', description: 'Temporada de invierno en la nieve', price: 110, discount: 0, location: 'San Martín de los Andes', category: 'Deportes', city: 'San Martín de los Andes' },
      { name: 'Kayak en el río Uruguay', description: 'Remá por paisajes únicos', price: 55, discount: 0, location: 'Concordia', category: 'Recreación', city: 'Concordia' },
      { name: 'Safari fotográfico', description: 'Fotografía de fauna silvestre', price: 50, discount: 0, location: 'Formosa', category: 'Naturaleza', city: 'Formosa' },
      { name: 'Ruta del vino riojano', description: 'Visita a bodegas tradicionales', price: 65, discount: 5, location: 'Chilecito', category: 'Gastronomía', city: 'La Rioja' },
      { name: 'Festival de Folklore', description: 'Música y danza tradicional argentina', price: 20, discount: 0, location: 'Cosquín', category: 'Cultura', city: 'Córdoba' },
      { name: 'Trekking en Bariloche', description: 'Senderos por los lagos patagónicos', price: 85, discount: 10, location: 'Cerro Catedral', category: 'Aventura', city: 'Bariloche' },
      { name: 'Tour colonial', description: 'Recorrido por arquitectura histórica', price: 25, discount: 0, location: 'Santiago del Estero', category: 'Cultura', city: 'Santiago del Estero' },
      { name: 'Avistaje de pingüinos', description: 'Visita a Punta Tombo', price: 95, discount: 0, location: 'Trelew', category: 'Naturaleza', city: 'Trelew' },
      { name: 'Pesca en Río Grande', description: 'Pesca de truchas en Tierra del Fuego', price: 130, discount: 0, location: 'Río Grande', category: 'Deportes', city: 'Río Grande' },
      { name: 'Ruta del vino salteño', description: 'Degustación de vinos de altura', price: 75, discount: 5, location: 'Cafayate', category: 'Gastronomía', city: 'Cafayate' },
      { name: 'Cabalgata en San Luis', description: 'Recorrido ecuestre por las sierras', price: 55, discount: 0, location: 'Villa Mercedes', category: 'Recreación', city: 'Villa Mercedes' },
      { name: 'Senderismo en Catamarca', description: 'Paisajes áridos y montañosos', price: 40, discount: 0, location: 'San Fernando del Valle de Catamarca', category: 'Aventura', city: 'San Fernando del Valle de Catamarca' },
      { name: 'Pesca en Misiones', description: 'Pesca en el río Paraná', price: 45, discount: 0, location: 'Oberá', category: 'Deportes', city: 'Oberá' },
      { name: 'Noche de tango', description: 'Cena y espectáculo de tango en CABA', price: 70, discount: 10, location: 'San Telmo', category: 'Cultura', city: 'CABA' },
      { name: 'Tour gastronómico porteño', description: 'Recorrido por bodegones tradicionales', price: 65, discount: 0, location: 'Palermo', category: 'Gastronomía', city: 'CABA' },
      { name: 'Observación astronómica', description: 'Mirador de estrellas en San Luis', price: 40, discount: 0, location: 'Merlo', category: 'Naturaleza', city: 'San Luis' },
      { name: 'Glamping en Neuquén', description: 'Camping con estilo entre montañas', price: 90, discount: 0, location: 'Neuquén', category: 'Recreación', city: 'Neuquén' },
      { name: 'Ruta de los Jesuitas', description: 'Sitios históricos en Córdoba', price: 35, discount: 0, location: 'Córdoba', category: 'Cultura', city: 'Córdoba' },
      { name: 'Tour del vino patagónico', description: 'Degustación en bodegas de Río Negro', price: 60, discount: 5, location: 'Viedma', category: 'Gastronomía', city: 'Viedma' },
      { name: 'Aventura en la selva misionera', description: 'Senderismo y cascadas', price: 70, discount: 0, location: 'Posadas', category: 'Aventura', city: 'Posadas' },
      { name: 'Buceo en Santa Cruz', description: 'Exploración submarina en aguas australes', price: 120, discount: 10, location: 'Río Gallegos', category: 'Deportes', city: 'Río Gallegos' },
      { name: 'Ruta cervecera', description: 'Degustación artesanal en Bariloche', price: 55, discount: 5, location: 'Bariloche', category: 'Gastronomía', city: 'Bariloche' },
      { name: 'Fotografía de naturaleza', description: 'Curso al aire libre', price: 45, discount: 0, location: 'Santa Rosa', category: 'Recreación', city: 'Santa Rosa' },
      { name: 'Visita a la Casa de Tucumán', description: 'Sitio histórico nacional', price: 20, discount: 0, location: 'San Miguel de Tucumán', category: 'Cultura', city: 'San Miguel de Tucumán' },
      { name: 'Tour costero', description: 'Recorrido por playas y acantilados', price: 65, discount: 5, location: 'Mar del Plata', category: 'Naturaleza', city: 'Mar del Plata' },
      { name: 'Museo de Ciencias Naturales', description: 'Colección de fósiles y minerales', price: 25, discount: 0, location: 'La Plata', category: 'Cultura', city: 'La Plata' },
      { name: 'Tirolesa en San Juan', description: 'Aventura extrema entre montañas', price: 80, discount: 0, location: 'San Juan', category: 'Aventura', city: 'San Juan' },
      { name: 'Avistaje de aves', description: 'Recorrido ecológico guiado', price: 50, discount: 0, location: 'Entre Ríos', category: 'Naturaleza', city: 'Paraná' },
      { name: 'Escapada a los viñedos', description: 'Tour gourmet con maridaje', price: 85, discount: 10, location: 'Mendoza', category: 'Gastronomía', city: 'Mendoza' },
      { name: 'Ruta de los volcanes', description: 'Paisajes únicos del norte neuquino', price: 90, discount: 0, location: 'Neuquén', category: 'Aventura', city: 'Neuquén' },
      { name: 'Senderos del Parque Luro', description: 'Naturaleza pampeana', price: 40, discount: 0, location: 'Santa Rosa', category: 'Naturaleza', city: 'Santa Rosa' },
      { name: 'Tour urbano en Rosario', description: 'Recorrido cultural por la ciudad', price: 30, discount: 0, location: 'Rosario', category: 'Cultura', city: 'Rosario' },
      { name: 'Gastronomía santafesina', description: 'Sabores típicos del litoral', price: 50, discount: 0, location: 'Santa Fe', category: 'Gastronomía', city: 'Santa Fe' },
      { name: 'Feria artesanal', description: 'Productos locales y souvenirs', price: 15, discount: 0, location: 'Tilcara', category: 'Cultura', city: 'Tilcara' },
      { name: 'Excursión al Lago Fagnano', description: 'Paisajes únicos fueguinos', price: 110, discount: 5, location: 'Ushuaia', category: 'Naturaleza', city: 'Ushuaia' },
      { name: 'Cabalgata nocturna', description: 'Recorrido bajo las estrellas', price: 60, discount: 0, location: 'San Luis', category: 'Aventura', city: 'San Luis' },
    ];

    const activityObjects = activities.map(a => ({
      name: a.name,
      description: a.description,
      price: a.price,
      discount: a.discount,
      location: a.location,
      category_id: categoryMap[a.category],
      city_id: cityMap[a.city],
      createdAt: new Date(),
      updatedAt: new Date(),
    }));

    return queryInterface.bulkInsert('Activities', activityObjects, {});
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('Activities', null, {});
  },
}; */

'use strict';

module.exports = {
  async up(queryInterface) {
    // Obtener categorías y ciudades existentes
    const [categories] = await queryInterface.sequelize.query(
      `SELECT category_id, name FROM "Categories";`,
    );
    const [cities] = await queryInterface.sequelize.query(`SELECT city_id, name FROM "Cities";`);

    const categoryMap = Object.fromEntries(categories.map((c) => [c.name, c.category_id]));
    const cityMap = Object.fromEntries(cities.map((c) => [c.name, c.city_id]));

    const activities = [
      {
        name: 'Tour histórico por el Casco Antiguo',
        description: 'Recorrido guiado por los principales puntos históricos de CABA.',
        price: 25,
        discount: 0,
        location: 'Centro Histórico, CABA',
        category: 'Cultura',
        city: 'CABA',
      },
      {
        name: 'Cata de vinos mendocinos',
        description: 'Degustación en bodegas tradicionales con guía sommelier.',
        price: 80,
        discount: 10,
        location: 'Luján de Cuyo',
        category: 'Gastronomía',
        city: 'Mendoza',
      },
      {
        name: 'Kayak en el Delta del Tigre',
        description: 'Travesía acuática entre los canales del Delta.',
        price: 50,
        discount: 5,
        location: 'Tigre',
        category: 'Aventura',
        city: 'Buenos Aires',
      },
      {
        name: 'Trekking por los Valles Calchaquíes',
        description: 'Caminata por los senderos naturales del norte salteño.',
        price: 70,
        discount: 0,
        location: 'Cafayate',
        category: 'Naturaleza',
        city: 'Cafayate',
      },
      {
        name: 'Clases de surf en Mar del Plata',
        description: 'Aprendé surf con instructores certificados en Playa Grande.',
        price: 60,
        discount: 10,
        location: 'Playa Grande',
        category: 'Deportes',
        city: 'Mar del Plata',
      },
      {
        name: 'Cena show de tango',
        description: 'Una noche de música, baile y gastronomía porteña.',
        price: 70,
        discount: 5,
        location: 'San Telmo, CABA',
        category: 'Música',
        city: 'CABA',
      },
      {
        name: 'Avistaje de ballenas en Península Valdés',
        description: 'Excursión marítima para observar ballenas y fauna local.',
        price: 120,
        discount: 0,
        location: 'Puerto Madryn',
        category: 'Naturaleza',
        city: 'Trelew',
      },
      {
        name: 'Tour cervecero artesanal',
        description: 'Visita guiada por las cervecerías más reconocidas de Bariloche.',
        price: 55,
        discount: 5,
        location: 'Bariloche',
        category: 'Gastronomía',
        city: 'Bariloche',
      },
      {
        name: 'Escalada en roca en Córdoba',
        description: 'Desafío de escalada en los paredones de Los Gigantes.',
        price: 65,
        discount: 0,
        location: 'Los Gigantes',
        category: 'Aventura',
        city: 'Córdoba',
      },
      {
        name: 'Spa termal en Entre Ríos',
        description: 'Jornada de relax en las termas de Federación.',
        price: 90,
        discount: 10,
        location: 'Termas de Federación',
        category: 'Bienestar',
        city: 'Paraná',
      },
      {
        name: 'Safari fotográfico en Corrientes',
        description: 'Recorrido por los Esteros del Iberá con guía especializado.',
        price: 85,
        discount: 0,
        location: 'Esteros del Iberá',
        category: 'Naturaleza',
        city: 'Corrientes',
      },
      {
        name: 'Festival del Folklore de Cosquín',
        description: 'Disfrutá de la música tradicional argentina en vivo.',
        price: 40,
        discount: 0,
        location: 'Cosquín',
        category: 'Música',
        city: 'Córdoba',
      },
      {
        name: 'Taller de arte y pintura local',
        description: 'Aprendé técnicas artísticas con materiales regionales.',
        price: 35,
        discount: 0,
        location: 'La Plata',
        category: 'Arte',
        city: 'La Plata',
      },
      {
        name: 'Observación astronómica en San Luis',
        description: 'Exploración del cielo nocturno con telescopios y guía profesional.',
        price: 45,
        discount: 0,
        location: 'Merlo',
        category: 'Ciencia',
        city: 'San Luis',
      },
      {
        name: 'Excursión al Glaciar Perito Moreno',
        description: 'Recorrido por pasarelas con vista panorámica del glaciar.',
        price: 110,
        discount: 0,
        location: 'Parque Nacional Los Glaciares',
        category: 'Viajes',
        city: 'El Calafate',
      },
    ];

    //  Mapear a objetos listos para insertar
    const activityObjects = activities
      .filter((a) => categoryMap[a.category] && cityMap[a.city])
      .map((a) => ({
        name: a.name,
        description: a.description,
        price: a.price,
        discount: a.discount,
        location: a.location,
        category_id: categoryMap[a.category],
        city_id: cityMap[a.city],
        createdAt: new Date(),
        updatedAt: new Date(),
      }));

    return queryInterface.bulkInsert('Activities', activityObjects, {});
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('Activities', null, {});
  },
};
