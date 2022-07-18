// jshint esversion:9

"use strict";

const express = require("express");
const router = express.Router();
const usersHandler = require("../controllers/users");
const authorize = require("../security/authorizations");

const defaultUser = require("../config/create.user");
// const User = require("../models/users");

// create a new user if not exists
router.get("/", defaultUser);

router.route("/login").post(usersHandler.login);

router.route("/logout").post(authorize.isAuthenticated, usersHandler.logout);

// router.route("/login/failed").get(usersHandler.logInFailed);

router.route("/whoami").get(authorize.isAuthenticated, usersHandler.whoAmI);

/* GET users listing. */
// eslint-disable-next-line no-unused-vars
router
  .route("/")
  .get(authorize.isAdmin, usersHandler.getUsers)
  .post(authorize.isAdmin, usersHandler.createUser)
  .delete(authorize.isAdmin, usersHandler.deleteUsers);

router
  .route("/:id")
  .get(authorize.isAdmin, usersHandler.getUserById)
  .put(authorize.isAuthenticated, usersHandler.updateUser)
  .patch(authorize.isAuthenticated, usersHandler.updateUserAttributes)
  .delete(authorize.isAdmin, usersHandler.deleteUser);

module.exports = router;
