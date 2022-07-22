const express = require('express');
const router = express.Router();

const asyncHandler = require('express-async-handler');
const { check } = require('express-validator');

const { requireAuth, setTokenCookie, restoreUser } = require('../../utils/auth');
const { handleValidationErrors } = require('../../utils/validation');
const { User, Booking, Spot} = require('../../db/models');


router.get(
  "/",
  asyncHandler(async (req, res) => {
    const bookings = await Booking.findAll({ include: { model: Spot } });
    return res.json(bookings);
  })
);


router.get(
  "/:id",
  asyncHandler(async (req, res) => {
    const bookings = await Booking.findAll({
      where: {
      userId: req.params.id
    }, include: { model: Spot } });
    return res.json(bookings);
  })
);


router.post(
  "/",
  requireAuth,
  asyncHandler(async (req, res) => {
    const { spotId, userId, startDate, endDate } = req.body;

    const booking = await Booking.create(req.body);

    const spot = await Spot.findByPk(spotId)

    booking.dataValues.Spot = spot

    return res.json(booking);

  })
);



//Delete booking

router.delete('/:id', asyncHandler(async (req, res) => {

  const id = parseInt(req.params.id, 10)

  const booking = await Booking.findByPk(id)

  await booking.destroy()

  return res.json(booking)
}))


module.exports = router;
