const User = require("../models/user");

module.exports.registerForm = async (req, res) => {
  res.render("users/register");
};

module.exports.registerUser = async (req, res, next) => {
  try {
    const { email, username, password } = req.body;
    const user = new User({ email, username });
    const registerUser = await User.register(user, password);
    req.login(registerUser, (err) => {
      if (err) return next(err);
    });
    req.flash("success", "Welcome to yelp camp!!");
    res.redirect("/campgrounds");
  } catch (e) {
    req.flash("error", e.message);
    res.redirect("/register");
  }
};

module.exports.loginForm = (req, res) => {
  res.render("users/login");
};

module.exports.login = (req, res) => {
  req.flash("success", "Welcome back");
  const redirectUrl = req.session.retunTo || "/campgrounds";
  delete req.session.returnTo;
  res.redirect(redirectUrl);
};

module.exports.logout = (req, res) => {
  req.logout();
  req.flash("success", "Successfully logout!!!");
  res.redirect("/login");
};
