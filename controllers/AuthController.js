const passport = require("passport");
const bcrypt = require("bcrypt");
const User = require("../ models/User");

let getLogin = (req, res) => {
  if (!req.isAuthenticated()) res.render("auth/login");
  else res.redirect("/profile");
};

let postLogin = (req, res, next) => {
  passport.authenticate("local", {
    successRedirect: "/profile",
    failureRedirect: "/auth/signup",
  })(req, res, next);
};

let getSignup = (req, res) => {
  if (!req.isAuthenticated()) res.render("auth/signup", { message: "" });
  else res.redirect("/profile");
};

let postSignup = (req, res) => {
  let message = "";
  let user = new User({
    username: req.body.username.trim(),
    password: bcrypt.hashSync(req.body.password.trim(), 10),
    email: req.body.email.trim(),
  });
  User.findOne({ username: user.username })
    .then((data) => {
      if (!data) {
        User.findOne({ email: user.email })
          .then((data) => {
            if (!data) {
              return user.save();
            } else {
              message = "Email has already been used";
              return res.render("auth/signup", { message });
            }
          })
          .then((result) => {
            passport.authenticate("local")(req, res, () => {
              res.redirect("/profile");
            });
          })
          .catch((err) => res.send(err.message));
      } else {
        message = "Username has already been used";
        return res.render("auth/signup", {
          message,
        });
      }
    })
    .catch((err) => res.send(err.message));
};

let getLogout = (req, res) => {
  if (req.isAuthenticated()) {
    req.logout();
    res.redirect("/");
  } else {
    res.redirect("/auth/login");
  }
};

let serializeUser = (user, done) => {
  done(null, user.username);
};

let deserializeUser = (username, done) => {
  User.findOne({ username: username })
    .then((user) => {
      return done(null, user);
    })
    .catch(done);
};

let authenticate = (username, password, done) => {
  User.findOne({ username: username.trim() })
    .then((user) => {
      if (!user) {
        return done(null, false);
      }
      if (bcrypt.compareSync(password.trim(), user.password)) {
        return done(null, user);
      } else return done(null, false);
    })
    .catch(done);
};

module.exports = {
  getLogin,
  postLogin,
  getSignup,
  postSignup,
  getLogout,
  serializeUser,
  deserializeUser,
  authenticate,
};
