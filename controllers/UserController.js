const passport = require("passport");
const flash = require("express-flash");
const chalk = require("chalk");
const User = require("../models/user");

class UserController {
  getCreateUser = (req, res, next) => {
    // GET /Render the user registeration form done!
    res.render("registerUser", {});
  };

  postCreateUser = (req, res, next) => {
    // POST /Register a new user done!
    const { username, password } = req.body;
    User.register(new User({ username }), password, (error, user) => {
      if (error) {
        req.flash('error', 'User exists');
        return res.render('registerUser', { error, username });
      }
      const authenticator = passport.authenticate("local", (error, user, info) => {
        if (error) {
          return next(error);
        }
        if (!user) {
          
          res.render('registerUser', { error: info, username });
          req.flash('error', 'User not found');
          return;
        }
        req.login(user, (err) => {
          if (err) {
            return next(err);
          }
          res.locals.currentUser = req.user;
          res.redirect('/')
        });
      });
      authenticator(req, res, next);
    });

  };


  getLoginUser = (req, res, next) => {
    // GET /login form
    res.render("loginUser", { user: req.session.user });
  };


  postLoginUser = (req, res, next) => {
    // POST /login attempt
    const { username, password } = req.body;

    passport.authenticate("local", (err, user, info) => {
      if (err) {
        return next(err);
      }
      if (!user) {
        // Authentication failed, redirect to login page with flash message        
        req.flash('error', 'User not found');
        return res.redirect("/login");

      }
      req.login(user, (err) => {
        if (err) {
          return next(err);
        }
        // Authentication successful, redirect to home page or wherever you want
        res.locals.currentUser = req.user;
        return res.redirect("/");
      });
    })(req, res, next);;
  };

  logout = (req, res, next) => {
    
    req.logout((error) => {
      if (error) {
        console.log(error);
        return next(error);
      }
      req.session.destroy();
      res.redirect("/");
    });
  }
}

module.exports = UserController;