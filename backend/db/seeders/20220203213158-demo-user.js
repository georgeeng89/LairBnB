'use strict';
const bcrypt = require('bcryptjs');

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [
      {
        email: 'demo@user.io',
        username: 'Demo-User',
        hashedPassword: bcrypt.hashSync('strongpass')
      },
      {
        email: 'user1@user.io',
        username: 'Wolf',
        hashedPassword: bcrypt.hashSync('strongpass1')
      },
      {
        email: 'user2@user.io',
        username: 'Bear',
        hashedPassword: bcrypt.hashSync('strongpass2')
      },
      {
        email: 'user3@user.io',
        username: 'Boar',
        hashedPassword: bcrypt.hashSync('strongpass3')
      },
      {
        email: 'user4@user.io',
        username: 'Lion',
        hashedPassword: bcrypt.hashSync('strongpass4')
      }
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete('Users', {
      username: { [Op.in]: ['Demo-lition', 'FakeUser1', 'FakeUser2'] }
    }, {});
  }
};
