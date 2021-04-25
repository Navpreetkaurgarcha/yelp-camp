const express = require("express");
const router = express.Router({ mergeParams: true });

const reviews = require("../controllers/reviews");
const catchAsync = require("../utils/catchAsync");
const { validateReview, isLoggedIn, isReviewAuthor } = require("../middleware");

//post request for adding a review
router.post("/", isLoggedIn, validateReview, catchAsync(reviews.createReview));

//delete a reveiw
router.delete(
  "/:reviewId",
  isLoggedIn,
  isReviewAuthor,
  catchAsync(reviews.deleteReview)
);

module.exports = router;
