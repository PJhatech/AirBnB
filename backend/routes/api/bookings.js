/** @format */

const express = require("express");
const {setTokenCookie, requireAuth} = require("../../utils/auth");
const {Spot, Image, User, Review, Booking} = require("../../db/models");
const {check} = require("express-validator");
const {handleValidationErrors} = require("../../utils/validation");
const { Model } = require("sequelize");
const {Op} = require("sequelize");
const sequelize = require("sequelize");
const router = express.Router();

//Get all of the Current User's Bookings
router.get("/current", requireAuth, async (req, res) => {
	const Bookings = await Booking.findAll({
		where: {userId: req.user.id},
		include: [
			{
				model: Spot,
				attributes: {
					exclude: ["createdAt", "updatedAt"],
				},
			},
		],
	});

	for await (let booking of Bookings) {
		const previewImages = await Image.findAll({
			where: {
				imageableType: "Spot",
				imageableId: booking.dataValues.Spot.id,
				preview: true,
			},
			attributes: ["url"],
		});

		if (previewImages.length) {
			const image = previewImages.map((value) => value.url);
			booking.dataValues.Spot.dataValues.previewImage = image[0];
		} else {
			booking.dataValues.Spot.dataValues.previewImage = "No Image Url";
		}
	}

	res.json({Bookings});
});



//Edit a Booking
router.put("/:bookingId", requireAuth, async (req, res) => {
   const { startDate, endDate } = req.body
   const test = await Date.now()
   const booked = await Booking.findOne({
		where: {
			[Op.or]: [
				{
					startDate: {[Op.between]: [startDate, endDate]},
				},
				{
					endDate: {[Op.between]: [startDate, endDate]},
				},
			],
		},
	});
   const booking = await Booking.findOne({
      where: { id: req.params.bookingId }
   })

   if (!booking) {
      res.status(404)
   	return  res.json({
			message: "Booking couldn't be found",
			statusCode: 404,
		});
   }

      if (booking.endDate > test) {
         if (booked) {
            res.status(403)
            return res.json({
					message:
						"Sorry, this spot is already booked for the specified dates",
					statusCode: 403,
					errors: [
						"Start date conflicts with an existing booking",
						"End date conflicts with an existing booking",
					],
				});
         }

         if (!booked) {
            await booking.update({
               startDate: startDate,
               endDate: endDate
            })
            return res.json(booking)
         } else {
            res.status(400)
            return res.json({
               message: "Validation error",
               statusCode: 400,
               errors: ["endDate cannot come before startDate"],
            });
         }

      } else {
         return res.json({
				message: "Past bookings can't be modified",
				statusCode: 403,
			});
   }

});



//Delete a Booking
router.delete('/:bookingId', requireAuth, async (req, res) => {
	const test = await Date.now()
   const booked = await Booking.findOne({
      where: {userId: req.user.id}
   })
   const booking = await Booking.findOne({
        where: {id: req.params.bookingId}
	})

	if (!booked) {
		res.status(404)
		return res.json({
			message: "Booking couldn't be found",
			statusCode: 404,
		})
	}


	if (booking >= test) {
		return res.json({
			message: "Bookings that have been started can't be deleted",
			statusCode: 403,
		});
	}

   if (booked.userId === req.user.id) {
		if (booking) {
			await booking.destroy();
			return res.json({
				message: "Successfully deleted",
				statusCode: 200,
			});
		}
	} else {
		res.json({
			message: "Must be Authorized User"
		})
	}

})


module.exports = router;
