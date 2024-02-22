const passport= require("passport");
const LocalStrategy = require('passport-local').Strategy;
const User = require("../models/user");

passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
