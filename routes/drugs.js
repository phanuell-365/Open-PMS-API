// jshint esversion:9

"use strict";

const express = require("express");
const router = express.Router();
const handlers = require("../controllers/drugs");
const authorize = require("../security/authorizations");
const drugMiddlewares = require("../middlewares/drugs.middleware");

/* GET home page. */
// eslint-disable-next-line no-unused-vars
router.route("/")
  .get(authorize.isPharmacist, handlers.getAllDrugs)
  .post(authorize.isPharmacist, drugMiddlewares.isRequestBodyEmpty, drugMiddlewares.isDrugUnique, handlers.createDrug)
  .delete(authorize.isAdmin, handlers.deleteAllDrugs);

router.route("/:id")
  .get(authorize.isPharmacist, handlers.getDrugById)
  .put(authorize.isPharmacist, drugMiddlewares.isDrugUniqueUpdate, handlers.updateDrug)
  .patch(authorize.isPharmacist, handlers.updateDrugAttributes)
  .delete(authorize.isAdmin, handlers.deleteDrug);

module.exports = router;
