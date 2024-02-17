const Measurement = require("../models/measurement");

class HomeController {
  // get measurements for public 
  getAll = async (req, res, next) => {
    try {
      const measurements = await Measurement.find({});
      res.render("measurementIndex", {measurements});
    } catch (error) {
      res.render("error");
    }
  }
};

  module.exports = HomeController;