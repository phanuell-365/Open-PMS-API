// jshint esversion:9

"use strict";

const Error401 = require("../errors/401");
const passport = require("passport");

module.exports = {
  isAdmin(req, res, next) {
    return passport.authenticate(
      "jwt",
      {
        session: false,
      },
      (err, user) => {
        if (err) {
          return next(err);
        }
        if (!user) {
          return next(new Error401("You are not logged in."));
        }
        if (user.role !== "admin") {
          return next(
            new Error401("You are not authorized to perform this action.")
          );
        }
        req.user = user;
        next();
      }
    )(req, res, next);
  },

  isPharmacist(req, res, next) {
    return passport.authenticate(
      "jwt",
      {
        session: false,
      },
      (err, user) => {
        if (err) {
          return next(err);
        }
        if (!user) {
          return next(new Error401("You are not logged in."));
        }
        if (user.role !== "pharmacist" || user.role !== "admin") {
          return next(
            new Error401("You are not authorized to perform this action.")
          );
        }
        req.user = user;
        next();
      }
    )(req, res, next);
  },

  isSalesPerson(req, res, next) {
    return passport.authenticate(
      "jwt",
      {
        session: false,
      },
      (err, user) => {
        if (err) {
          return next(err);
        }
        if (!user) {
          return next(new Error401("You are not logged in."));
        }
        if (user.role !== "salesperson" || user.role !== "admin") {
          return next(
            new Error401("You are not authorized to perform this action.")
          );
        }
        req.user = user;
        next();
      }
    )(req, res, next);
  },
};
