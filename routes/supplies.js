// jshint esversion:9

"use strict";

const express = require("express");
const router = express.Router();
const handlers = require("../controllers/supplies");
const authorize = require("../security/authorizations");
const suppliesMiddleware = require("../middlewares/supplies.middleware");

/* GET home page. */
// eslint-disable-next-line no-unused-vars
router.route("/")
  .get(authorize.isPharmacyTechnician, handlers.getAllSupplies)
  .post(
    authorize.isPharmacyTechnician,
    suppliesMiddleware.updateInventoryPackSizeQuantityAfterSupply,
    handlers.addSupply
  )
  .delete(authorize.isChiefPharmacist, handlers.delete);

module.exports = router;
