// jshint esversion:9

"use strict";

class Error403 extends Error {
  constructor(message, ...params) {
    super(...params);

    // Maintains proper stack trace for where our error was thrown (only available on V8)
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, Error403);
    }

    this.name = "Error403";

    if (!message) {
      message = "Error! Forbidden!";
    }
    this.message = message;
    this.status = 403;
  }
}

module.exports = Error403;
