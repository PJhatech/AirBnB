const express = require("express");
const {setTokenCookie, requireAuth} = require("../../utils/auth");
const {Spot, Image, User, Review} = require("../../db/models");
const {check} = require("express-validator");
const {handleValidationErrors} = require("../../utils/validation");
const {Model} = require("sequelize");
const image = require("../../db/models/image");
const spot = require("../../db/models/spot");
const review = require("../../db/models/review")
const user = require("../../db/models/user")
const router = express.Router();



//Get all Reviews of the Current User
router.get('/current', async (req, res) => {
   const userReviews = await Review.findAll({
		where: {
			userId: req.user.id,
		},
		include: {
         model: User,
			attributes: ["id", "firstName", "lastName"],
		},
		include: {
         model: Spot,
			attributes: ["id", "ownerId", "address", "city", "state", "country", "lat", "lng", "name", "price", "previewImage"],
      },
      include: {
         model: Image,
         // where: {
         //    imageableType: 'Review'
         // }
      },
   });

   // for await (let review of userReviews) {
   //    console.log(review)
      // const reviewImages = await Image.findAll({
      //    where: {
      //       imageableId: review.dataValues.id
      //    },

      // })
      // console.log(reviewImages)
   // }
   res.json(userReviews)
})

//Add an Image to a Review based on the Review's id
router.post('/reviewId/images', async (req, res) => {
   
})





module.exports = router;
