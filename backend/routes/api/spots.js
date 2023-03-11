const express = require("express");
const {setTokenCookie, requireAuth} = require("../../utils/auth");
const {Spot, Image, User, Review, Booking} = require("../../db/models");
const {check} = require("express-validator");
const {handleValidationErrors} = require("../../utils/validation");
const {Model} = require("sequelize");
const {Op} = require("sequelize");
const sequelize = require("sequelize");
const {verify} = require("jsonwebtoken");
const router = express.Router();

//Get all Spots
router.get("", async (req, res) => {
	let {page, size, minLat, maxLat, minLng, maxLng, minPrice, maxPrice} =
		req.query;

	if (page < 0) {
		res.status(400);
		return res.json({
			message: "Validation Error",
			error: "Page must be greater than or equal to 0",
		});
	}

	if (size < 0) {
		res.status(400);
		return res.json({
			message: "Validation Error",
			error: "size must be greater than or equal to 0",
		});
	}

	if (maxPrice < 0) {
		res.status(400);
		return res.json({
			message: "Validation Error",
			error: "Maximum price must be greater than or equal to 0",
		});
	}
	if (minPrice < 0) {
		res.status(400);
		return res.json({
			message: "Validation Error",
			error: "Minimum price must be greater than or equal to 0",
		});
	}

	if (!isNaN(minPrice)) {
		res.status(400);
		return res.json({
			message: "Validation Error",
			error: "Minimum longitude is invalid",
		});
	}

	if (!isNaN(minLng)) {
		res.status(400);
		res.json({
			message: "Validation Error",
			error: "Minimum longitude is invalid",
		});
	}

	if (!isNaN(maxLng)) {
		res.status(400);
		return res.json({
			message: "Validation Error",
			error: "Maximum longitude is invalid",
		});
	}

	if (!isNaN(minLat)) {
		res.status(400);
		return res.json({
			message: "Validation Error",
			error: "Maximum latitude is invalid",
		});
	}

	if (!isNaN(maxLat)) {
		res.status(400);
		return res.json({
			message: "Validation Error",
			error: "Maximum latitude is invalid",
		});
	}

	if (!size || isNaN(size) || size > 20) {
		size = 20;
	}
	if (!page || isNaN(page) || page > 10) {
		page = 1;
	}

	if (!minLat) {
		minLat = -90;
	}
	if (!maxLat) {
		maxLat = 90;
	}
	if (!minLng) {
		minLng = -180;
	}
	if (!maxLng) {
		maxLng = 180;
	}
	if (!minPrice) {
		minPrice = 1;
	}
	if (!maxPrice) {
		maxPrice = 100000;
	}

	const spots = await Spot.findAll({
		// where: {
		// 	lat: {[Op.between]: [minLat, maxLat]},
		// 	lng: {[Op.between]: [minLng, maxLng]},
		// 	price: {[Op.between]: [minPrice, maxPrice]},
		// },
		limit: size,
		offset: (page - 1) * size,
	});

	for await (let spot of spots) {
		const previewImages = await Image.findAll({
			where: {
				imageableType: "Spot",
				imageableId: spot.id,
				preview: true,
			},
			attributes: ["url"],
		});

		if (previewImages.length) {
			const image = previewImages.map((value) => value.url);
			spot.dataValues.previewImage = image[0];
		} else {
			spot.dataValues.previewImage = "No Image Url";
		}

		const reviews = await Review.findAll({
			where: {spotId: spot.id},
		});

		if (reviews.length) {
			let sum = 0;

			reviews.forEach((review) => {
				sum += review.stars;
			});
			sum = sum / reviews.length;
			spot.dataValues.AvgRating = sum;
		} else {
			spot.dataValues.AvgRating = 0;
		}
	}

	// spots.page = page;
	// spots.size = size;
	res.json(
		spots
		// page,
		// size,
	);
});

//Get all Spots owned by the Current User
router.get("/current", requireAuth, async (req, res) => {
	const Spots = await Spot.findAll({
		where: {ownerId: req.user.id},
	});

	for await (let spot of Spots) {
		const reviews = await Review.findAll({
			where: {spotId: spot.id},
		});

		if (reviews.length) {
			let sum = 0;

			reviews.forEach((review) => {
				sum += review.stars;
			});
			sum = sum / reviews.length;
			spot.dataValues.AvgRating = sum;
		} else {
			spot.dataValues.AvgRating = 0;
		}

		const previewImages = await Image.findAll({
			where: {
				imageableType: "Spot",
				imageableId: spot.id,
				preview: true,
			},
			attributes: ["url"],
		});

		if (previewImages.length) {
			const image = previewImages.map((value) => value.url);
			spot.dataValues.previewImage = image[0];
		} else {
			spot.dataValues.previewImage = "No Image Url";
		}
	}
	res.json({Spots});
});

//Get details of a Spot from an id
router.get("/:id", async (req, res, next) => {
	const check = await Spot.findByPk(req.params.id)

	if (!check) {
		res.json({
			statusCode: "404",
			message: "Spot couldnt be found",
		});
	} else {
		const spots = await Spot.findAll({
			where: {id: req.params.id},
			include: [
				{
					model: User,
					as: "Owner",
					attributes: ["id", "firstName", "lastName"],
				},
			],
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
			const previewImages = await Image.findAll({
				where: {
					imageableType: "Spot",
					imageableId: spot.id,
				},
				attributes: ["url"],
			});
			if (previewImages.length) {
				const image = previewImages.map((value) => value.url);
				spot.dataValues.previewImage = image[0];
			} else {
				spot.dataValues.previewImage = "No Image Url";
			}

			const reviews = await Review.findAll({
				where: {spotId: spot.id},
			});

			if (reviews.length) {
				let sum = 0;

				reviews.forEach((review) => {
					sum += review.stars;
				});
				sum = sum / reviews.length;
				spot.dataValues.AvgRating = sum;
			} else {
				spot.dataValues.AvgRating = 0;
			}
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
		previewImage,
		ownerId = req.user.id,
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
		previewImage: previewImage,
		ownerId: req.user.id,
	});

	if (newSpot.ownerId === req.user.id) {
		return res.json(newSpot);
	} else {
		return res.json({
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

	if (!spots) {
		return res.json({
			message: "Spot couldn't be found",
			statusCode: 404,
		});
	}

	if (spots) {
		const newImage = await Image.create({
			url: url,
			imageableType: "Spot",
			imageableId: req.params.spotId,
			preview: preview,
		});
		console.log(newImage, "<_______4______>")
		return res.json({
			id: newImage.id,
			url: newImage.url,
			preview: preview,
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
		return res.json({message: "Spot couldn't be found", statusCode: 404});
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

	if (!spot) {
		res.status(404);
		return res.json({
			message: "Spot couldn't be found",
			statusCode: 404,
		});
	}

	if (spot.ownerId === req.user.id) {
		if (spot) {
			await spot.destroy();
			return res.json({
				spot
			});
		}
	} else {
		res.status(400);
		return res.json({
			message: "Must be Owner of Spot to Delete",
			statusCode: 400,
		});
	}
});

//Get all Reviews by a Spot's id
router.get("/:spotId/reviews", async (req, res) => {
	const spot = await Spot.findByPk(req.params.spotId);
	if (!spot) {
		res.status(404);
		return res.json({
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
	const spot = await Spot.findByPk(req.params.spotId);

	console.log(spot);
	const reviews = await Review.findAll({
		where: {
			spotId: req.params.spotId,
		},
	});
	if (!spot) {
		return res.json({
			message: "Review couldn't be found",
			statusCode: 404,
		});
	} else {
		if (reviews.length ) {
			// res.status(403);
			// return res.json({
			// 	message: "User already has a review for this spot",
			// 	statusCode: 403,
			// });
		} else if (!reviews.length) {
			const newReview = await Review.create({
				userId: req.user.id,
				spotId: req.params.spotId,
				review: review,
				stars: stars,
			});
			return res.json(newReview);
		} else {
			res.status(400);
			return res.json({
				message: "Validation error",
				statusCode: 400,
			});
		}
	}
});

//Get all Bookings for a Spot based on the Spot's id
router.get("/:spotId/bookings", requireAuth, async (req, res) => {
	const verify = await Booking.findByPk(req.params.spotId);
	if (!verify) {
		res.status(404);
		return res.json({
			message: "Spot couldn't be found",
			statusCode: 404,
		});
	}

	const Bookings = await Booking.findAll({
		where: {userId: req.params.spotId},
		include: {
			model: User,
			attributes: ["id", "firstName", "lastName"],
		},
	});

	if (verify.userId === req.user.id) {
		if (verify) {
			return res.json({Bookings});
		}
	} else {
		return res.json({
			Bookings: {
				spotId: verify.spotId,
				startDate: verify.startDate,
				endDate: verify.endDate,
			},
		});
	}
});

//Create a Booking from a Spot based on the Spot's id
router.post("/:spotId/bookings", requireAuth, async (req, res) => {
	const {startDate, endDate} = req.body;
	const spot = await Spot.findByPk(req.params.spotId);
	const booked = await Booking.findOne({
		where: {
			[Op.or]: [
				{
					startDate: {[Op.between]: [startDate, endDate]},
				},
				{
					endDate: {[Op.between]: [startDate, endDate]},
				},
			],
		},
	});

	if (!spot) {
		res.status(404);
		return res.json({
			message: "Spot couldn't be found",
			statusCode: 404,
		});
	}

	if (spot.ownerId !== req.user.id) {
		return res.json({
			message: "Cannot book your own Spot!",
		});
	}

	if (booked) {
		res.status(403);
		return res.json({
			message: "Sorry, this spot is already booked for the specified dates",
			statusCode: 403,
			errors: [
				"Start date conflicts with an existing booking",
				"End date conflicts with an existing booking",
			],
		});
	}
	if (!booked) {
		const newBooking = await Booking.create({
			userId: req.user.id,
			spotId: req.params.spotId,
			startDate: startDate,
			endDate: endDate,
		});
		return res.json(newBooking);
	} else {
		res.status(400);
		return res.json({
			message: "Validation error",
			statusCode: 400,
			errors: ["endDate cannot be on or before startDate"],
		});
	}
});

module.exports = router;
