"use strict";
const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === "production") {
	options.schema = process.env.SCHEMA; // define your schema in options object
}

module.exports = {
	up: async (queryInterface, Sequelize) => {
		options.tableName = "Users";
		return queryInterface.bulkInsert(
			options,
			[
				{
					firstName: 'Paul',
					lastName: 'Hut',
					email: "demo@user.io",
					username: "Demo-lition",
					hashedPassword: bcrypt.hashSync("password"),
				},
				{
					firstName: 'Jha',
					lastName: 'Ramento',
					email: "user1@user.io",
					username: "FakeUser1",
					hashedPassword: bcrypt.hashSync("password2"),
				},
				{
					firstName: 'Jax',
					lastName: 'Hutalla',
					email: "user2@user.io",
					username: "FakeUser2",
					hashedPassword: bcrypt.hashSync("password3"),
				},
				{
					firstName: 'Rue',
					lastName: 'Bulatao',
					email: "users4@user.io",
					username: "User4",
					hashedPassword: bcrypt.hashSync("password4"),
				},
			],
			{}
		);
	},

	down: async (queryInterface, Sequelize) => {
		options.tableName = "Users";
		const Op = Sequelize.Op;
		return queryInterface.bulkDelete(
			options,
			{
				username: {[Op.in]: ["Demo-lition", "FakeUser1", "FakeUser2", "FakerUser4"]},
			},
			{}
		);
	},
};
