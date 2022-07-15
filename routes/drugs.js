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
  .get(authorize.isPharmacist, handlers.get)
  .post(authorize.isPharmacist, drugMiddlewares.isRequestBodyEmpty, drugMiddlewares.isDrugUnique, handlers.post)
  .delete(authorize.isAdmin, handlers.delete);

router.route("/:id")
  .get(authorize.isPharmacist, handlers.getDrugById)
  .put(authorize.isPharmacist, drugMiddlewares.isDrugUniqueUpdate, handlers.updateDrugById)
  .patch(authorize.isPharmacist, handlers.updateDrugAttributes)
  .delete(authorize.isAdmin, handlers.deleteDrugById);

module.exports = router;
