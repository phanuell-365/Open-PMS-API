// jshint esversion:9

"use strict";

const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const passport = require("passport");
const Error404 = require("./errors/404");

const errorHandler = require("./middlewares/error.middleware");
// const defaultUser = require("./config/create.user");

const usersRouter = require("./routes/users");
const drugsRouter = require("./routes/drugs");
const suppliersRouter = require("./routes/suppliers");
const ordersRouter = require("./routes/orders");
const salesRouter = require("./routes/sales");
const deliveriesRouter = require("./routes/deliveries.route");

const app = express();

// create a new user if not exists
// app.all("*", defaultUser);

// log requests to the console
app.use(logger("dev"));

// parse incoming requests with JSON
app.use(express.json());

// parse incoming requests with urlencoded
app.use(express.urlencoded({ extended: false }));

// enable CORS
app.use(cors());

// disables the express default behavior of adding a powered-by header
app.disable("x-powered-by");

// add passport configuration
require("./security/config.passport")(passport);

// initialize passport
app.use(passport.initialize());

// app.use("/", indexRouter);

// Get the users routes
app.use("/api/users", usersRouter);

// Get the drugs routes
app.use("/api/drugs", drugsRouter);

// Get the suppliers routes
app.use("/api/suppliers", suppliersRouter);

// Get the orders routes
app.use("/api/orders", ordersRouter);

// Get the sales routes
app.use("/api/sales", salesRouter);

// Get the deliveries routes
app.use("/api/deliveries", deliveriesRouter);

// catch 404 and forward to error handler
app.all("*", (req, res) => {
  throw new Error404("Page not found.");
});

app.use(errorHandler);

module.exports = app;
