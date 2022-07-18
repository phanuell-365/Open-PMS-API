// jshint esversion:9

"use strict";

const express = require("express");
const router = express.Router();
const handlers = require("../controllers/inventory");
const authorize = require("../security/authorizations");

router.route("/")
  .get(authorize.isPharmacist, authorize.isPharmacyTechnician, handlers.getAllInventories)
  .post(authorize.isPharmacist, authorize.isPharmacyTechnician, handlers.addInventory)
  .delete(authorize.isChiefPharmacist, handlers.deleteAllInventories);

router.route("/:id")
  .get(authorize.isPharmacist, authorize.isPharmacyTechnician, handlers.getInventoryById)
  .put(authorize.isPharmacist, authorize.isPharmacyTechnician, handlers.updateInventory)
  .patch(authorize.isPharmacist, authorize.isPharmacyTechnician, handlers.updateInventoryAttributes)
  .delete(authorize.isChiefPharmacist, handlers.deleteInventoryById);

module.exports = router;
