// jshint esversion:9

"use strict";

const express = require("express");
const router = express.Router();
const handlers = require("../controllers/suppliers");
const authorize = require("../security/authorizations");

/* GET home page. */
// eslint-disable-next-line no-unused-vars
router.route("/")
  .get(handlers.getAllSuppliers)
  .post(handlers.createSupplier)
  .delete(handlers.deleteSuppliers);

router.route("/:id")
  .get(handlers.getSupplier)
  .put(handlers.updateSupplier)
  .patch(handlers.updateSupplierAttributes)
  .delete(handlers.deleteSupplier);


module.exports = router;
