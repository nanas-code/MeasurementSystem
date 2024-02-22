//  * Module dependencies.
require('dotenv').config();
const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");

const http = require("http"); // This module creates the 'raw' http server, to which we connect the express app, see below.
const chalk = require('chalk');
const flash = require('express-flash');
const favicon = require("serve-favicon");
const hbs = require('hbs');
const connectDB = require('./utils/db');

//Routers
const homeRouter = require("./routes/homeRouter");
const userRouter = require("./routes/userRouter");
const measurementsRouter = require("./routes/measurementsRouter");

const session = require('express-session');
const passport = require("passport");

const User = require("./models/user");

/**
 * Our own module dependecies, like utilities, converters, language and so on
*/
// pick only the following ones, could be more available
const { normalizePort, onError, onListening } = require("./utils/serverUtilities.js");

/**
 * Pick out the static web content folder
*/
const publicDirectoryPath = path.join(__dirname, "./public");

//  * Create the express web part and connect the modules that is will use
//  * Express is a routing and middleware web framework that has minimal functionality of its own:
//  * An Express application is essentially a series of middleware function calls.

const app = express(); // Creates an Express web application. The express() function is a top-level function exported by the express module.

// view engine setup
// We change some of the default values, you do not need to, use your conventions.
// We change the default extension name from .handlebars to .hbs.

hbs.registerPartials(__dirname + '/views/partials');
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");

// middlewares
app.use(logger("dev"));
// parse application/json
app.use(express.json());
// parse application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: false }));
app.use(flash())

app.use(cookieParser());
app.use(express.static(publicDirectoryPath));
app.use(favicon(path.join(publicDirectoryPath, "favicon.ico")));

// session setup
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Connect to DB
connectDB();

//  * Middleware request handlers
//  * They need to be in the correct order, ie the request is passed true them in the order they are defined.
//  * So, first the ones we define, and last the error handlers

// ===================================================
// HERE WE SHALL HAVE OUR HANDLERS, which we add
// ===================================================

//Connect routes from router to app
app.use("/", homeRouter);
app.use("/", userRouter);
app.use("/", measurementsRouter);

// ===================================================
// Error handlers
// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler for everything else
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

// ===================================================
// Get port from environment and store in Express.
// Set the DEBUG environment value so that the debug package shows the output
const port = normalizePort(process.env.PORT || "4123");
app.set("port", port); // all object that we set on the express app is readable from the requests

// Create HTTP server.
const server = http.createServer(app); // Here the real server is created with the express app

// Listen on provided port, on all network interfaces.
server.listen(port, console.log(chalk.red.inverse(`Server listening on port: ${port}`)));
server.on("error", onError); // connect the SERVER error handler not the request error handling!
server.on("listening", onListening); // what to call when listening, ie server up and running