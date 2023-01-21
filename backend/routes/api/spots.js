const express = require("express");
const {setTokenCookie, requireAuth} = require("../../utils/auth");
const {Spot, Image, User, Review} = require("../../db/models");
const {check} = require("express-validator");
const {handleValidationErrors} = require("../../utils/validation");
const {Model} = require("sequelize");
const image = require("../../db/models/image");
const spot = require("../../db/models/spot");
const router = express.Router();



//Get all Spots
router.get("/", async (req, res) => {
	const spots = await Spot.findAll();

	res.json({spots});
});



//Get all Spots owned by the Current User
router.get("/current", async (req, res) => {
	const spot = await Spot.findAll({
		where: {
			ownerId: req.user.id,
		},
	});

		res.json({ spot });
});




//Get details of a Spot from an id
router.get("/:id", async (req, res, next) => {
	const spots = await Spot.findOne({
		where: {
			id: req.params.id,
		},
	});

	if (spots) {
		res.json(spots);
	} else {
		res.json({
			statusCode: "404",
			message: `Could not find Spot ${req.params.id}`,
		});
	}
});



//Creates and returns a new spot
router.post("/", async (req, res) => {
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
router.post("/:spotId/images", async (req, res, next) => {
	const {url, preview} = req.body;


	const newImage = await Image.create({ url });
	console.log(newImage);
	const spots = await Spot.findOne({
		where: {
			id: req.params.spotId,
		},
	});


	if (spots.ownerId === req.user.id) {
		await spots.update({
			// previewImage: newImage.url,
			preview: preview,
		});
		res.json(spots);
	} else {
		res.json({
			message: "Spot couldn't be found",
			statusCode: 404,
		});
	}
});



//Edit a Spot: Updates and returns an existing spot.
router.patch('/:spotId', async (req, res, next) => {
	const { address, city, state, country, lat, lng, name, description, price } = req.body;


	const spot = await Spot.findOne({
		where: {
			id: req.params.spotId
		}
	})


	if (!spot) {
		res.status(404)
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
		res.json({spot});
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

})



router.delete('/:spotId', async (req, res) => {
	const spot = await Spot.findOne({
		where: { id: req.params.spotId }
	})


	if (spot.ownerId === req.user.id) {
		await spot.destroy()
		res.json({
			message: "Successfully deleted",
			statusCode: 200
		});
	} else {
		res.status(400)
		res.json({
			message: "Must be Owner of Spot to Delete",
			statusCode: 400
		})
	}


	if (!spot) {
		res.status(404)
		res.json({
			message: "Spot couldn't be found",
			statusCode: 404
		})
	}
})


//Get all Reviews by a Spot's id
router.get("/:spotId/reviews", async (req, res) => {
	const spotReviews = await Review.findAll({
		where: {
			spotId: req.params.spotId,
		},
	});

	console.log(spotReviews);
	res.json(spotReviews);
});


module.exports = router;
