'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
		"Images",
		[
			{
				imageableId: 1,
				url: "https://res.cloudinary.com/dyep3uddk/image/upload/v1673479961/samples/landscapes/nature-mountains.jpg",
				imageableType: "Spot",
			},
			{
				imageableId: 1,
				url: "https://res.cloudinary.com/dyep3uddk/image/upload/v1673479961/samples/landscapes/nature-mountains.jpg",
				imageableType: "Spot",
			},
			{
				imageableId: 1,
				url: "https://res.cloudinary.com/dyep3uddk/image/upload/v1673479961/samples/landscapes/nature-mountains.jpg",
				imageableType: "Spot",
			},
			{
				imageableId: 2,
				url: "https://res.cloudinary.com/dyep3uddk/image/upload/v1673479961/samples/landscapes/nature-mountains.jpg",
				imageableType: "Spot",
			},
			{
				imageableId: 2,
				url: "https://res.cloudinary.com/dyep3uddk/image/upload/v1673479961/samples/landscapes/nature-mountains.jpg",
				imageableType: "Spot",
			},
			{
				imageableId: 3,
				url: "https://res.cloudinary.com/dyep3uddk/image/upload/v1673479961/samples/landscapes/nature-mountains.jpg",
				imageableType: "Spot",
			},
			{
				imageableId: 3,
				url: "https://res.cloudinary.com/dyep3uddk/image/upload/v1673479961/samples/landscapes/nature-mountains.jpg",
				imageableType: "Spot",
			},
			{
				imageableId: 4,
				url: "https://res.cloudinary.com/dyep3uddk/image/upload/v1673479961/samples/landscapes/nature-mountains.jpg",
				imageableType: "Spot",
			},
			{
				imageableId: 4,
				url: "https://res.cloudinary.com/dyep3uddk/image/upload/v1673479961/samples/landscapes/nature-mountains.jpg",
				imageableType: "Spot",
			},
			{
				imageableId: 1,
				url: "https://res.cloudinary.com/dyep3uddk/image/upload/v1673479956/samples/landscapes/architecture-signs.jpg",
				imageableType: "Review",
			},
			{
				imageableId: 1,
				url: "https://res.cloudinary.com/dyep3uddk/image/upload/v1673479956/samples/landscapes/architecture-signs.jpg",
				imageableType: "Review",
			},
			{
				imageableId: 1,
				url: "https://res.cloudinary.com/dyep3uddk/image/upload/v1673479956/samples/landscapes/architecture-signs.jpg",
				imageableType: "Review",
			},
			{
				imageableId: 1,
				url: "https://res.cloudinary.com/dyep3uddk/image/upload/v1673479956/samples/landscapes/architecture-signs.jpg",
				imageableType: "Review",
			},
			{
				imageableId: 2,
				url: "https://res.cloudinary.com/dyep3uddk/image/upload/v1673479956/samples/landscapes/architecture-signs.jpg",
				imageableType: "Review",
			},
			{
				imageableId: 2,
				url: "https://res.cloudinary.com/dyep3uddk/image/upload/v1673479956/samples/landscapes/architecture-signs.jpg",
				imageableType: "Review",
			},
			{
				imageableId: 3,
				url: "https://res.cloudinary.com/dyep3uddk/image/upload/v1673479956/samples/landscapes/architecture-signs.jpg",
				imageableType: "Review",
			},
			{
				imageableId: 3,
				url: "https://res.cloudinary.com/dyep3uddk/image/upload/v1673479956/samples/landscapes/architecture-signs.jpg",
				imageableType: "Review",
			},
			{
				imageableId: 4,
				url: "https://res.cloudinary.com/dyep3uddk/image/upload/v1673479956/samples/landscapes/architecture-signs.jpg",
				imageableType: "Review",
			},
			{
				imageableId: 4,
				url: "https://res.cloudinary.com/dyep3uddk/image/upload/v1673479956/samples/landscapes/architecture-signs.jpg",
				imageableType: "Review",
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

  async down (queryInterface, Sequelize) {
     await queryInterface.bulkDelete('Images');
  }
};
