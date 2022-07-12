// jshint esversion:9

"use strict";

const User = require("../models/users");
const Error401 = require("../errors/401");
const issueJWT = require("../security/issueJWT");
const output = require("../output/users");

module.exports = {
  login(req, res, next) {
    const { username, password } = req.body;

    User.findOne({ where: { username: username } })

      .then((user) => {
        if (!user) {
          throw new Error401("Invalid username or password.");
        }

        const isValid = User.validatePassword(password, user.password);

        if (!isValid) {
          throw new Error401("Invalid password!");
        } else {
          const tokenObject = issueJWT(user);

          const userObj = output.user(user);

          res.status(200).json({
            success: true,
            user: userObj,
            token: tokenObject.token,
            expiresIn: tokenObject.expires,
          });
        }
      })
      .catch(next);
  },

  logout(req, res, next) {},

  logInFailed(req, res) {
    res.status(401).json({
      message: "Login failed.",
    });
  },

  /**
   * @description - This method is used to get the user's profile.
   * @param req
   * @param res
   */
  getUsers(req, res) {
    User.findAll().then((users) => {
      const foundUsers = [];

      users.forEach((user) => {
        foundUsers.push(output.user(user));
      });

      res.status(200).json(foundUsers);
    });
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

  /**
   * Controllers for routes for specific users
   */

  getUserById(req, res, next) {},
};
