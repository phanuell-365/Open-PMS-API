// jshint esversion:9

"use strict";

class Error500 extends Error {
  constructor(message, ...params) {
    super(...params);

    // Maintains proper stack trace for where our error was thrown (only available on V8)
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, Error500);
    }

    this.name = "Error401";

    if (!message) {
      message = "Error! Internal Server Error!";
    }
    this.message = message;
    this.status = 500;
  }
}

module.exports = Error500;
