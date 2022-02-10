const express = require('express');
const asyncHandler = require('express-async-handler');
const { check } = require('express-validator');

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { handleValidationErrors } = require('../../utils/validation');


const csurf = require('csurf');
const csrfProtection = csurf({ cookies: true });


const { Spot, User } = require('../../db/models');




const router = express.Router();

// const SpotRepository = require('../../db/spot-repository');




router.get('/', asyncHandler(async function (_req, res) {

  const spot = await Spot.findAll();

  return res.json(spot);

}));


// backend/routes/api/users.js

const validatePost = [
  check('address')
    .exists({ checkFalsy: true })
    .isLength({ min: 1 })
    .withMessage('Please provide a valid address.'),
  check('city')
    .exists({ checkFalsy: true })
    .isLength({ min: 1 })
    .withMessage('Please provide a valid City.'),
  check('state')
    .exists({ checkFalsy: true })
    .isLength({ min: 1 })
    .withMessage('Please provide a valid State.'),
  handleValidationErrors
];


// Sign up
router.post(
  '/',
  validatePost,

  asyncHandler(async (req, res) => {

    const { address, city, state, country, name, price, userId } = req.body;

    const spot = await Spot.create({ address, city, state, country, name, price, userId });

    return res.json({
      spot
    });
  }),
);



module.exports = router;