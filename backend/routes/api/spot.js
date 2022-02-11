const express = require('express');
const asyncHandler = require('express-async-handler');
const { check } = require('express-validator');
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { handleValidationErrors } = require('../../utils/validation');
const csurf = require('csurf');

// const csrfProtection = csurf({ cookies: true });

const { Spot, User } = require('../../db/models');

const router = express.Router();

const validatePost = [
  check('address')
    .exists({ checkFalsy: true })
    .notEmpty()
    .withMessage('Please provide a valid address.'),
  check('city')
    .exists({ checkFalsy: true })
    .notEmpty()
    .withMessage('Please provide a valid City.'),
  check('state')
    .exists({ checkFalsy: true })
    .notEmpty()
    .withMessage('Please provide a valid State.'),
  check('country')
    .exists({ checkFalsy: true })
    .notEmpty()
    .withMessage('Please provide a valid Country.'),
  check('name')
    .exists({ checkFalsy: true })
    .notEmpty()
    .withMessage('Please provide a valid Name.'),
  check('price')
    .exists({ checkFalsy: true })
    .notEmpty()
    .withMessage('Please provide a valid Price.'),
  handleValidationErrors
];


// Get all Spots
router.get('/', asyncHandler(async function (_req, res) {
  const spot = await Spot.findAll();
  return res.json(spot);
}));



// Post a spot
router.post(
  '/',
  validatePost,
  asyncHandler(async (req, res) => {
    const { address, city, state, country, name, price, userId } = req.body;
    const spot = await Spot.create(
      { address, city, state, country, name, price, userId },
      {
        include: { model: User }
      })
    return res.json({
      spot
    });
  }),
);

// router.put(
//   '/:id',
//   validatePost,
//   asyncHandler(async function (req, res) {
//     const id = await PokemonRepository.update(req.body);
//     const pokemon = await PokemonRepository.one(id);
//     return res.json(pokemon);
//   })
// );

router.get('/:id', asyncHandler(async (req, res) => {

  const spot = await Spot.findByPk(req.params.id, { include: { model: User } })

  return res.json(spot);

}))




//EDITING A POST

router.put('/:id', validatePost, asyncHandler(async (req, res) => {

  const { address, city, state, country, name, price, userId, id } = req.body;


  let spot = await Spot.update({
    address,
    city,
    state,
    country,
    name,
    price,
    userId
  },{ where: { id } })

  spot = await Spot.findByPk(id,
    { include: { model: User } })

  return res.json(
    spot
  );

}));

module.exports = router;
