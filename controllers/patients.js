// jshint esversion:9

"use strict";

const Patient = require("../models/patients");
const Error400 = require("../errors/400");
const output = require("../output/patients");

module.exports = {

  /**
   * @description - This method is used to get all patients from the database.
   * @api {get} /api/patients Get all patients
   */
  getAllPatients: (req, res, next) => {
    Patient.findAll()
      .then(patients => {

        if (patients.length === 0) {
          throw new Error400("No patients found.");
        }

        res.status(200).json({
          success: true,
          message: "Successfully retrieved all patients.",
          patients: output.patientList(patients)
        });
      })
      .catch(next);
  },

  /**
   * @description - This method is used to create a new patient.
   * @api {post} /api/patients Create a new patient
   */
  addPatient: (req, res, next) => {
    console.log("Creating patient ...");

    if (!req.body.name || !req.body.phone || !req.body.dob || !req.body.email) {
      throw new Error400("Invalid request body.");
    }

    req.user.createPatient({
      name: req.body.name,
      phone: req.body.phone,
      dob: req.body.dob,
      email: req.body.email,
      age: Patient.calculateAge(req.body.dob)
    })
      .then(patient => {
        res.status(201).json({
          success: true,
          message: "Successfully created patient.",
          patient: output.patient(patient)
        });
      })

      .catch(next);
  },

  /**
   * @description - This method is used to destroy all patients from the database.
   * @api {delete} /api/patients/:id Delete all patient
   */
  deleteAllPatients: (req, res, next) => {
    Patient.destroy({
      where: {}
    })
      .then(() => {
        res.status(200).json({
          success: true,
          message: "Successfully deleted all patients."
        });
      })
      .catch(next);
  },


  /**
   * @description - This method is used to get a patient by id.
   * @api {get} /api/patients/:id Get a patient by id
   */
  getPatientById: (req, res, next) => {
    const id = req.params.id;

    Patient.findByPk(id)
      .then(patient => {

        if (!patient) {
          throw new Error400("No patient found.");
        }

        res.status(200).json({
          success: true,
          message: "Successfully retrieved patient.",
          patient: output.patient(patient)
        });
      })
      .catch(next);

  },

  /**
   * @description - This method is used to update a patient from the database.
   * @api {put} /api/patients/:id Update a patient
   */
  updatePatient: (req, res, next) => {
    console.log("Updating patient ...");

    if (!req.body.name || !req.body.phone || !req.body.dob || !req.body.email) {
      throw new Error400("Invalid request body.");
    }

    const {
      name,
      phone,
      dob,
      email
    } = req.body;

    Patient.findByPk(req.params.id)
      .then(patient => {
        return patient.update({
          name: name,
          phone: phone,
          dob: dob,
          email: email,
          age: Patient.calculateAge(dob),
          UserId: req.user.id
        });
      })
      .then(patient => {
        res.status(200).json({
          success: true,
          message: "Successfully updated patient.",
          patient: output.patient(patient)
        });
      })
      .catch(next);
  },

  /**
   * @description - This method is used to update specific attributes of a patient from the database.
   * @api {patch} /api/patients/:id Update specific attributes of a patient
   */
  updatePatientAttributes: (req, res, next) => {
    console.log("Updating patient attributes ...");

    const reqBody = req.body;

    Patient.findByPk(req.params.id)

      .then(patient => {
        if (!patient) {
          throw new Error400("Patient not found.");
        } else {
          if (reqBody.dob) {
            reqBody.age = Patient.calculateAge(reqBody.dob);
          }
          return patient.update({
            age: reqBody.age,
            UserId: req.user.id
          });
        }
      })

      .then(patient => {
        return patient.update(reqBody);
      })

      .then(patient => {
        res.status(200).json({
          success: true,
          message: "Successfully updated patient.",
          patient: output.patient(patient)
        });
      })
      .catch(next);
  },

  /**
   * @description - This method is used to delete a patient from the database.
   * @api {delete} /api/patients/:id Delete a patient
   */
  deletePatient: (req, res, next) => {

    Patient.findByPk(req.params.id)
      .then(patient => {
        if (!patient) {
          throw new Error400("Patient not found.");
        } else {
          return patient.destroy();
        }
      })
      .then(() => {
        res.status(200).json({
          success: true,
          message: "Successfully deleted patient."
        });
      })
      .catch(next);

  }

};
