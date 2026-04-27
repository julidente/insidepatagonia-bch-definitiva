/* 'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Provinces', [
      { name: 'Buenos Aires', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Catamarca', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Chaco', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Chubut', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Córdoba', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Corrientes', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Entre Ríos', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Formosa', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Jujuy', createdAt: new Date(), updatedAt: new Date() },
      { name: 'La Pampa', createdAt: new Date(), updatedAt: new Date() },
      { name: 'La Rioja', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Mendoza', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Misiones', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Neuquén', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Río Negro', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Salta', createdAt: new Date(), updatedAt: new Date() },
      { name: 'San Juan', createdAt: new Date(), updatedAt: new Date() },
      { name: 'San Luis', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Santa Cruz', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Santa Fe', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Santiago del Estero', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Tierra del Fuego', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Tucumán', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Ciudad Autónoma de Buenos Aires', createdAt: new Date(), updatedAt: new Date() },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Provinces', null, {});
  }
}; */

'use strict';

module.exports = {
  async up(queryInterface) {
    const provinces = [
      'Buenos Aires',
      'Catamarca',
      'Chaco',
      'Chubut',
      'Córdoba',
      'Corrientes',
      'Entre Ríos',
      'Formosa',
      'Jujuy',
      'La Pampa',
      'La Rioja',
      'Mendoza',
      'Misiones',
      'Neuquén',
      'Río Negro',
      'Salta',
      'San Juan',
      'San Luis',
      'Santa Cruz',
      'Santa Fe',
      'Santiago del Estero',
      'Tierra del Fuego',
      'Tucumán',
      'Ciudad Autónoma de Buenos Aires',
    ];

    const provinceObjects = provinces.map((name) => ({
      name,
      createdAt: new Date(),
      updatedAt: new Date(),
    }));

    return queryInterface.bulkInsert('Provinces', provinceObjects, {});
  },

  async down(queryInterface) {
    return queryInterface.bulkDelete('Provinces', null, {});
  },
};
