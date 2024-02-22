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
require('./utils/passportConfig');

// pick only the following ones, could be more available
const { normalizePort, onError, onListening } = require("./utils/serverUtilities.js");

/**
 * Pick out the static web content folder
*/
const publicDirectoryPath = path.join(__dirname, "./public");

const app = express(); // Creates an Express web application.

// view engine setup
hbs.registerPartials(__dirname + '/views/partials');
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");

// middlewares
app.use(logger("dev"));
app.use(express.json()); // parse application/json
app.use(express.urlencoded({ extended: false })); // parse application/x-www-form-urlencoded
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

// Connect to DB
connectDB();

// Middleware to set current user in locals for Handlebars
app.use((req, res, next) => {
  res.locals.currentUser = req.user;
  next();
  console.log(req.user);
});

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