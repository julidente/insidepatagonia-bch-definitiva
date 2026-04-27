'use strict';

//const bcrypt = require('bcryptjs');
//const bcrypt = require('bcrypt');

module.exports = {
  async up(queryInterface) {
    // Hash la contraseña del admin
    // mejor contraseña fija

    await queryInterface.bulkInsert('Users', [
      {
        name: 'Administrador',
        email: 'inside.patagonia.bch@gmail.com',
        password_hash: '$2b$10$03KdE09g9T8OwmsDYrJmJONWHIzCegYsRmeyf.KDNO1HBmlCQk0f6', // hash fijo
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('Users', { email: 'inside.patagonia.bch@gmail.com' });
  },
};
