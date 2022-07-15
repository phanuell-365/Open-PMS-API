// jshint esversion:9

"use strict";

const Error401 = require("../errors/401");
const passport = require("passport");

module.exports = {

  /**
   * @api {post} /api/users/login Login
   * @description Login with username and password, anyone who's logged in can perform the following action.
   * @param req
   * @param res
   * @param next
   * @returns {*}
   */
  isAuthenticated: (req, res, next) => {
    return passport.authenticate(
      "jwt",
      { session: false },
      (err, user, info) => {
        if (err) {
          return next(err);
        }
        if (!user) {
          return next(new Error401("You are not logged in."));
        }

        req.user = user;
        next();
      }
    )(req, res, next);
  },

  isAdmin(req, res, next) {
    return passport.authenticate(
      "jwt",
      {
        session: false
      },
      (err, user) => {
        if (err) {
          return next(err);
        }

        if (!user) {
          return next(new Error401("You are not logged in."));
        }
        if (user.role === "admin") {
          req.user = user;
          next();
        } else {
          return next(
            new Error401("You are not authorized to perform this action.")
          );
        }

      }
    )(req, res, next);
  },

  isChiefPharmacist(req, res, next) {

    return passport.authenticate(
      "jwt",
      {
        session: false
      },
      (err, user) => {
        if (err) {
          return next(err);
        }

        if (!user) {
          return next(new Error401("You are not logged in."));
        }

        if (user.role === "chiefPharmacist" || user.role === "admin") {
          req.user = user;
          next();
        } else {
          return next(
            new Error401("You are not authorized to perform this action.")
          );
        }

      }
    )(req, res, next);
  },

  /**
   * @description
   * @param req
   * @param res
   * @param next
   * @returns {*}
   */
  isPharmacist(req, res, next) {
    return passport.authenticate(
      "jwt",
      {
        session: false
      },
      (err, user) => {
        if (err) {
          return next(err);
        }
        if (!user) {
          return next(new Error401("You are not logged in."));
        }

        if (user.role === "admin" || user.role === "pharmacist") {
          req.user = user;
          next();
        } else {
          return next(
            new Error401("You are not authorized to perform this action.")
          );
        }

      }
    )(req, res, next);
  },

  isPharmacyAssistant(req, res, next) {
    return passport.authenticate(
      "jwt",
      {
        session: false
      },
      (err, user) => {
        if (err) {
          return next(err);
        }
        if (!user) {
          return next(new Error401("You are not logged in."));
        }

        if (user.role === "admin" || user.role === "pharmacyAssistant") {
          req.user = user;
          next();
        } else {
          return next(
            new Error401("You are not authorized to perform this action.")
          );
        }

      }
    )(req, res, next);
  },

  isPharmacyTechnician(req, res, next) {
    return passport.authenticate(
      "jwt",
      {
        session: false
      },
      (err, user) => {
        if (err) {
          return next(err);
        }
        if (!user) {
          return next(new Error401("You are not logged in."));
        }
        if (user.role === "pharmacyTechnician" || user.role === "admin") {
          req.user = user;
          next();
        } else {
          return next(
            new Error401("You are not authorized to perform this action.")
          );
        }

      }
    )(req, res, next);
  }
};
