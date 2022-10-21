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
    return queryInterface.bulkInsert('trading_account_platforms', [{
      code: '01',
      name: 'Marketplace',
      is_enabled: true
    }], {})

    // , {
    //   code: '02',
    //   name: 'OTC',
    //   is_enabled: true
    // }
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
    return queryInterface.bulkDelete('trading_account_platforms', null, {})
  }
}
