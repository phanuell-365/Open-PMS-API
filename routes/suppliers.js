// jshint esversion:9

"use strict";

const express = require("express");
const router = express.Router();
const handlers = require("../controllers/suppliers");
const authorize = require("../security/authorizations");

/* GET home page. */
// eslint-disable-next-line no-unused-vars
router.route("/")
  .get(authorize.isChiefPharmacist, handlers.getAllSuppliers)
  .post(authorize.isChiefPharmacist, handlers.addNewSupplier)
  .delete(authorize.isChiefPharmacist, handlers.deleteSuppliers);

router.route("/:id")
  .get(authorize.isChiefPharmacist, handlers.getSupplier)
  .put(authorize.isChiefPharmacist, handlers.updateSupplier)
  .patch(authorize.isChiefPharmacist, handlers.updateSupplierAttributes)
  .delete(authorize.isChiefPharmacist, handlers.deleteSupplier);


module.exports = router;
