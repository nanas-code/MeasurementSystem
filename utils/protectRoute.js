const chalk = require("chalk");
const passport = require('passport')
const Measurement = require('../models/measurement')

class protectRoute {
  isLoggedIn = (req, res, next) => {
    if (req.isAuthenticated()) {
      return next();
    }
    else {
      console.log(chalk.blueBright.inverse("Please login to continue"));
      req.flash('error', 'Please login to continue');
      res.redirect('/')
    }

  };

  allowif = (req, res, next) => {
    if (!req.isAuthenticated()) {
      return next();
    }
    else {
      console.log(chalk.blueBright.inverse("You are logged in"));
      req.flash('error', 'You are logged in');
      res.redirect("/")
    }
  }

  isOwner = async (req, res, next) => {
    if (req.isAuthenticated()) {
      try {
        const measurement = await Measurement.findById(req.params.id);
        if (measurement.user.equals(req.user._id)) {
          next();
        }else {
          res.redirect('back')
        }
      } catch (error) {
        res.render('error', { message: 'Error checking measurement ownership' });
      }
    }else {
      res.redirect('back')
    }
  }
}
module.exports = protectRoute;
