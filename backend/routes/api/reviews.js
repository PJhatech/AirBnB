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
         userId: req.user.id
        }
   })

   res.json(userReviews)
})







module.exports = router;
