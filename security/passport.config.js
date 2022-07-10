// jshint esversion:9

"use strict";

const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const User = require("../models/users");

const strategy = new LocalStrategy(
  { usernameField: "username", passwordField: "password" },
  (username, password, done) => {
    User.findOne({ where: { username: username } })

      .then((user) => {
        if (!user) {
          return done(null, false, { message: "Incorrect username." });
        }
        if (!User.validatePassword(password, user.password)) {
          return done(null, false, { message: "Incorrect password." });
        }
        return done(null, user);
      })

      .catch((err) => {
        return done(err);
      });
  }
);

// Add authentication middleware
passport.use(strategy);

// put user id in the session
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// remove user id from the session
passport.deserializeUser((userId, done) => {
  User.findByPk(userId)
    .then((user) => {
      done(null, user);
    })
    .catch((err) => {
      done(err);
    });
});
