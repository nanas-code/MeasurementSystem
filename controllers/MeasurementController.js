const Measurement = require("../models/measurement");
const User = require("../models/user");

class MeasurementController {
    // get measurements for public 
    getAll = async (req, res, next) => {
      try {
        const measurements = await Measurement.find({});
        res.render("measurementIndex", { measurements });
      } catch (error) {
        console.log(error);
        res.redirect("/");
      }
    }
  // get measurements by user:id
  getById = async (req, res) => {
    try {
      const local = {
        title: 'Measurement System',
        message: 'Login to create, edit or delete your measurements'
      }
      const measurement = await Measurement.findById(req.params.id).populate('user');
      if (!measurement) {
        return res.redirect('/allmeasurements');
      }
      res.render("measurementDetail", { measurement });
    } catch (error) {
      console.log(error);
      res.redirect("/allmeasurements");
    }
  };

  // get measurements for a specific user (for logged-in user)
  getByUser = async (req, res) => {
    try {
      const measurements = await Measurement.find({user: req.user._id});
      res.render("myMeasurementIndex", { measurements });
      console.log( measurements );
    } catch (error) {
      console.log(error);
      res.render("error");
    }
  };

  // GET /measurement form to add new measurement
  getCreate = async (req, res) => {
    try {
      // Check if user is logged in before sending measurementForm.hbs
      res.render("measurementForm", { mode: "Create Measurement" });
    } catch (error) {
      console.log(error);
      res.redirect("error");
    }
  };

  // POST /new measurement to add
  postCreate = async (req, res) => {
    const { place, date, value, type } = req.body;
    try {
      const measurement = await Measurement.create({
        place,
        date,
        value,
        type,
        user: req.user,
      });
      res.render("measurementDetail", {measurement});
    } catch (error) {
      console.log(error);
      res.redirect("/newmeasurement");
    }
  };

  // GET /measurement to update
  getUpdate = async (req, res) => {
    try {
      const measurement = await Measurement.findById(req.params.id);
      res.render("measurementForm", { mode: "Update", measurement });
    } catch (error) {
      console.log(error);
      res.redirect("back");
    }
  };

  // POST /measurement to update
  postUpdate = async (req, res) => {
    const { place, date, value, type } = req.body;
    try {
      await Measurement.findByIdAndUpdate(req.params.id, { place, date, value, type });
      res.redirect("/mymeasurements");
    } catch (error) {
      console.log(error);
      res.redirect("/allmeasurements");
    }
  };

  // GET /measurement to delete
  getDelete = async (req, res, next) => {
    try {
      const measurement = await Measurement.findById(req.params.id);
      if (!measurement) {
        return res.redirect("back");
      }
      const info = {
        mode: "Remove",
      }; // Assuming there's a title and body property in Measurement model
      res.render("measurementDeleteForm", info); // Assuming there's a measurementDeleteForm view
    } catch (error) {
      console.log(error);
      res.render("error");
    }
  };
  // post measurement to delete
  postDelete = async (req, res) => {
    try {
      const id = req.params.id;
      await Measurement.findByIdAndDelete(id);
      res.redirect("/");
    } catch (error) {
      console.log(error);
      res.render("error");
    }
  };
}

module.exports = MeasurementController;