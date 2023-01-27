'use strict';
let options = {};
if (process.env.NODE_ENV === "production") {
	options.schema = process.env.SCHEMA; // define your schema in options object
}
const { Spot, Booking, User } = require('../models');


/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.bulkInsert(
			"Spots",
			[
				{
					ownerId: 1,
					address: "1234, testway",
					city: "concord",
					state: "CA",
					country: "United States",
					lat: 1.5,
					lng: 2.5,
					name: "TestHouse",
					description: "make it work",
					price: "$50.00",
					// previewImage: "testurl",
				},
				{
					ownerId: 2,
					address: "234, cameldrive",
					city: "Baypoint",
					state: "CA",
					country: "United States",
					lat: 1.5,
					lng: 2.5,
					name: "TestingHouse",
					description: "Greatest place ever",
					price: "$100.00",
					// previewImage: "testurl",
				},
				{
					ownerId: 3,
					address: "234, cameldrive",
					city: "Baypoint",
					state: "CA",
					country: "United States",
					lat: 1.5,
					lng: 2.5,
					name: "TestingHouse",
					description: "Greatest place ever",
					price: "$100.00",
					// previewImage: "testurl",
				},
				{
					ownerId: 4,
					address: "456, birdhavendrive",
					city: "Pittsburg",
					state: "CA",
					country: "United States",
					lat: 5.5,
					lng: 4.5,
					name: "TestingHouse",
					description: "We wont murder you",
					price: "$10.00",
					// previewImage: "testurl",
				},
			],
			{}
		);
	},

	down: async (queryInterface, Sequelize) => {
		options.tableName = "Spots";
		const Op = Sequelize.Op;
		return queryInterface.bulkDelete(options);
	},
};
