const { campgroundSchema ,reviewSchema} = require("./schemas.js");
const ExpressError = require("./utils/ExpressError");
const Campground = require("./models/campground");
const Review =require('./models/review');

module.exports.isLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    //when user log in successfully so let the user stay on requested page
    req.session.returnTo = req.originalUrl;
    req.flash("error", "You must login to register for a campground.");
    return res.redirect("/login");
  }
  next();
};

module.exports.validateCampground = (req, res, next) => {
  const { error } = campgroundSchema.validate(req.body);
  // console.log(req.body);
  if (error) {
      const msg = error.details.map(el => el.message).join(',')
      throw new ExpressError(msg, 400)
  } else {
      next();
  }
}

module.exports.isAuthor=async(req,res,next)=>{
  const { id } = req.params;
  const campground = await Campground.findById(id);
  if (!campground.author.equals(req.user._id)) {
    req.flash("error", "Not authorized to update this campground.");
    return res.redirect(`/campgrounds/${id}`);
  }else{
    next();
  }

}

module.exports.validateReview = (req, res, next) => {
  const { error } = reviewSchema.validate(req.body);
  if (error) {
    const msg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(msg, 400);
  } else {
    next();
  }
};


module.exports.isReviewAuthor=async(req,res,next)=>{
  const { id,reviewId } = req.params;
  const review = await Review.findById(reviewId);
  if (!review.author.equals(req.user._id)) {
    req.flash("error", "Not authorized to delete this review.");
    return res.redirect(`/campgrounds/${id}`);
  }else{
    next();
  }

}