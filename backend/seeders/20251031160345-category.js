'use strict';

module.exports = {
  async up(queryInterface) {
    return queryInterface.bulkInsert('Categories', [
      {
        name: 'Aventura',
        description: 'Actividades llenas de emoción',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Cultura',
        description: 'Experiencias culturales y educativas',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Naturaleza',
        description: 'Actividades al aire libre',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Deportes',
        description: 'Eventos deportivos y entrenamiento',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Gastronomía',
        description: 'Experiencias culinarias',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Arte',
        description: 'Talleres y exposiciones artísticas',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Tecnología',
        description: 'Actividades tecnológicas y de innovación',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Bienestar',
        description: 'Salud, spa y relajación',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Música',
        description: 'Conciertos y talleres musicales',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Viajes',
        description: 'Excursiones y turismo',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface) {
    return queryInterface.bulkDelete('Categories', null, {});
  },
};
