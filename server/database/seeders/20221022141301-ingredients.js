'use strict';

var Ingredients = require('./ingredients.json')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    const ingredients = Object.keys(Ingredients)
    const map = ingredients.reduce((accumulator, curValue) => {
      accumulator.push({
        name: curValue,
      })
      return accumulator
    }, [])

    return queryInterface.bulkInsert('ingredients', map, {})
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
