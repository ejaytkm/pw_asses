'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('People', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
    return queryInterface.bulkInsert('user_types', [{
      code: '01',
      name: 'Individual',
      is_enabled: true
    }, {
      code: '02',
      name: 'Corporate',
      is_enabled: true
    }, {
      code: '03',
      name: 'Market Maker',
      is_enabled: true
    }], {})
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */

    return queryInterface.bulkDelete('user_types', null, {})
  }
}
