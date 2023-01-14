'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class reviews extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  reviews.init(
		{
			userId: {
				type: DataTypes.INTEGER,
				allowNull: false,
				autoIncrement: true,
				onDelete: "CASCADE",
			},
			spotId: {
				type: DataTypes.INTEGER,
				allowNull: false,
				autoIncrement: true,
				onDelete: "CASCADE",
			},
			review: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			stars: {
				type: DataTypes.INTEGER,
				allowNull: false,
			},
		},
		{
			sequelize,
			modelName: "reviews",
		}
	);
  return reviews;
};
