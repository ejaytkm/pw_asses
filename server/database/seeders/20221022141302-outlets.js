'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('outlets', [{
      name: 'Mid Valley',
      address: 'Lingkaran Syed Putra, Mid Valley City, 59200 Kuala Lumpur, Wilayah Persekutuan Kuala Lumpur',
      coordinate_x: "3.117933",
      coordinate_y: "101.676847"
    }, {
      name: 'Pavillion',
      address: '168, Jln Bukit Bintang, Bukit Bintang, 55100 Kuala Lumpur, Wilayah Persekutuan Kuala Lumpur',
      coordinate_x: "3.1492146",
      coordinate_y: "101.7135288"
    }], {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
