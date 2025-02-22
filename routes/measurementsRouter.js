// const path= require('path');
const express = require('express')
const measurementsRouter = express.Router()
const protectRoute = require('../utils/protectRoute')
const MeasurementController = require('../controllers/MeasurementController')

const theMeasurementController = new MeasurementController();
const theprotectRoute = new protectRoute();

// // GET Methods /////////////////////////////////////

measurementsRouter.get('/allmeasurements', theMeasurementController.getAll)
measurementsRouter.get('/mymeasurements', theprotectRoute.isLoggedIn, theMeasurementController.getByUser)

measurementsRouter.get('/measurement/:id', theMeasurementController.getById);

// This route fetch the form to fill in 
measurementsRouter.get('/newmeasurement', theprotectRoute.isLoggedIn, theMeasurementController.getCreate)

// This route reads the measurements
// This route fetch the form with the selected id to edit
measurementsRouter.get('/update/:id', theprotectRoute.isOwner, theMeasurementController.getUpdate)
measurementsRouter.get('/delete/:id', theprotectRoute.isOwner, theMeasurementController.getDelete)

// // POST Methods /////////////////////////////////////

// This route sends back the form to the server
measurementsRouter.post('/newmeasurement', theprotectRoute.isLoggedIn, theMeasurementController.postCreate);

// This route send back the form with the selected id to the server
measurementsRouter.post('/update/:id', theprotectRoute.isOwner, theMeasurementController.postUpdate)

// DELETE Methods //////////////////////////////////
measurementsRouter.post('/delete/:id', theprotectRoute.isOwner, theMeasurementController.postDelete);

module.exports = measurementsRouter;