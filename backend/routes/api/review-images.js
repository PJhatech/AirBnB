/** @format */

const express = require("express");
const {setTokenCookie, requireAuth} = require("../../utils/auth");
const {Spot, Image, User, Review, Booking} = require("../../db/models");
const {check} = require("express-validator");
const {handleValidationErrors} = require("../../utils/validation");
const {Model, TimeoutError} = require("sequelize");
const {Op} = require("sequelize");
const sequelize = require("sequelize");
const {verify} = require("jsonwebtoken");
const router = express.Router();


//Delete a Review Image
router.delete('/:reviewImageId', requireAuth, async (req, res) => {
   const review = await Review.findOne({
      where: { userId: req.user.id }
   })
   const reviewImage = await Image.findOne({
         where: {
               id: req.params.reviewImageId,
               imageableType: "Review"
            }
    })

   if (!reviewImage) {
      res.status(404);
		return res.json({
			message: "Review Image couldn't be found",
			statusCode: 404,
		});
   }


   if (review.userId === req.user.id) {
      if(reviewImage){
         await reviewImage.destroy();
         return res.json({
				message: "Successfully deleted",
				statusCode: 200,
			});
      }
   } else {
      return res.json({
			message: "Must be Authorized User",
		});
   }

})



module.exports = router;
