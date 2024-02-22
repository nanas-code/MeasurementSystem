const Measurement = require("../models/measurement");

class HomeController {

  homePage = (req, res) => {
    try {
      const local = {
        title: 'Measurement System',
        message: 'Login to create, edit or delete your measurements'
      }
      res.render('home', local )
    } catch (error) {
      console.log(error);
      res.render("error")
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