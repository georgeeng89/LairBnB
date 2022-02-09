const express = require('express');
const asyncHandler = require('express-async-handler');

const { Spot } = require('../../db/models');

const router = express.Router();

// const SpotRepository = require('../../db/spot-repository');




router.get('/', asyncHandler(async function (_req, res) {

  const spot = await Spot.findAll();

  return res.json(spot);

}));


module.exports = router;
