const express = require("express");
const router = express.Router();

const catchAsync = require("../utils/catchAsync");
const campgrounds = require("../controllers/campgrounds");
const { isLoggedIn, isAuthor, validateCampground } = require("../middleware");
const multer = require("multer");
const { storage } = require("../cloudinary");
const upload = multer({ storage });

//grouping toghter routes with same name

router
  .route("/")
  .get(catchAsync(campgrounds.index))
  .post(
    isLoggedIn,
    upload.array("image"),
    validateCampground,
    catchAsync(campgrounds.createCamp)
  );
//new campground
router.get("/new", isLoggedIn, campgrounds.newForm);

router
  .route("/:id")
  .get(isLoggedIn, catchAsync(campgrounds.displayCamp))
  .put(
    isLoggedIn,
    isAuthor,
    upload.array('image'),
    validateCampground,
    catchAsync(campgrounds.updateCamp)
  )
  .delete(isLoggedIn, catchAsync(campgrounds.deleteCamp));

//edit a campground
router.get("/:id/edit", isLoggedIn, isAuthor, catchAsync(campgrounds.editCamp));

//index page
// router.get("/", catchAsync(campgrounds.index));

//create a new campground
// router.post(
//   "/",
//   validateCampground,
//   isLoggedIn,
//   catchAsync(campgrounds.createCamp)
// );

//display page route for each campground
// router.get("/:id", isLoggedIn, catchAsync(campgrounds.displayCamp));

//update a campground
// router.put(
//   "/:id",
//   isLoggedIn,
//   isAuthor,
//   validateCampground,
//   catchAsync(campgrounds.updateCamp)
// );

//delete a campground
// router.delete("/:id", isLoggedIn, catchAsync(campgrounds.deleteCamp));

module.exports = router;
