
const express = require("express");
const {setTokenCookie, requireAuth} = require("../../utils/auth");
const {Spot, Image, User, Review} = require("../../db/models");
const {check} = require("express-validator");
const {handleValidationErrors} = require("../../utils/validation");
const { Model } = require("sequelize");
const sequelize = require("sequelize");
const image = require("../../db/models/image");
const spot = require("../../db/models/spot");
const review = require("../../db/models/review");
const user = require("../../db/models/user");
const router = express.Router();

//Get all Reviews of the Current User
router.get("/:userId", requireAuth, async (req, res) => {
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
				model: Image,
				attributes: []
			},
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
				],
			},

		],
	});

	for await (let review of Reviews) {
			const previewImages = await Image.findAll({
				where: {
					imageableType: "Spot",
					imageableId: review.dataValues.Spot.id,
					preview: true,
				},
				attributes: ["url"],
			});

			if (previewImages.length) {
				const image = previewImages.map((value) => value.url);
				review.dataValues.Spot.dataValues.previewImage = image[0];
			} else {
				review.dataValues.Spot.dataValues.previewImage = "No Image Url";
			}


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
router.post("/:reviewId/images", requireAuth, async (req, res) => {
	const {url, preview} = req.body;
	const review = await Review.findByPk(req.params.reviewId);
   const images = await Image.findAll({
		where: {
			imageableType: "Review",
			imageableId: req.params.reviewId
		},
   });


	if (!review) {
		res.status(404);
		return res.json({
			message: "Review could not be found",
			statusCode: 404,
		});
   }

   if (review.userId === req.user.id) {
      if (images.length < 10) {
         const newImage = await Image.create({
            url,
            imageableType: "Review",
				imageableId: req.params.reviewId,
         });
         return res.json({
				id: newImage.id,
				url: newImage.url,
			});
      } else {
         res.status(403)
         return res.json({
				message: "Maximum number of images for this resource was reached",
				statusCode: 403,
			});
      }

   } else {
      return res.json({
			message: "Must be the Authorized User",
		});
   }
});



//Edit a Review
router.put('/:reviewId', requireAuth, async (req, res) => {
	const { review, stars, id } = req.body;
	const reviews = await Review.findOne({
		where: { id: req.params.reviewId }
	});
	if (!reviews) {
		res.status(404);
		return res.json({
			message: "Review couldn't be found",
			statusCode: 404,
		});
	}

	if (reviews.userId === req.user.id) {
		if (reviews) {
			await reviews.update({
				review: review,
				stars: stars
			})
			res.json(reviews)
		} else {
			res.status(400)
			return req.json({
				message: "Validation error",
				statusCode: 400,
				errors: [
					"Review text is required",
					"Stars must be an integer from 1 to 5",
				],
			});
		}


	} else {
		return res.json({
			message: "Must be the authorized User",
		});
	}
})



//Delete a Review
router.delete("/:reviewId", requireAuth, async (req, res) => {
	const review = await Review.findOne({
		where: {id: req.params.reviewId},
	});

	if (!review) {
		res.status(404);
		return res.json({
			message: "Spot couldn't be found",
			statusCode: 404,
		});
	}

	if (review.dataValues.userId === req.user.id) {
		await review.destroy();
		return res.status(200).json(review);
	} else {
		res.status(400);
		return res.json({
			message: "Must be Owner of Spot to Delete",
			statusCode: 400,
		});
	}

});



module.exports = router;
