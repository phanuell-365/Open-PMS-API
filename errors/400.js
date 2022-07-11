// jshint esversion:9

"use strict";

class Error400 extends Error {
  constructor(message, ...params) {
    super(...params);

    // Maintains proper stack trace for where our error was thrown (only available on V8)
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, Error400);
    }

    this.name = "Error404";

    if (!message) {
      message = "Error! Not Found!";
    }
    this.message = message;
  }
}

module.exports = Error400;
