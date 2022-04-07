const express = require("express");
const router = express.Router({ mergeParams: true });
const catchAsync = require("../utilties/catchAsync");
const reviews = require('../controllers/reviews')
const {validateReviews, isLoggedIn, isReviewAuthor} = require('../utilties/loginMiddle')

router.post('/',isLoggedIn,validateReviews,catchAsync(reviews.createReview))

router.delete('/:reviewID', isLoggedIn, isReviewAuthor, catchAsync(reviews.deleteReview))

module.exports = router;