// jshint esversion:9

"use strict";

const User = require("../models/users");

module.exports = (req, res, next) => {
  User.findOne({
    where: {
      role: "admin"
    }
  })
    .then(user => {

      if (!user) {

        console.log("Creating admin user");

        return User.create({
          username: "Administrator",
          role: "admin",
          email: "defaultuser@email.com",
          password: "admin_password",
          phone: "123456789"
        });

      } else {

        console.log("Admin user already exists");

        return user;
      }
    })
    .then(user => {
      req.user = user;
      next();
    })
    .catch(next);
};

