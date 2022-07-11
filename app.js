// jshint esversion:9

"use strict";

const express = require("express");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const sessions = require("./middlewares/session.middleware");
const errorHandler = require("./errors/error.middleware");

const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");

const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.disable("x-powered-by");

app.use(sessions);

app.use("/", indexRouter);
app.use("/api/users", usersRouter);

// catch 404 and forward to error handler
app.use("*", errorHandler);

module.exports = app;
