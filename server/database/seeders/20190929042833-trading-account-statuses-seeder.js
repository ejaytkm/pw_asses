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
    return queryInterface.bulkInsert('trading_account_statuses', [{
      code: '01',
      name: 'Active',
      is_enabled: true
    }, {
      code: '02',
      name: 'Ceased',
      is_enabled: true
    }, {
      code: '03',
      name: 'Suspended',
      is_enabled: true
    }, {
      code: '04',
      name: 'Permanently Closed',
      is_enabled: true
    }, {
      code: '05',
      name: 'Inactive/ Dormant',
      is_enabled: true
    }, {
      code: '06',
      name: 'Temporary Closed',
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
    return queryInterface.bulkDelete('trading_account_statuses', null, {})
  }
}
