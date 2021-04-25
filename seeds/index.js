//dependencies
const mongoose = require("mongoose");
const Campground = require("../models/campground");
const cities = require("./cities");
const { places, descriptors } = require("./seedHelpers");
//database mongoose connection code
mongoose.connect("mongodb://localhost:27017/yelp", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
  console.log("Seeds Db connected successfully!");
});

//function to get random title for camp grounds
const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
  await Campground.deleteMany({});
  for (let i = 0; i < 50; i++) {
    const randomNav = Math.floor(Math.random() * 1000);
    const price = Math.floor(Math.random() * 20) + 10;
    const camp = new Campground({
      author: "608578bc937ce41b5804c7b9",
      location: `${cities[randomNav].city},${cities[randomNav].state}`,
      title: `${sample(descriptors)} ${sample(places)}`,
      images: [
        {
          url:
            "https://res.cloudinary.com/dkcjk7pcv/image/upload/v1618773262/YelpCamp/jrhderzpcvlr2dopnn0j.jpg",
          filename: "YelpCamp/jrhderzpcvlr2dopnn0j",
        },
        {
          url:
            "https://res.cloudinary.com/dkcjk7pcv/image/upload/v1618773262/YelpCamp/ov6vi1dvi176qzowtvrr.jpg",
          filename: "YelpCamp/ov6vi1dvi176qzowtvrr",
        },
      ],
      price,
      geometry:{
        type:'Point',
        coordinates:[
          cities[randomNav].longitude,
          cities[randomNav].latitude
        ]
      },
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In at sapien placerat, aliquam ligula eget, dapibus justo. Phasellus fringilla fringilla lectus. Nam eget purus felis. Proin ullamcorper nisi quis sapien malesuada placerat. Curabitur molestie blandit lacinia. Maecenas eleifend sapien placerat ante bibendum eleifend.",
    });
    await camp.save();
  }
};

seedDB().then(() => {
  mongoose.connection.close();
});
