const path= require('path');
const express = require('express')
const measurementsRouter = express.Router()
const protectRoute = require('../utils/protectRoute')
const MeasurementController = require('../controllers/MeasurementController')

const theMeasurementController = new MeasurementController();
const theprotectRoute = new protectRoute();

// // GET Methods /////////////////////////////////////

// measurementsRouter.get('/:id', theprotectRoute.isLoggedIn, theMeasurementController.getById);
// // measurementsRouter.get('/index', theMeasurementController.getIndex);

// This route fetch the form to fill in 
measurementsRouter.get('/measurementform', theprotectRoute.isLoggedIn, theMeasurementController.getCreate)

// // This route reads the measurements
// // This route fecth the form with the selected sn to edit
// measurementsRouter.get('/update/:id', theprotectRoute.isOwner, theMeasurementController.getUpdate)



// // POST Methods /////////////////////////////////////

// // This route sends back the form to the server
// measurementsRouter.post('/create/:id', theprotectRoute.isLoggedIn, theMeasurementController.postCreate);
// // This route send back the form with the selected sn to to the server
// measurementsRouter.post('/update/:id', theprotectRoute.isOwner, theMeasurementController.postUpdate)

// // DELETE Methods //////////////////////////////////
// // measurementsRouter.delete('/delete/:id', theMeasurementController.postdelete);

module.exports = measurementsRouter;