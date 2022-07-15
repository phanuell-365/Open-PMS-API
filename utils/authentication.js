// jshint esversion:9

"use strict";

module.exports = {
  /**
   * @description - This method is used to authenticate a user.
   * @param req - The request object
   * @param res - The response object
   * @param next - This is used to pass the control to the next middleware
   * @returns {*}
   */
  isAuthenticated: (req, res, next) => {
    if (req.isAuthenticated()) {
      return next();
    } else {
      res.status(401).json({
        message: "You are not logged in."
      });
    }
  },

  /**
   * @description - This method is used to get the user's profile.
   * @param req - The request object
   * @param res - The response object
   * @param next - This is used to pass the control to the next middleware
   * @returns {*}
   */
  isAdmin: (req, res, next) => {
    // Check if the user is authenticated
    if (req.user && req.isAuthenticated() && req.user.role === "admin") {
      next();
    } else {
      res.status(401).json({
        message: "You are not authorized to perform this action."
      });
    }
  },

  isPharmacist: (req, res, next) => {
    // Check if the user is authenticated
    if (req.user && req.isAuthenticated() && req.user.role === "pharmacist") {
      next();
    } else {
      res.status(401).json({
        message: "You are not authorized to perform this action."
      });
    }
  },

  /**
   * @description - This method is used to get the user's profile.
   * @param req - The request object
   * @param res - The response object
   * @param next - This is used to pass the control to the next middleware
   * @returns {*}
   */
  isPharmacyTechnician: (req, res, next) => {
    // Check if the user is authenticated
    if (req.user && req.isAuthenticated() && req.user.role === "salesperson") {
      next();
    } else {
      res.status(401).json({
        message: "You are not authorized to perform this action."
      });
    }
  }
};
