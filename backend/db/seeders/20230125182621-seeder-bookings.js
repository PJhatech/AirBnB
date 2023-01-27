'use strict';
let options = {};
if (process.env.NODE_ENV === "production") {
	options.schema = process.env.SCHEMA; // define your schema in options object
}
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
     await queryInterface.bulkInsert('Bookings', [
      {
        userId: 1,
        spotId: 2,
        startDate: new Date(),
        endDate: new Date(),
      },
      {
        userId: 2,
        spotId: 1,
        startDate: new Date(),
        endDate: new Date(),
      },
      {
        userId: 3,
        spotId: 2,
        startDate: new Date(),
        endDate: new Date(),
      },
      {
        userId: 4,
        spotId: 3,
        startDate: new Date(),
        endDate: new Date(),
      },
     ], {});
  },

  async down (queryInterface, Sequelize) {
     await queryInterface.bulkDelete('Bookings');
  }
};
