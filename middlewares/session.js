// jshint esversion:9

"use strict";

const session = require("express-session");
const Sessions = require("../models/sessions");

Sessions.sync();

module.exports = session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  store: Sessions,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 * 7 * 2, // 2 weeks in milliseconds (2 weeks) * 24 hours in a day * 7 days in a week * 1000 milliseconds in a second
  },
});
