const Measurement = require("../models/measurement");
const User = require("../models/user");

class MeasurementController {
  // get measurements for public 
  getAll = async (req, res, next) => {
    try {
      const measurements = await Measurement.find({});
      res.render("measurementIndex", { acrobat: measurements });
    } catch (error) {
      console.log(error);
      res.redirect("/");
    }
  }
  // get measurements by user:id
  getById = async (req, res) => {

    try {
      const eba = { mode: 'measurements' }
      const measurement = await Measurement.findById(req.params.id).populate('user');
      res.render("measurementShowDetail", {measurement, eba} );
    } catch (error) {
      console.log(error);
      res.redirect("/allmeasurements");
    }
  };

  // get measurements for a specific user (for logged-in user)
  getByUser = async (req, res) => {
    try {
      const measurements = await Measurement.find({ user: req.user._id });
      if (!measurements) {
        return res.redirect('/allmeasurements');
      }
      res.render("myMeasurementIndex", { measurements });
      console.log(measurements);
    } catch (error) {
      console.log(error);
      res.render("error");
    }
  };

  // GET /measurement form to add new measurement
  getCreate = (req, res) => {
    try {
      const local = {
        mode: "Create Measurement"
      }
      // Check if user is logged in before sending measurementForm.hbs
      res.render("measurementCreateForm", local );
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
      res.render("measurementShowDetail", { measurement, mode: "just added"});
    } catch (error) {
      console.log(error);
      res.redirect("/newmeasurement");
    }
  };

  // GET /measurement to update
  getUpdate = async (req, res) => {
    try {
      const measurement = await Measurement.findById(req.params.id);
      res.render("measurementEditForm", { mode: "update", measurement });
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
  getDelete = async (req, res) => {
    try {
      const measurement = await Measurement.findById(req.params.id);
      res.render("measurementDeleteDetail", { mode: "delete", measurement });
    } catch (error) {
      console.log(error);
      res.redirect("back");
    }
  };

  // post measurement to delete
  postDelete = async (req, res) => {
    try {
      await Measurement.findByIdAndDelete(req.params.id);
      res.redirect("/mymeasurements");
    } catch (error) {
      console.log(error);
      res.redirect("/allmeasurements");
    }
  };
}

module.exports = MeasurementController;