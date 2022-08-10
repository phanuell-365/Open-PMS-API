// jshint esversion:9

"use strict";

const User = require("../models/users");
const Error401 = require("../errors/401");
const Error400 = require("../errors/400");
const issueJWT = require("../security/issueJWT");
const output = require("../output/users");
const { roles } = require("../data/users");

module.exports = {

  /**
   * @api {post} /api/users/login Login
   * @param req
   * @param res
   * @param next
   */
  login(req, res, next) {

    console.log("The request body is: ", req.body);

    const { username, password } = req.body;

    if (!username || !password) {
      throw new Error400("Invalid request body. Missing username or password.");
    }

    User.unscoped().findOne({ where: { username: username } })

      .then((user) => {
        if (!user) {
          throw new Error401("Invalid username.");
        }

        const isValid = user.validatePassword(password, user.password);

        if (!isValid) {
          throw new Error401("Invalid password!");
        }

        return user.update({
          active: true
        });
      })
      .then((user) => {
        return user.reload();
      })
      .then((user) => {
        const tokenObject = issueJWT(user);

        res.status(200).json({
          success: true,
          UserId: user.id,
          token: tokenObject.token,
          expiresIn: tokenObject.expires,
          isAdmin: user.role === "admin"
        });
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

    if (!req.user) {
      throw new Error401("User not logged in.");
    }

    req.user.update({
      active: false
    })
      .then(() => {
        res.status(200).json({
          success: true,
          message: "Successfully logged out."
        });
      })
      .catch(next);
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
        // foundUsers.push(output.user(user));
        foundUsers.push(user);
      });

      res.status(200).json(foundUsers);
    });
  },

  getUserRoles(req, res, next) {

    if (Object.keys(req.query).length === 0) {
      next();
    } else if (req.query.search === "roles") {
      res.status(200).json({
        success: true,
        roles
      });
    } else if (req.query.search !== "roles") {
      throw new Error400("Failed to get roles. No roles specified.");
    }


  },

  /**
   * @api {post} /api/users Create a new user
   * Register a new user
   * @param req - The request object
   * @param res - The response object
   * @param next - This is used to pass the control to the next middleware
   */
  createUser(req, res, next) {

    if (!req.body.username || !req.body.password || !req.body.email || !req.body.phone) {
      throw new Error400("Failed to create user. Missing username, password, email or phone.");
    }
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
   * @param next
   */
  deleteUsers(req, res, next) {

    User.destroy({ where: {} })
      .then(() => {
        res.status(200).json({
          message: "All users deleted."
        });
      })
      .catch(next);
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
      password,
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
    //
    // if (reqUser.password) {
    //   reqUser.password = User.createPasswordHash(reqUser.password);
    // }

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

    User.findByPk(id)
      .then((user) => {
        if (!user) {
          throw new Error401("User not found.");
        }

        return user.destroy();
      })
      .then((user) => {
        res.status(200).json({
          message: `User ${user.username} deleted successfully.`
        });
      })
      .catch(next);
  }
};
