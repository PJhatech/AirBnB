const express = require("express");
const {setTokenCookie, requireAuth} = require("../../utils/auth");
const {Spot, Image, User, Review, Booking} = require("../../db/models");
const {check} = require("express-validator");
const {handleValidationErrors} = require("../../utils/validation");
const { Model } = require("sequelize");
const booking = require("../../db/models/booking");
const image = require("../../db/models/image");
const spot = require("../../db/models/spot");
const review = require("../../db/models/review");
const user = require("../../db/models/user");
const router = express.Router();



//Get all of the Current User's Bookings
router.get('/current', requireAuth, async (req, res) => {
   const Bookings = await Booking.findAll({
      where: { userId: req.user.id },
      include: {
         model: Spot,
         attributes: {
            exclude: ['createdAt', 'updatedAt']
         }
      }
   })

    res.json({Bookings})

});



// //Get all Bookings for a Spot based on the Spot's id
// router.get('/spot/:spotId/bookings', requireAuth, async (req, res) => {
//    const spot = await Spot.findAll({
//       where: { id: req.params.spotId }
//    })

//    res.json({spot})
// })





module.exports = router;
