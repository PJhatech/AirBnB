const express = require("express");
const {setTokenCookie, requireAuth} = require("../../utils/auth");
const {Spot} = require("../../db/models");
const {check} = require("express-validator");
const {handleValidationErrors} = require("../../utils/validation");
const {Model} = require("sequelize");
const router = express.Router();

//Get all Spots
router.get("/", async (req, res) => {
	const spots = await Spot.findAll();

	res.json({spots});
});

//Get all Spots owned by the Current User
router.get("/current", async (req, res) => {
	const spots = await Spot.findAll({
		where: {
			ownerId: req.user.id,
		},
	});

	res.json({spots});
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
	const {address, city, state, country, lat, lng, name, description, price, ownerId} =
		req.body;

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
      ownerId: req.user.id
	});

	if (newSpot) {
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
			]
		});
	}
});

module.exports = router;
