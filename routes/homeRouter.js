// Both the '/' and the '/home' routes will show the index.html page
const express = require('express')
const homeRouter = express.Router()
const HomeController = require('../controllers/HomeController')
const protectRoute = require('../utils/protectRoute')


const theHomeController = new HomeController();
const theprotectRoute = new protectRoute();

homeRouter.get('/', theprotectRoute.allowif, theHomeController.getAll)
homeRouter.get('/home', theprotectRoute.allowif, theHomeController.getAll)
homeRouter.get('/index', theprotectRoute.allowif, theHomeController.getAll)

module.exports = homeRouter;