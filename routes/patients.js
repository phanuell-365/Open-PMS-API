// jshint esversion:9

"use strict";

const express = require("express");
const router = express.Router();
const handlers = require("../controllers/patients");
const authorize = require("../security/authorizations");
const patientMiddlewares = require("../middlewares/patients.middleware");


/* GET home page. */
// eslint-disable-next-line no-unused-vars
router.route("/")
  .get(authorize.isPharmacist, authorize.isPharmacyTechnician, handlers.getAllPatients)
  .post(authorize.isPharmacist, authorize.isPharmacyTechnician, handlers.createPatient)
  .delete(authorize.isChiefPharmacist, handlers.deleteAllPatients);

router.route("/:id")
  .get(authorize.isPharmacist, authorize.isPharmacyTechnician, handlers.getPatientById)
  .put(authorize.isPharmacist, authorize.isPharmacyTechnician, handlers.updatePatient)
  .patch(authorize.isPharmacist, authorize.isPharmacyTechnician, handlers.updatePatientAttributes)
  .delete(authorize.isChiefPharmacist, handlers.deletePatient);

module.exports = router;
