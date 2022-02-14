const express = require('express');
const asyncHandler = require('express-async-handler');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { setTokenCookie } = require('../../utils/auth');

const { User, Spot, Review } = require('../../db/models');


const router = express.Router();

//Reviews Validator
const validateReviews = [
    check('review')
        .exists({ checkFalsy: true })
        .withMessage('Please add a review before submitting.')
        .isLength({ max: 10000 })
        .withMessage('Review must not be more than 10000 characters long'),
    handleValidationErrors
];


//Get all reviews for spot by id (done)
router.get('/spot/:id', asyncHandler(async (req, res) => {
    const reviews = await Review.findAll({ include: User, where: { spotId: req.params.id } });
    return res.json(reviews);
}));

//Get all Reviews (done)
router.get('/', asyncHandler(async (req, res) => {
    const reviews = await Review.findAll({ include: User });
    return res.json(reviews)
}))

// Edit a review for spot

router.put('/:id', asyncHandler(async (req, res) => {

    const { id, review, userId, spotId } = req.body

    let parseUserId = parseInt(userId, 10)
    let parseSpotId = parseInt(spotId, 10)

    let updatedReview = await Review.update({
        review,
        userId: parseUserId,
        spotId: parseSpotId
    }, {
        where: { id }
    })

    updatedReview = await Review.findByPk(id, { include: { model: User } })

    return res.json(
      updatedReview
    );
}))


//
// router.put('/:id', validatePost, asyncHandler(async (req, res) => {

//   const { address, city, state, country, name, price, userId, id } = req.body;

//   let spot = await Spot.update({
//     address,
//     city,
//     state,
//     country,
//     name,
//     price,
//     userId
//   }, { where: { id } })

//   spot = await Spot.findByPk(id,
//     { include: { model: User } })

//   return res.json(
//     spot
//   );

// }));


//Posting a Review to a Spot

router.post('/spot/:id', validateReviews, asyncHandler(async (req, res) => {
    const { review, userId, spotId } = req.body;

    let parseUserId = parseInt(userId, 10);

    let parseSpotId = parseInt(spotId, 10);

    const createdReview = await Review.create({
        review,
        spotId: parseSpotId,
        userId: parseUserId
    }, {
        include: { model: User }
    })

    const user = await User.findByPk(parseUserId)

    createdReview.dataValues.User = user

    return res.json(
      createdReview
    );
}))


//Deleting a Review

router.delete('/:id', asyncHandler(async (req, res) => {

    const id = parseInt(req.params.id, 10)

    const review = await Review.findByPk(id)

    await review.destroy()

    return res.json(review)
}))


module.exports = router;
