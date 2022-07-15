// jshint esversion:9

"use strict";

const User = require("../models/users");
const Error401 = require("../errors/401");
const issueJWT = require("../security/issueJWT");
const output = require("../output/users");

module.exports = {

  /**
   * @api {post} /api/users/login Login
   * @param req
   * @param res
   * @param next
   */
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
            expiresIn: tokenObject.expires
          });
        }
      })
      .catch(next);
  },

  /**
   * @api {post} /api/users/logout Logout
   * @param req
   * @param res
   * @param next
   */
  logout(req, res, next) {
  },

  whoAmI(req, res, next) {

    console.log("Finding user ...");

    if (req.user) {

      const userObj = output.user(req.user);

      res.status(200).json({
        success: true,
        user: userObj
      });
    } else {
      
      throw new Error401("You are not logged in.");
    }
  },

  /**
   * @api {get} /api/users/login/failed Login failed
   * @param req
   * @param res
   * @param next
   */
  logInFailed(req, res, next) {
    Promise.resolve()
      .then(() => {
        throw new Error401("Invalid username or password.");
      })
      .catch(next);
  },

  /**
   * @api {get} /api/users Get all users
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
   * @api {post} /api/users Create a new user
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
      role
    };

    // Save the user to the database
    // ...

    User.create(user)

      .then((user) => {
        res.status(201).json({
          message: `User ${user.username} created successfully.`
        });
      })
      .catch(next);
  },

  /**
   * @api {delete} /api/users/ Delete all users
   * Deletes all users
   * @param req
   * @param res
   */
  deleteUsers(req, res) {
    if (req.isAuthenticated() && req.user.role === "admin") {
      res.status(200).json({
        message: `User ${req.user.username} deleted all users.`
      });
    } else {
      res.status(401).json({
        message: `User ${req.user.username} failed to delete all users. You aren't an admin.`
      });
    }
  },

  /**
   * Controllers for routes for specific users
   */

  /**
   * @api {get} /api/users/:id Get user by id
   * @param req
   * @param res
   * @param next
   */
  getUserById(req, res, next) {
    const { id } = req.params;

    User.findByPk(id)

      .then((user) => {
        if (!user) {
          throw new Error401("User not found.");
        }

        const userObj = output.user(user);

        res.status(200).json(userObj);
      })
      .catch(next);
  },

  /**
   * @api {put} /api/users/:id Update user by id
   * @param req
   * @param res
   * @param next
   */
  updateUser(req, res, next) {
    const { id } = req.params;
    const { username, password, email, phone, role } = req.body;

    console.log("The value of request body -> ", req.body);

    if (!username || !password || !email || !phone || !role) {
      throw new Error401("Missing required fields.");
    }

    const userObj = {
      username,
      password: User.createPasswordHash(password),
      email,
      phone,
      role
    };

    // Update the user in the database
    // ...

    User.findByPk(id)
      .then((user) => {
        if (!user) {
          throw new Error401("User not found.");
        }

        console.log("The found user -> ", output.user(user));
        return user.update(userObj);
      })
      .then((user) => {
        res.status(200).json({
          message: `User ${user.username} updated successfully.`
        });
      })
      .catch(next);
  },

  /**
   * @api {patch} /api/users/:id Update user by id
   * @param req
   * @param res
   * @param next
   */
  updateUserAttributes(req, res, next) {
    const { id } = req.params;

    const reqUser = req.body;

    if (reqUser.password) {
      reqUser.password = User.createPasswordHash(reqUser.password);
    }

    // Update the user in the database
    // ...

    User.findByPk(id)
      .then((user) => {
        if (!user) {
          throw new Error401("User not found.");
        }

        return user.update(reqUser);
      })
      .then((user) => {
        res.status(200).json({
          message: `User ${user.username} updated successfully.`
        });
      })
      .catch(next);
  },

  /**
   * @api {delete} /api/users/:id Delete user by id
   * @param req
   * @param res
   * @param next
   */
  deleteUser(req, res, next) {
    const { id } = req.params;

    // Delete the user from the database
    // ...

    User.destroy({ where: { id: id } })

      .then((user) => {
        res.status(200).json({
          message: `User ${user.username} deleted successfully.`
        });
      })
      .catch(next);
  }
};
