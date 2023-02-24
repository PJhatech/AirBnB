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
					firstName: "Paul",
					lastName: "Hut",
					email: "paul.hut@pmail.io",
					username: "Demo-lition",
					hashedPassword: bcrypt.hashSync("password"),
					firstName: "DemoFirstName1",
					lastName: "DemoLastName1",
				},
				{
					firstName: "Jha",
					lastName: "Ramento",
					email: "jha.ramento@jmail.io",
					username: "porkRamen",
					hashedPassword: bcrypt.hashSync("password2"),
					firstName: "UserFirstName2",
					lastName: "UserLastName2",
				},
				{
					firstName: "Jax",
					lastName: "Hutalla",
					email: "dog1@pmail.io",
					username: "Number1Dog",
					hashedPassword: bcrypt.hashSync("password3"),
					firstName: "DemoUserFirst3",
					lastName: "DemoUserLast3",
				},
				{
					firstName: "Rue",
					lastName: "Bulatao",
					email: "Rue.Bulatao@pmail.io",
					username: "StraightFromOakland",
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
