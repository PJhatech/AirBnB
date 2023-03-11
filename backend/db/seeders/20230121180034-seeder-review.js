'use strict';
let options = {};
if (process.env.NODE_ENV === "production") {
	options.schema = process.env.SCHEMA; // define your schema in options object
}
/** @type {import('sequelize-cli').Migration} */
module.exports = {
	up: async (queryInterface, Sequelize) => {
		options.tableName = "Reviews";
		return queryInterface.bulkInsert(
			options,
			[
				{
					userId: 1,
					spotId: 2,
					review: "Best place i have stayed.",
					stars: 4,
				},
				{
					userId: 2,
					spotId: 1,
					review: "Would recommend",
					stars: 4,
				},
				{
					userId: 2,
					spotId: 3,
					review: "Nice Place to stay",
					stars: 4,
				},
				{
					userId: 2,
					spotId: 4,
					review: "Great stay",
					stars: 4,
				},
				{
					userId: 2,
					spotId: 3,
					review: "Loved it!",
					stars: 2,
				},
				{
					userId: 2,
					spotId: 4,
					review: "really clean spot!",
					stars: 2,
				},
				{
					userId: 3,
					spotId: 2,
					review: "Really pricey stay but worth it.",
					stars: 4,
				},
				{
					userId: 4,
					spotId: 2,
					review: "They didnt murder us.",
					stars: 2,
				},
			],
			{}
		);
	},

	down: async (queryInterface, Sequelize) => {
		options.tableName = "Reviews";
		const Op = Sequelize.Op;
		return queryInterface.bulkDelete(options);
	},
};
