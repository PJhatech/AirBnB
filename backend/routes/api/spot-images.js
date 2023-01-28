
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


//Delete a Spot Image
router.delete('/:spotImageId', requireAuth, async (req, res) => {
   const spot = await Spot.findOne({
      where: {ownerId: req.user.id}
   })
   const spotImage = await Image.findOne({
         attributes: {
            imageableId: req.params.spotImageId,
            imageableType: "Spot"
         }
   })

  
   if (spot.ownerId === req.user.id) {
      if(spotImage){
         await spotImage.destroy();
         res.json({
				message: "Successfully deleted",
				statusCode: 200,
			});
      } else {
         res.status(404)
         res.json({
				message: "Spot Image couldn't be found",
				statusCode: 404,
			});
      }
   }

})












module.exports = router;
