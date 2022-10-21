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
    return queryInterface.bulkInsert('user_risk_clasifications', [{
      code: '01',
      name: 'Low Risk',
      is_enabled: true
    }, {
      code: '02',
      name: 'Medium Risk',
      is_enabled: true
    }, {
      code: '03',
      name: 'High Risk',
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
    return queryInterface.bulkDelete('user_risk_clasifications', null, {})
  }
}
