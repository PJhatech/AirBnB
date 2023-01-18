'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Reviews", {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER,
			},
			userId: {
				type: Sequelize.INTEGER,
				allowNull: false,
				autoIncrement: true,
				references: {
					model: 'Users',
					key: 'id',
				},
				onDelete: "CASCADE",
			},
			spotId: {
				type: Sequelize.INTEGER,
				allowNull: false,
				autoIncrement: true,
				references: {
					model: 'Spots',
					key: 'id',
				},
				onDelete: "CASCADE",
			},
			review: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			stars: {
				type: Sequelize.INTEGER,
				allowNull: false,
			},
			createdAt: {
				allowNull: false,
				type: Sequelize.DATE,
				defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
			},
			updatedAt: {
				allowNull: false,
				type: Sequelize.DATE,
				defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
			},
		});
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Reviews');
  }
};
