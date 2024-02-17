const passport = require("passport");
const flash = require('express-flash')
const chalk = require("chalk");
const User = require("../models/user");

class UserController {
  getCreateUser = (req, res, next) => {
    // GET /Render the user registeration form done!
    res.render("registerUser");
  };

  postCreateUser = (req, res, next) => {
    // POST /Register a new user done!
    const { username, password } = req.body;

    if (username === "" || password === "") {
      return res.render("registerUser", { message: "Enter a username and password" });
    }

    User.findOne({ username })
      .then(user => {
        if (user !== null) {
          return res.render("registerUser", { message: "The username already exists" });
        }
      })
      .catch(error => {
        next(error);
      });

    User.register({ username }, password)
      .then(userCreated => {
        console.log(userCreated);
        res.redirect("/login");
      })
      .catch(error => {
        next(error);
      })
  };

  // GET /login form
  getLoginUser = (req, res, next) => {
    res.render("loginUser");
  };

  // POST /login attempt
  postLoginUser = passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login",
    failureFlash: true,
  })

  // logout = (req, res) => {
  //   req.logout();
  //   res.redirect("/login");
  // };
}

module.exports = UserController;
