const path = require("path");
const Measurement = require("../models/measurement");
const User = require("../models/user");
const passport = require("passport");

class MeasurementController {
  // // get measurements by user:id
  // getById = async (req, res) => {
  //   try {
  //     const measurement = await Measurement.findById(req.params.id);
  //     res.render("measurementDetail", { measurement });
  //   } catch (error) {
  //     res.render("error");
  //   }
  // };

  // // get measurements for a specific user (for logged-in user)
  // getByUser = async (req, res) => {
  //   try {
  //     const measurements = await Measurement.find({ user: req.user})
  //     res.render(measurements)
  //   }
  //   catch (error) {
  //     console.log('error');
  //   }
  // }

  // GET /measurement form to add new measurement
  getCreate = async (req, res) => {
    try {
      // Check if user is logged in before sending measurementForm.hbs
      const info = { mode: "Add new measurement" };
      res.render("measurementForm", info);
    } catch (error) {
      console.log(error);
      res.redirect("/login");
    }
  };

  // // POST /new measurement to add
  // postCreate = async (req, res) => {
  //   const { place, date, value, type } = req.body;
  //   try {
  //     (req, res) => {
  //       const measurement = Measurement.save({ place, date, value, type, user: req.user });
  //       res.render("measurementIndex", { measurement });
  //     }
  //   } catch (error) {
  //     console.log(error);
  //     res.redirect("/");
  //   }
  // };

  // // GET /measurement to update
  // getUpdate = async (req, res) => {
  //   try {
  //     const measurement = await Measurement.findById(req.params.id);
  //     res.render("measurementForm", { mode: "Update", measurement });
  //   } catch (error) {
  //     console.log(error.message);
  //     res.render("error");
  //     res.redirect("back");
  //   }
  // };

  // // POST /measurement to update
  // postUpdate = async (req, res) => {
  //   try {
  //     const id = req.params.id;
  //     await Measurement.findByIdAndUpdate(id, req.body);
  //     res.redirect("/");
  //   } catch (error) {
  //     res.render(error);
  //   }
  // };

  // // GET /measurement to delete
  // getDelete = async (req, res, next) => {
  //   try {
  //     // The req ALWAY contain the unique instance app so all data that we put there is accessable
  //     // Here we just check that a user is inlogged and of 'type' admin. Simulated
  //     if (come) {
  //       const measurement = req.params.user;

  //       const selectedNote = this.noteManager.getNoteByPlace(place);
  //       if (selectedNote) {
  //         const info = { mode: "Remove" };
  //         //Have made a separate form for removal
  //         res.render("notes/noteDeleteForm", {
  //           mode: info.mode,
  //           title: selectedNote.title,
  //           body: selectedNote.body,
  //         });
  //       } else res.redirect("back");
  //     } else {
  //       res.redirect("back");
  //     }
  //   } catch (error) {
  //     res.render(error);
  //   }
  // };
  // // post measurement to delete
  // postDelete = async (req, res) => {
  //   try {

  //   } catch (error) {
  //     res.render(error);
  //   }
  // };
}

module.exports = MeasurementController;
