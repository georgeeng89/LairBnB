'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
   return queryInterface.bulkInsert('Spots', [
    {
      userId: 1,
      address: '555 Ocean Drive',
      city: 'San Francisco',
      state: 'California',
      country: 'United States',
      name: 'Cool Lair',
      price: 120

    },
    {
      userId: 2,
      address: '623 Javascript Way',
      city: 'Los Angeles',
      state: 'California',
      country: 'United States',
      name: 'Chill Place',
      price: 200
    }
   ], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
   return queryInterface.bulkDelete('Spots', null, {});
  }
};
