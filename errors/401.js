// jshint esversion:9

"use strict";

class Error401 extends Error {
  constructor(message, ...params) {
    super(...params);

    // Maintains proper stack trace for where our error was thrown (only available on V8)
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, Error401);
    }

    this.name = "Error401";

    if (!message) {
      message = "Error! Unauthorized!";
    }
    this.message = message;
    this.status = 401;
  }
}

module.exports = Error401;
