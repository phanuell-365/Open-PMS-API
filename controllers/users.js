// jshint esversion:9

"use strict";

const User = require("../models/users");

module.exports = {
  /**
   * @description - This method is used to get the user's profile.
   * @param req
   * @param res
   */
  getUsers(req, res) {
    User.findAll().then((users) => {
      res.status(200).json(users);
    });
    console.log("All the authenticated users are: ", req.session.passport);
  },

  /**
   * Register a new user
   * @param req - The request object
   * @param res - The response object
   * @param next - This is used to pass the control to the next middleware
   */
  createUser(req, res, next) {
    const { username, password, email, phone, role } = req.body;
    const user = {
      username,
      password,
      email,
      phone,
      role,
    };

    // Save the user to the database
    // ...

    User.create(user)

      .then((user) => {
        res.status(201).json({
          message: `User ${user.username} created successfully.`,
        });
      })
      .catch(next);
  },

  login(req, res, next) {
    if (req.isAuthenticated()) {
      res.status(200).json({
        message: `User ${req.user.username} logged in successfully.`,
      });
    } else {
      res.status(401).json({
        message: `User ${req.user.username} failed to login.`,
      });
    }
  },

  logout(req, res, next) {
    console.log("Logging out...");
    console.log("The request object is: ", req);
    const user = req.user;
    req.logout(next);
    res.status(200).json({
      message: `User ${user.username} logged out successfully.`,
    });
  },

  /**
   * Deletes all users
   * @param req
   * @param res
   */
  deleteUsers(req, res) {
    if (req.isAuthenticated() && req.user.role === "admin") {
      res.status(200).json({
        message: `User ${req.user.username} deleted all users.`,
      });
    } else {
      res.status(401).json({
        message: `User ${req.user.username} failed to delete all users. You aren't an admin.`,
      });
    }
  },

  logInFailed(req, res) {
    res.status(401).json({
      message: "Login failed.",
    });
  },
};
