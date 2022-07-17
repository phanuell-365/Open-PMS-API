// jshint esversion:9

"use strict";

const Patient = require("../models/patients");
const Error400 = require("../errors/400.js");

module.exports = {

  isPatientUnique: (req, res, next) => {

    Promise.resolve()
      .then(() => {
        // collect the request body
        const body = req.body;

        // check if the request body is empty
        if (Object.keys(body).length === 0) {

          // if the request body is empty, return a 400 error
          throw new Error400("Invalid request body.");
        }

        return Patient.findAll({
          where: {
            name: body.name,
            birthDate: body.birthDate,
            phone: body.phone,
            email: body.email
          }
        });
      })
      .then((patients) => {
        if (patients.length > 0) {
          throw new Error400("Patient already exists.");
        } else {
          next();
        }
      })
      .catch(next);

  }
};
