// jshint esversion:9

"use strict";

const express = require("express");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const session = require("express-session");

const Sessions = require("./models/sessions");

const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");

const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.disable("x-powered-by");

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    store: Sessions,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 7 * 2, // 2 weeks in milliseconds (2 weeks) * 24 hours in a day * 7 days in a week * 1000 milliseconds in a second
    },
  })
);

Sessions.sync();

app.use("/", indexRouter);
app.use("/users", usersRouter);

module.exports = app;
