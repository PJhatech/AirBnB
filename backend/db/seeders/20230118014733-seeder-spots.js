'use strict';
let options = {};
if (process.env.NODE_ENV === "production") {
	options.schema = process.env.SCHEMA; // define your schema in options object
}


/** @type {import('sequelize-cli').Migration} */
module.exports = {
	up: async (queryInterface, Sequelize) => {
		options.tableName = "Spots";
		await queryInterface.bulkInsert(
			options,
			[
				{
					ownerId: 1,
					address: "1234, ABCDrive",
					city: "Concord",
					state: "CA",
					country: "United States",
					lat: 1.5,
					lng: 2.5,
					name: "Cozy Oasis",
					description: "Cozy stay in Concord, California, United States",
					price: 275.0,
					// previewImage: "testurl",
				},
				{
					ownerId: 2,
					address: "234, CamelDrive",
					city: "Baypoint",
					state: "CA",
					country: "United States",
					lat: 1.5,
					lng: 2.5,
					name: "Private Luxury Brick House",
					description: "Greatest place ever",
					price: 375.0,
					// previewImage: "testurl",
				},
				{
					ownerId: 3,
					address: "234, LakeView Rd.",
					city: "Baypoint",
					state: "CA",
					country: "United States",
					lat: 1.5,
					lng: 2.5,
					name: "ROSEBRIAR MANSION",
					description: "6 bedrooms11 beds6.5 baths",
					price: 100.0,
					// previewImage: "testurl",
				},
				{
					ownerId: 4,
					address: "456, Birdhaven dr.",
					city: "Pittsburg",
					state: "CA",
					country: "United States",
					lat: 5.5,
					lng: 4.5,
					name: "Stinson Oceanfront ",
					description: "12 guests4 bedrooms8 beds4 baths",
					price: 10.0,
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
