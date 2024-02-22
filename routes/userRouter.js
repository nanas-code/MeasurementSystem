const express = require('express')
const userRouter = express.Router()

const UserController = require('../controllers/UserController');
const protectRoute = require('../utils/protectRoute')

const theUserController = new UserController();
const theprotectRoute = new protectRoute();

// GET Methods
userRouter.get('/register', theprotectRoute.allowif, theUserController.getCreateUser);
userRouter.get('/login', theprotectRoute.allowif,theUserController.getLoginUser);


// // POST Methods
userRouter.post('/register', theUserController.postCreateUser);
userRouter.post('/login', theUserController.postLoginUser);

// LOGOUT Method
userRouter.post('/logout', theUserController.logout);

module.exports = userRouter;