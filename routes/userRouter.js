const express = require('express')
const userRouter = express.Router()

const UserController = require('../controllers/UserController');
const protectRoute = require('../utils/protectRoute')

const theUserController = new UserController();
const theprotectRoute = new protectRoute();

// GET Methods
userRouter.get('/register', theUserController.getCreateUser);
userRouter.get('/login', theUserController.getLoginUser);


// // POST Methods
userRouter.post('/register', theUserController.postCreateUser);
userRouter.post('/login', theUserController.postLoginUser);

// // LOGOUT Method
// userRouter.get('/logout', theprotectRoute.isLoggedIn, theUserController.logout);

module.exports = userRouter;