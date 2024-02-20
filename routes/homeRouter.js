// Both the '/' and the '/home' routes will show the index.html page
const express = require('express')
const homeRouter = express.Router()
const HomeController = require('../controllers/HomeController')
const protectRoute = require('../utils/protectRoute')


const theHomeController = new HomeController();
const theprotectRoute = new protectRoute();

homeRouter.get('/', theHomeController.getAll)
homeRouter.get('/home', theHomeController.getAll)
homeRouter.get('/measurementIndex', theHomeController.getAll)

homeRouter.get('/about', theHomeController.about)
homeRouter.get('/help', theHomeController.help)

module.exports = homeRouter;