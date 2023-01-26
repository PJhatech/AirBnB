'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Reviews', [
      {
       userId: 1,
       spotId: 2,
       review: "Best place i have stayed!",
       stars: 4
      },
      {
       userId: 2,
       spotId: 1,
       review: "really clean spot!",
       stars: 4
      },
      {
       userId: 2,
       spotId: 3,
       review: "really clean spot!",
       stars: 4
      },
      {
       userId: 2,
       spotId: 4,
       review: "really clean spot!",
       stars: 4
      },
      {
       userId: 2,
       spotId: 3,
       review: "really clean spot!",
       stars: 2
      },
      {
       userId: 2,
       spotId: 4,
       review: "really clean spot!",
       stars: 2
      },
      {
        userId: 3,
        spotId: 2,
       review: "Really pricey stay but worth it.",
       stars: 4
      },
      {
       userId: 4,
       spotId: 2,
       review: "They didnt murder us.",
       stars: 2
      },
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Reviews');
  }
};
