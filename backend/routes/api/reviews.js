/** @format */

const express = require("express");
const {setTokenCookie, requireAuth} = require("../../utils/auth");
const {Spot, Image, User, Review} = require("../../db/models");
const {check} = require("express-validator");
const {handleValidationErrors} = require("../../utils/validation");
const {Model} = require("sequelize");
const image = require("../../db/models/image");
const spot = require("../../db/models/spot");
const review = require("../../db/models/review");
const user = require("../../db/models/user");
const router = express.Router();

//Get all Reviews of the Current User
router.get("/current", requireAuth, async (req, res) => {
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
			userId: req.user.id,
		},
		include: [
			{
				model: User,
				where: {id: req.user.id},
				attributes: ["id", "firstName", "lastName"],
			},
			{
				model: Spot,
				attributes: [
					"id",
					"ownerId",
					"address",
					"city",
					"state",
					"country",
					"lat",
					"lng",
					"name",
					"price",
					"previewImage",
				],
			},
		],
	});

	for await (let review of Reviews) {
		const reviewImages = await Image.findAll({
			where: {
				imageableType: "Review",
				imageableId: review.dataValues.id,
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
});

//Add an Image to a Review based on the Review's id
router.patch("/:reviewId/images", requireAuth, async (req, res) => {
	const {url, preview} = req.body;
	const review = await Review.findByPk(req.params.reviewId);

	if (!review) {
		res.status(404);
		res.json({
			message: "Review could not be found",
			statusCode: 404,
		});
	}
	if (review.userId === req.user.id) {
		const newImage = await Image.create({
			url,
			imageableType: "Review",
			imageableId: req.params.reviewId,
		});
		res.json({
			id: newImage.id,
			url: newImage.url,
		});
   } else {
      res.json({
         message: "Must be the Authorized User"
      })
   }
});

module.exports = router;
