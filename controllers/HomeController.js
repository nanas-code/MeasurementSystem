const Measurement = require("../models/measurement");

class HomeController {
  // get measurements for public 
  getAll = async (req, res, next) => {
    try {
      const measurements = await Measurement.find({});
      res.render("measurementIndex", { measurements });
    } catch (error) {
      console.log(error);
      res.render("error");
    }
  }

  about = (req, res) => {
    try {
      res.render("about")
    } catch (error) {
      console.log(error);
      res.render("error")
    }
  }

  help = (req, res) => {
    try {
      res.render("help")
    } catch (error) {
      console.log(error);
      res.render("error")
    }
  }
};

module.exports = HomeController;