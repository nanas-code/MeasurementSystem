const chalk = require("chalk");
const passport = require('./passport')

class protectRoute {
  isLoggedIn = (req, res, next) => {
    if (req.isAuthenticated()) {
      return next();
    }
    else {
      console.log(chalk.blueBright.inverse("Please login to continue"));
      res.redirect("/login");
    }

  };

  allowif = (req, res, next) => {
    if (!req.isAuthenticated()) {
      return next();
    }
    res.redirect("/")
  }

  isOwner = async (req, res, next) => {
    const measurementId =req.params.id;
    const user = req.user;
    try {
      const measurement = await Measurement.findById(measurementId);
      if (!measurement) {
        return res.status(404).json({ message: 'Measurement not found' });
      }
  
      if (measurement.userId.toString() !== user._id.toString()) {
        return res.status(403).json({ message: 'Unauthorized: Not owner of measurement' });
      }
  
      next();
    } catch (error) {
      res.status(500).json({ message: 'Error checking measurement ownership' });
    }
  }
}

module.exports = protectRoute;
