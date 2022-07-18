// jshint esversion:9

"use strict";

// import all the errors
const Error400 = require("../errors/400");
const Error404 = require("../errors/404");
const Error500 = require("../errors/500");
const Error401 = require("../errors/401");
const Error403 = require("../errors/403");

module.exports = (err, req, res, next) => {
  if (err instanceof Error400) {
    return res.status(err.status).json({
      success: false,
      message: err.message
    });
  } else if (err instanceof Error404) {
    return res.status(err.status).json({
      success: false,
      message: err.message
    });
  } else if (err instanceof Error500) {
    return res.status(err.status).json({
      success: false,
      message: err.message
    });
  } else if (err instanceof Error401) {
    return res.status(err.status).json({
      success: false,
      message: err.message
    });
  } else if (err instanceof Error403) {
    return res.status(err.status).json({
      success: false,
      message: err.message
    });
  } else if (err.name === "SequelizeUniqueConstraintError") {
    console.log("The type of error is: ", typeof err);
    return res.status(400).json({
      success: false,
      err
    });
  }
  next(err);
};
