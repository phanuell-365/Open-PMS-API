// jshint esversion:9

"use strict";

module.exports = (err, req, res, next) => {
  console.log("Was called");
  if (err.name === "Error400") {
    return res.status(400).json({
      error: err.message,
    });
  } else if (err.name === "Error404") {
    return res.status(404).json({
      error: err.message,
    });
  }
  next(err);
};
