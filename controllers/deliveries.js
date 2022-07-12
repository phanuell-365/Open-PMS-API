// jshint esversion:9

"use strict";

module.exports = {
  get: (req, res) => {
    if (req.session.viewCount) {
      req.session.viewCount++;
    } else {
      req.session.viewCount = 1;
    }
    res.json(`You have visited this page ${req.session.viewCount} times`);
  },

  post: (req, res) => {
    res.json({
      message: "Hello World!",
    });
  },

  delete: (req, res) => {
    res.json({
      message: "Hello World!",
    });
  },
};
