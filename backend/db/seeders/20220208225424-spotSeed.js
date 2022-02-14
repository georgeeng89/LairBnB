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
      price: 1120

    },
    {
      userId: 2,
      address: '623 Javascript Way',
      city: 'Los Angeles',
      state: 'California',
      country: 'United States',
      name: 'Chill Place',
      price: 220
    },
    {
      userId: 3,
      address: 'Somewhere in the Wild',
      city: 'San Diego',
      state: 'California',
      country: 'United States',
      name: 'Chill Place',
      price: 300
    },
    {
      userId: 4,
      address: '24 Park Ave',
      city: 'San Jose',
      state: 'California',
      country: 'United States',
      name: 'Chill Place',
      price: 425
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
