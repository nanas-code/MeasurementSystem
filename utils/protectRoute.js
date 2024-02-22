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
    res.redirect("/")
  }

  isOwner = async (req, res, next) => {
    const measurementId = req.params.id;
    const user = req.user;
    try {
      const measurement = await Measurement.findById(measurementId);
      if (!measurement) {
        return res.status(404).render('error', { message: 'Measurement not found' });
      }

      if (measurement.user.toString() !== user._id.toString()) {
        return res.status(403).render('error', { message: 'Unauthorized: Not owner of measurement' });
      }

      next();
    } catch (error) {
      res.status(500).render('error', { message: 'Error checking measurement ownership' });
    }
  }
}

module.exports = protectRoute;
