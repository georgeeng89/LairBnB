'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
   return queryInterface.bulkInsert('Reviews', [
     {
     spotId: 2,
     userId: 1,
     review: 'This place was absolutely amazing. I would definitely come here again!'
   },
   {
    spotId: 1,
    userId: 2,
    review: 'This place was fantastic. Love the soil.'
  },
  {
    spotId: 4,
    userId: 1,
    review: 'This Lair was very dirty. Lots of litter everywhere.'
  }
  ], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
   return queryInterface.bulkDelete('Reviews', null, {});
  }
};
