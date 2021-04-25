const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Review = require("./review");

const ImageSchema = new Schema({
  url: String,
  filename: String,
});

ImageSchema.virtual("thumbnail").get(function () {
  return this.url.replace("/upload", "/upload/w_150");
});

const CampgroundSchema = new Schema({
  title: String,
  images: [ImageSchema],
  lat: Number,
  geometry: {
    type: {
      type: String,
      enum: ["Point"],
      required: true,
    },
    coordinates: {
      type: [Number],
      required: true,
    },
  },
  price: Number,
  description: String,
  location: String,
  author: {
    type: Schema.Types.ObjectId, //embedding author to delete its own reviews
    ref: "User",
  },
  reviews: [
    {
      type: Schema.Types.ObjectId, //embedding review to every campground
      ref: "Review",
    },
  ],
});

CampgroundSchema.virtual("properties.popUpMarkup").get(function () {
  return 'hiii';
});
//function to delete all reviews if we delete a campground so
//all reviews of that campground deleted from mongo
CampgroundSchema.post("findOneAndDelete", async function (doc) {
  if (doc) {
    await Review.deleteMany({
      _id: { $in: doc.reviews },
    });
  }
});

module.exports = mongoose.model("Campground", CampgroundSchema);
