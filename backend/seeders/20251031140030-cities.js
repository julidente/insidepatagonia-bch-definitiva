/* 'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Cities', [
      // Buenos Aires (province_id: 1)
      { name: 'Buenos Aires', province_id: 1, createdAt: new Date(), updatedAt: new Date() },
      { name: 'La Plata', province_id: 1, createdAt: new Date(), updatedAt: new Date() },
      { name: 'Mar del Plata', province_id: 1, createdAt: new Date(), updatedAt: new Date() },

      // Catamarca (province_id: 2)
      { name: 'San Fernando del Valle de Catamarca', province_id: 2, createdAt: new Date(), updatedAt: new Date() },

      // Chaco (province_id: 3)
      { name: 'Resistencia', province_id: 3, createdAt: new Date(), updatedAt: new Date() },
      { name: 'Roque Sáenz Peña', province_id: 3, createdAt: new Date(), updatedAt: new Date() },

      // Chubut (province_id: 4)
      { name: 'Trelew', province_id: 4, createdAt: new Date(), updatedAt: new Date() },
      { name: 'Comodoro Rivadavia', province_id: 4, createdAt: new Date(), updatedAt: new Date() },

      // Córdoba (province_id: 5)
      { name: 'Córdoba', province_id: 5, createdAt: new Date(), updatedAt: new Date() },
      { name: 'Villa Carlos Paz', province_id: 5, createdAt: new Date(), updatedAt: new Date() },

      // Corrientes (province_id: 6)
      { name: 'Corrientes', province_id: 6, createdAt: new Date(), updatedAt: new Date() },

      // Entre Ríos (province_id: 7)
      { name: 'Paraná', province_id: 7, createdAt: new Date(), updatedAt: new Date() },
      { name: 'Concordia', province_id: 7, createdAt: new Date(), updatedAt: new Date() },

      // Formosa (province_id: 8)
      { name: 'Formosa', province_id: 8, createdAt: new Date(), updatedAt: new Date() },

      // Jujuy (province_id: 9)
      { name: 'San Salvador de Jujuy', province_id: 9, createdAt: new Date(), updatedAt: new Date() },
      { name: 'Tilcara', province_id: 9, createdAt: new Date(), updatedAt: new Date() },

      // La Pampa (province_id: 10)
      { name: 'Santa Rosa', province_id: 10, createdAt: new Date(), updatedAt: new Date() },
      { name: 'General Pico', province_id: 10, createdAt: new Date(), updatedAt: new Date() },

      // La Rioja (province_id: 11)
      { name: 'La Rioja', province_id: 11, createdAt: new Date(), updatedAt: new Date() },

      // Mendoza (province_id: 12)
      { name: 'Mendoza', province_id: 12, createdAt: new Date(), updatedAt: new Date() },
      { name: 'San Rafael', province_id: 12, createdAt: new Date(), updatedAt: new Date() },

      // Misiones (province_id: 13)
      { name: 'Posadas', province_id: 13, createdAt: new Date(), updatedAt: new Date() },
      { name: 'Oberá', province_id: 13, createdAt: new Date(), updatedAt: new Date() },

      // Neuquén (province_id: 14)
      { name: 'Neuquén', province_id: 14, createdAt: new Date(), updatedAt: new Date() },
      { name: 'San Martín de los Andes', province_id: 14, createdAt: new Date(), updatedAt: new Date() },

      // Río Negro (province_id: 15)
      { name: 'Bariloche', province_id: 15, createdAt: new Date(), updatedAt: new Date() },
      { name: 'Viedma', province_id: 15, createdAt: new Date(), updatedAt: new Date() },

      // Salta (province_id: 16)
      { name: 'Salta', province_id: 16, createdAt: new Date(), updatedAt: new Date() },
      { name: 'Cafayate', province_id: 16, createdAt: new Date(), updatedAt: new Date() },

      // San Juan (province_id: 17)
      { name: 'San Juan', province_id: 17, createdAt: new Date(), updatedAt: new Date() },

      // San Luis (province_id: 18)
      { name: 'San Luis', province_id: 18, createdAt: new Date(), updatedAt: new Date() },
      { name: 'Villa Mercedes', province_id: 18, createdAt: new Date(), updatedAt: new Date() },

      // Santa Cruz (province_id: 19)
      { name: 'Río Gallegos', province_id: 19, createdAt: new Date(), updatedAt: new Date() },
      { name: 'El Calafate', province_id: 19, createdAt: new Date(), updatedAt: new Date() },

      // Santa Fe (province_id: 20)
      { name: 'Rosario', province_id: 20, createdAt: new Date(), updatedAt: new Date() },
      { name: 'Santa Fe', province_id: 20, createdAt: new Date(), updatedAt: new Date() },

      // Santiago del Estero (province_id: 21)
      { name: 'Santiago del Estero', province_id: 21, createdAt: new Date(), updatedAt: new Date() },

      // Tierra del Fuego (province_id: 22)
      { name: 'Ushuaia', province_id: 22, createdAt: new Date(), updatedAt: new Date() },
      { name: 'Río Grande', province_id: 22, createdAt: new Date(), updatedAt: new Date() },

      // Tucumán (province_id: 23)
      { name: 'San Miguel de Tucumán', province_id: 23, createdAt: new Date(), updatedAt: new Date() },
      { name: 'Tafí Viejo', province_id: 23, createdAt: new Date(), updatedAt: new Date() },

      // Ciudad Autónoma de Buenos Aires (province_id: 24)
      { name: 'CABA', province_id: 24, createdAt: new Date(), updatedAt: new Date() },
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Cities', null, {});
  }
}; */

'use strict';

module.exports = {
  async up(queryInterface) {
    // Primero obtenemos todas las provincias
    const provinces = await queryInterface.sequelize.query(
      `SELECT province_id, name FROM "Provinces";`,
    );
    const provinceRows = provinces[0];

    // Mapeo de nombre de provincia a su id
    const provinceMap = {};
    provinceRows.forEach((p) => {
      provinceMap[p.name] = p.province_id;
    });

    const cities = [
      { name: 'Buenos Aires', province: 'Buenos Aires' },
      { name: 'La Plata', province: 'Buenos Aires' },
      { name: 'Mar del Plata', province: 'Buenos Aires' },

      { name: 'San Fernando del Valle de Catamarca', province: 'Catamarca' },

      { name: 'Resistencia', province: 'Chaco' },
      { name: 'Roque Sáenz Peña', province: 'Chaco' },

      { name: 'Trelew', province: 'Chubut' },
      { name: 'Comodoro Rivadavia', province: 'Chubut' },

      { name: 'Córdoba', province: 'Córdoba' },
      { name: 'Villa Carlos Paz', province: 'Córdoba' },

      { name: 'Corrientes', province: 'Corrientes' },

      { name: 'Paraná', province: 'Entre Ríos' },
      { name: 'Concordia', province: 'Entre Ríos' },

      { name: 'Formosa', province: 'Formosa' },

      { name: 'San Salvador de Jujuy', province: 'Jujuy' },
      { name: 'Tilcara', province: 'Jujuy' },

      { name: 'Santa Rosa', province: 'La Pampa' },
      { name: 'General Pico', province: 'La Pampa' },

      { name: 'La Rioja', province: 'La Rioja' },

      { name: 'Mendoza', province: 'Mendoza' },
      { name: 'San Rafael', province: 'Mendoza' },

      { name: 'Posadas', province: 'Misiones' },
      { name: 'Oberá', province: 'Misiones' },

      { name: 'Neuquén', province: 'Neuquén' },
      { name: 'San Martín de los Andes', province: 'Neuquén' },

      { name: 'Bariloche', province: 'Río Negro' },
      { name: 'Viedma', province: 'Río Negro' },

      { name: 'Salta', province: 'Salta' },
      { name: 'Cafayate', province: 'Salta' },

      { name: 'San Juan', province: 'San Juan' },

      { name: 'San Luis', province: 'San Luis' },
      { name: 'Villa Mercedes', province: 'San Luis' },

      { name: 'Río Gallegos', province: 'Santa Cruz' },
      { name: 'El Calafate', province: 'Santa Cruz' },

      { name: 'Rosario', province: 'Santa Fe' },
      { name: 'Santa Fe', province: 'Santa Fe' },

      { name: 'Santiago del Estero', province: 'Santiago del Estero' },

      { name: 'Ushuaia', province: 'Tierra del Fuego' },
      { name: 'Río Grande', province: 'Tierra del Fuego' },

      { name: 'San Miguel de Tucumán', province: 'Tucumán' },
      { name: 'Tafí Viejo', province: 'Tucumán' },

      { name: 'CABA', province: 'Ciudad Autónoma de Buenos Aires' },
    ];

    const cityObjects = cities.map((c) => ({
      name: c.name,
      province_id: provinceMap[c.province],
      createdAt: new Date(),
      updatedAt: new Date(),
    }));

    return queryInterface.bulkInsert('Cities', cityObjects, {});
  },

  async down(queryInterface) {
    return queryInterface.bulkDelete('Cities', null, {});
  },
};
