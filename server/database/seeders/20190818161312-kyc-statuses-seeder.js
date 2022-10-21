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
    return queryInterface.bulkInsert('kyc_statuses', [{
      code: '01',
      name: 'Unverified',
      is_enabled: true
    }, {
      code: '02',
      name: 'Pending for Verification',
      is_enabled: true
    }, {
      code: '03',
      name: 'Verified',
      is_enabled: true
    }, {
      code: '04',
      name: 'Rejected',
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
    return queryInterface.bulkDelete('kyc_statuses', null, {})
  }
}
