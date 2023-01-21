/** @format */

"use strict";
const {Model} = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class Image extends Model {
		static getImageable(options) {
			if (!this.imageableType) return Promise.resolve();
			const mixinMethodName = `get${this.imageableType}`;
			return this[mixinMethodName](options);
		}

		static associate(models) {
			Image.belongsTo(models.Spot, {foreignKey: "imageableId", constraints: false});
			Image.belongsTo(models.Review, {foreignKey: "imageableId", constraints: false});
		}
	}
	Image.init(
		{
			imageableId: {
				type: DataTypes.INTEGER,
				onDelete: "CASCADE",
			},
			url: {
				type: DataTypes.TEXT,
				allowNull: false,
			},
			imageableType: {
				type: DataTypes.STRING,
			},
		},
		{
			sequelize,
			modelName: "Image",
		}
	);
	return Image;
};
