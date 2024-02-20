const path= require('path');
const express = require('express')
const measurementsRouter = express.Router()
const protectRoute = require('../utils/protectRoute')
const MeasurementController = require('../controllers/MeasurementController')

const theMeasurementController = new MeasurementController();
const theprotectRoute = new protectRoute();

// // GET Methods /////////////////////////////////////

measurementsRouter.get('/measurements/:id', theprotectRoute.isLoggedIn, theMeasurementController.getById);

// This route fetch the form to fill in 
measurementsRouter.get('/measurementform', theprotectRoute.isLoggedIn, theMeasurementController.getCreate)

// This route reads the measurements
// This route fecth the form with the selected id to edit
measurementsRouter.get('/update/:id', theprotectRoute.isOwner, theMeasurementController.getUpdate)



// // POST Methods /////////////////////////////////////

// This route sends back the form to the server
measurementsRouter.post('/measurementform', theprotectRoute.isLoggedIn, theMeasurementController.postCreate);

// This route send back the form with the selected id to the server
measurementsRouter.post('/update/:id', theprotectRoute.isOwner, theMeasurementController.postUpdate)

// DELETE Methods //////////////////////////////////
measurementsRouter.delete('/delete/:id', theMeasurementController.postDelete);

module.exports = measurementsRouter;