'use strict';
let options = {};
if (process.env.NODE_ENV === "production") {
	options.schema = process.env.SCHEMA; // define your schema in options object
}
/** @type {import('sequelize-cli').Migration} */
module.exports = {
	up: async (queryInterface, Sequelize) => {
		options.tableName = "Images";
		await queryInterface.bulkInsert(
			options,
			[
				{
					imageableId: 1,
					url: "https://res.cloudinary.com/dyep3uddk/image/upload/v1677548092/Stock%20House%20Images/stockHouse1.jpg",
					imageableType: "Spot",
					preview: true,
				},
				// {
				// 	imageableId: 1,
				// 	url: "https://res.cloudinary.com/dyep3uddk/image/upload/v1677548090/Stock%20House%20Images/stockHouse2.jpg",
				// 	imageableType: "Spot",
				// 	preview: false,
				// },
				// {
				// 	imageableId: 1,
				// 	url: "https://res.cloudinary.com/dyep3uddk/image/upload/v1673479961/samples/landscapes/nature-mountains.jpg",
				// 	imageableType: "Spot",
				// 	preview: false,
				// },
				{
					imageableId: 2,
					url: "https://res.cloudinary.com/dyep3uddk/image/upload/v1677550198/Stock%20House%20Images/stockHouse5_zoinnt.jpg",
					imageableType: "Spot",
					preview: true,
				},
				// {
				// 	imageableId: 2,
				// 	url: "https://res.cloudinary.com/dyep3uddk/image/upload/v1677550198/Stock%20House%20Images/stockHouse7_btlotp.jpg",
				// 	imageableType: "Spot",
				// 	preview: false,
				// },
				{
					imageableId: 3,
					url: "https://res.cloudinary.com/dyep3uddk/image/upload/v1677550198/Stock%20House%20Images/stockHouse6_letfzl.jpg",
					imageableType: "Spot",
					preview: true,
				},
				// {
				// 	imageableId: 3,
				// 	url: "https://res.cloudinary.com/dyep3uddk/image/upload/v1677550196/Stock%20House%20Images/stockHouse4_v5kekt.jpg",
				// 	imageableType: "Spot",
				// 	preview: false,
				// },
				{
					imageableId: 4,
					url: "https://res.cloudinary.com/dyep3uddk/image/upload/v1677550195/Stock%20House%20Images/stockHouse3_aifrll.jpg",
					imageableType: "Spot",
					preview: true,
				},
				// {
				// 	imageableId: 4,
				// 	url: "https://res.cloudinary.com/dyep3uddk/image/upload/v1673479961/samples/landscapes/nature-mountains.jpg",
				// 	imageableType: "Spot",
				// 	preview: false,
				// },
				{
					imageableId: 1,
					url: "https://res.cloudinary.com/dyep3uddk/image/upload/v1673479956/samples/landscapes/architecture-signs.jpg",
					imageableType: "Review",
					preview: false,
				},
				{
					imageableId: 1,
					url: "https://res.cloudinary.com/dyep3uddk/image/upload/v1673479956/samples/landscapes/architecture-signs.jpg",
					imageableType: "Review",
					preview: false,
				},
				{
					imageableId: 1,
					url: "https://res.cloudinary.com/dyep3uddk/image/upload/v1673479956/samples/landscapes/architecture-signs.jpg",
					imageableType: "Review",
					preview: false,
				},
				{
					imageableId: 1,
					url: "https://res.cloudinary.com/dyep3uddk/image/upload/v1673479956/samples/landscapes/architecture-signs.jpg",
					imageableType: "Review",
					preview: false,
				},
				{
					imageableId: 2,
					url: "https://res.cloudinary.com/dyep3uddk/image/upload/v1673479956/samples/landscapes/architecture-signs.jpg",
					imageableType: "Review",
					preview: true,
				},
				{
					imageableId: 2,
					url: "https://res.cloudinary.com/dyep3uddk/image/upload/v1673479956/samples/landscapes/architecture-signs.jpg",
					imageableType: "Review",
					preview: false,
				},
				{
					imageableId: 3,
					url: "https://res.cloudinary.com/dyep3uddk/image/upload/v1673479956/samples/landscapes/architecture-signs.jpg",
					imageableType: "Review",
					preview: true,
				},
				{
					imageableId: 3,
					url: "https://res.cloudinary.com/dyep3uddk/image/upload/v1673479956/samples/landscapes/architecture-signs.jpg",
					imageableType: "Review",
					preview: false,
				},
				{
					imageableId: 4,
					url: "https://res.cloudinary.com/dyep3uddk/image/upload/v1673479956/samples/landscapes/architecture-signs.jpg",
					imageableType: "Review",
					preview: false,
				},
				{
					imageableId: 4,
					url: "https://res.cloudinary.com/dyep3uddk/image/upload/v1673479956/samples/landscapes/architecture-signs.jpg",
					imageableType: "Review",
					preview: false,
				},
				// {
				// 	imageableId: 3,
				// 	url: "https://res.cloudinary.com/dyep3uddk/image/upload/v1673479953/samples/landscapes/girl-urban-view.jpg",
				// 	imageableType: "Spot",
				// },
				// {
				// 	imageableId: 4,
				// 	url: "https://res.cloudinary.com/dyep3uddk/image/upload/v1673479957/samples/landscapes/beach-boat.jpg",
				// 	imageableType: "Review",
				// },
				// {
				// 	imageableId: 5,
				// 	url: "https://res.cloudinary.com/dyep3uddk/image/upload/v1673479957/samples/landscapes/beach-boat.jpg",
				// 	imageableType: "Review",
				// },
				// {
				// 	imageableId: 5,
				// 	url: "https://res.cloudinary.com/dyep3uddk/image/upload/v1673479957/samples/landscapes/beach-boat.jpg",
				// 	imageableType: "Review",
				// },
				// {
				// 	imageableId: 7,
				// 	url: "https://res.cloudinary.com/dyep3uddk/image/upload/v1673479957/samples/landscapes/beach-boat.jpg",
				// 	imageableType: "Spot",
				// },
			],
			{}
		);
	},

	down: async (queryInterface, Sequelize) => {
		options.tableName = "Images";
		const Op = Sequelize.Op;
		return queryInterface.bulkDelete(options);
	},
};
