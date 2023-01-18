const express = require("express");
const {setTokenCookie, requireAuth} = require("../../utils/auth");
const {Spot} = require("../../db/models");
const {check} = require("express-validator");
const {handleValidationErrors} = require("../../utils/validation");
const { Model } = require("sequelize");
const router = express.Router();

//Get all Spots
router.get('/', async (req, res) => {
   const spots = await Spot.findAll()

   res.json({spots})
})


//Get all Spots owned by the Current User
router.get('/current', async (req, res) => {
   const spots = await Spot.findAll({
      where: {
         ownerId: req.user.Id
      }
   })

   res.json({spots})
})


//Get details of a Spot from an id
router.get('/:id', async (req, res) => {
   const spots = await Spot.findOne({
      where: {
         id: req.params.id
      }
   })

   if (spots) {
		res.json(spots);
   } else {
		next({
			status: "not-found",
			message: `Could not find spot ${req.params.id}`,
			details: "Spot not found",
		});
   }
})






module.exports = router;
