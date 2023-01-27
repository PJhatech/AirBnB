/** @format */

const express = require("express");
const {setTokenCookie, requireAuth} = require("../../utils/auth");
const {Spot, Image, User, Review, Booking} = require("../../db/models");
const {check} = require("express-validator");
const {handleValidationErrors} = require("../../utils/validation");
const {Model} = require("sequelize");
const sequelize = require("sequelize");
const {verify} = require("jsonwebtoken");
const router = express.Router();

//Get all Spots
router.get("/", async (req, res) => {
	const spot = await Spot.findAll({
		attributes: {
			include: [
				[
					sequelize.fn(
						"COALESCE",
						sequelize.fn("AVG", sequelize.col("Reviews.stars")),
						0
					),
					"averageStarRating",
				],
				[
					sequelize.fn(
						"COALESCE",
						sequelize.col("Images.url"),
						sequelize.literal("'No image has been uploaded'")
					),
					"previewImages",
				],
			],
		},
		include: [
			{
				model: Review,
				attributes: [],
			},
			{
				model: Image,
				attributes: [],
			},
		],
		group: ["spot.id"],
	});

	res.json({spot});
});

//Get all Spots owned by the Current User
router.get("/current", requireAuth, async (req, res) => {
	const spot = await Spot.findAll({
		where: {
			ownerId: req.user.id,
		},
		include: [
			{
				model: Review,
				attributes: [],
			},
			{
				model: Image,
				attributes: [],
			},
		],
		attributes: {
			include: [
				[
					sequelize.fn(
						"COALESCE",
						sequelize.fn("AVG", sequelize.col("Reviews.stars")),
						0
					),
					"averageStarRating",
				],
				[
					sequelize.fn(
						"COALESCE",
						sequelize.col("Images.url"),
						sequelize.literal("'No image has been uploaded'")
					),
					"previewImages",
				],
			],
		},
		group: ["spot.id"],
	});

	res.json({spot});
});

//Get details of a Spot from an id
router.get("/:id", async (req, res, next) => {
	const check = await Spot.findByPk(req.params.id);

	if (check) {
		const spots = await Spot.findAll({
			where: {id: req.params.id},
			include: [
				{
					model: Review,
					attributes: [],
				},
				{
					model: User,
					as: "Owner",
					attributes: ["id", "firstName", "lastName"],
				},
			],
			attributes: {
				include: [
					[
						sequelize.fn(
							"COALESCE",
							sequelize.fn("AVG", sequelize.col("Reviews.stars")),
							0
						),
						"averageStarRating",
					],
				],
			},
		});

		for await (let review of spots) {
			let numReview = 0;

			const numReviews = await Review.findAll({
				where: {spotId: req.params.id},
			});

			while (numReview < numReviews.length) {
				numReview++;
			}
			review.dataValues.numReviews = numReview;
		}

		for await (let spot of spots) {
			const spotImages = await Image.findAll({
				where: {
					imageableId: req.params.id,
					imageableType: "Spot",
				},
			});
			const map = spotImages.map((image) => {
				const obj = {};
				obj.id = image.id;
				obj.url = image.url;
				obj.preview = image.preview;
				return obj;
			});
			spot.dataValues.SpotImages = map;
		}

		// for await (let ownerId of spots) {
		// 	const owner = await User.findAll({
		// 		where: {id: req.params.id},
		// 	});

		// 	const map = owner.map((user) => {
		// 		const obj = {};
		// 		obj.id = user.id;
		// 		obj.firstName = user.firstName;
		// 		obj.lastName = user.lastName;
		// 		return obj;
		// 	});

		// 	ownerId.dataValues.Owner = map;
		// }

		res.json(spots);
	} else {
		res.json({
			statusCode: "404",
			message: "Spot couldnt be found",
		});
	}
});

//Creates and returns a new spot
router.post("/", requireAuth, async (req, res) => {
	const {
		address,
		city,
		state,
		country,
		lat,
		lng,
		name,
		description,
		price,
		ownerId,
	} = req.body;

	const newSpot = await Spot.create({
		address: address,
		city: city,
		state: state,
		country: country,
		lat: lat,
		lng: lng,
		name: name,
		description: description,
		price: price,
		ownerId: req.user.id,
	});

	if (newSpot.ownerId === req.user.id) {
		res.json(newSpot);
	} else {
		res.json({
			message: "Validation Error",
			statusCode: 400,
			errors: [
				"Street address is required",
				"City is required",
				"State is required",
				"Country is required",
				"Latitude is not valid",
				"Longitude is not valid",
				"Name must be less than 50 characters",
				"Description is required",
				"Price per day is required",
			],
		});
	}
});

//Add an Image to a Spot based on the Spot's id
router.post("/:spotId/images", requireAuth, async (req, res, next) => {
	const {url, preview} = req.body;

	const spots = await Spot.findOne({
		where: {id: req.params.spotId},
	});

	if (spots) {
		const newImage = await Image.create({
			url: url,
			imageableType: "Spot",
			imageableId: req.params.spotId,
			preview: preview,
		});
		res.json({
			id: newImage.id,
			url: newImage.url,
			preview: preview,
		});
	} else {
		res.json({
			message: "Spot couldn't be found",
			statusCode: 404,
		});
	}
});

//Edit a Spot: Updates and returns an existing spot.
router.put("/:spotId", requireAuth, async (req, res) => {
	const {address, city, state, country, lat, lng, name, description, price} =
		req.body;

	const spot = await Spot.findOne({
		where: {
			id: req.params.spotId,
		},
	});

	if (!spot) {
		res.status(404);
		res.json({message: "Spot couldn't be found", statusCode: 404});
	}

	if (spot.ownerId === req.user.id) {
		await spot.update({
			address: address,
			city: city,
			state: state,
			country: country,
			lat: lat,
			lng: lng,
			name: name,
			description: description,
			price: price,
		});
		res.json(spot);
	} else {
		res.json({
			message: "Validation Error",
			statusCode: 400,
			errors: [
				"Street address is required",
				"City is required",
				"State is required",
				"Country is required",
				"Latitude is not valid",
				"Longitude is not valid",
				"Name must be less than 50 characters",
				"Description is required",
				"Price per day is required",
			],
		});
	}
});

router.delete("/:spotId", requireAuth, async (req, res) => {
	const spot = await Spot.findOne({
		where: {id: req.params.spotId},
	});

	if (spot.ownerId === req.user.id) {
		await spot.destroy();
		res.json({
			message: "Successfully deleted",
			statusCode: 200,
		});
	} else {
		res.status(400);
		res.json({
			message: "Must be Owner of Spot to Delete",
			statusCode: 400,
		});
	}

	if (!spot) {
		res.status(404);
		res.json({
			message: "Spot couldn't be found",
			statusCode: 404,
		});
	}
});

//Get all Reviews by a Spot's id
router.get("/:spotId/reviews", async (req, res) => {
	const spot = await Spot.findByPk(req.params.spotId)
	if (!spot) {
		res.status(404)
		res.json({
			message: "Spot couldn't be found",
			statusCode: 404,
		});
	} else {

		const Reviews = await Review.findAll({
			attributes: [
				"id",
				"userId",
				"spotId",
				"review",
				"stars",
				"createdAt",
				"updatedAt",
			],
			where: {
				spotId: req.params.spotId,
			},
			include: {
				model: User,
				attributes: ["id", "firstName", "lastName"],
			},
		});

		for await (let review of Reviews) {
			const reviewImages = await Image.findAll({
				where: {
					imageableId: review.dataValues.id,
					imageableType: "Review",
				},
			});
			const map = reviewImages.map((image) => {
				const obj = {};
				obj.id = image.id;
				obj.url = image.url;
				return obj;
			});
			review.dataValues.ReviewImages = map;
		}
		res.json({Reviews});
	}
});

//Create a Review for a Spot based on the Spot's id
router.post("/:spotId/reviews", requireAuth, async (req, res) => {
	const {review, stars} = req.body;
	const spot = await Spot.findByPk(req.params.spotId)

	console.log(spot)
	const reviews = await Review.findAll({
		where: {

			spotId: req.params.spotId,
		},
	});
	if (!spot) {
		res.json({
			message: "Review couldn't be found",
			statusCode: 404,
		});
	} else {
		if (reviews.length) {
			res.status(403);
			res.json({
				message: "User already has a review for this spot",
				statusCode: 403,
			});
		} else if (!reviews.length) {
			const newReview = await Review.create({
				userId: req.user.id,
				spotId: req.params.spotId,
				review: review,
				stars: stars,
			});
			res.json(newReview);
		} else {
			res.status(400);
			res.json({
				message: "Validation error",
				statusCode: 400
			});
		}
	}
});



//Get all Bookings for a Spot based on the Spot's id
router.get("/:spotId/bookings", requireAuth, async (req, res) => {
	const verify = await Booking.findByPk(req.params.spotId);

	const Bookings = await Booking.findAll({
		where: {id: req.params.spotId},
		include: {
			model: User,
			attributes: ["id", "firstName", "lastName"],
		},
	});

	if (verify.userId === req.user.id) {
		if (verify) {
			res.json({Bookings});
		} else {
			res.status(404);
			res.json({
				message: "Spot couldn't be found",
				statusCode: 404,
			});
		}
	} else {
		res.json({
			spotId: verify.spotId,
			startDate: verify.startDate,
			endDate: verify.endDate,
		});
	}
});

//Create a Booking from a Spot based on the Spot's id
router.post("/:spotId/bookings", requireAuth, async (req, res) => {
	const {startDate, endDate} = req.body;
	const spot = await Spot.findByPk(req.params.spotId);

	if (!spot.ownerId === req.user.id) {
		const newBooking = await Booking.create({
			userId: req.user.id,
			spotId: req.params.spotId,
			startDate: startDate,
			endDate: endDate,
		});
		res.json(newBooking);
	} else {
		res.json({
			message: "Cannot book your own Spot!",
		});
	}
});

module.exports = router;
