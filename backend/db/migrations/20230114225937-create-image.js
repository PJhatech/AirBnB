'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
		await queryInterface.createTable("Images", {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER,
			},
			imageableId: {
				type: Sequelize.INTEGER,
				onDelete: 'CASCADE',
			},
			url: {
				type: Sequelize.TEXT,
				allowNull: false,
			},
			imageableType: {
				type: Sequelize.STRING,
			},
			preview: {
				type: Sequelize.BOOLEAN,
				allowNull: false,
				defaultValue: false
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
    await queryInterface.dropTable('Images');
  }
};
