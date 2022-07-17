// jshint esversion:9

"use strict";

const express = require("express");
const router = express.Router();
const handlers = require("../controllers/inventory");
const authorize = require("../security/authorizations");

router.route("/")
  .get(authorize.isPharmacist, authorize.isPharmacyTechnician, handlers.getAllInventory)
  .post(authorize.isPharmacist, authorize.isPharmacyTechnician, handlers.createInventory)
  .delete(authorize.isChiefPharmacist, handlers.deleteInventory);

router.route("/:id")
  .get(authorize.isPharmacist, authorize.isPharmacyTechnician, handlers.getInventoryById)
  .put(authorize.isPharmacist, authorize.isPharmacyTechnician, handlers.updateInventory)
  .patch(authorize.isPharmacist, authorize.isPharmacyTechnician, handlers.updateInventoryAttributes)
  .delete(authorize.isChiefPharmacist, handlers.deleteInventoryById);

module.exports = router;
