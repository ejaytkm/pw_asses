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

    return queryInterface.bulkInsert('user_statuses', [{
      code: '01',
      name: 'Pending Full Registration',
      is_enabled: true
    }, {
      code: '02',
      name: 'Active',
      is_enabled: true
    }, {
      code: '03',
      name: 'Inactive/ Dormant',
      is_enabled: true
    }, {
      code: '04',
      name: 'Ceased',
      is_enabled: true
    }, {
      code: '05',
      name: 'Suspended',
      is_enabled: true
    }, {
      code: '06',
      name: 'Permanently Closed',
      is_enabled: true
    }, {
      code: '07',
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
    return queryInterface.bulkDelete('user_statuses', null, {})
  }
}
