// jshint esversion:9

"use strict";

const express = require("express");
const router = express.Router();
const handlers = require("../controllers/sales");
const authorize = require("../security/authorizations");
const salesMiddleware = require("../middlewares/sales.middleware");

/* GET home page. */
// eslint-disable-next-line no-unused-vars
router.route("/")
  .get(authorize.isPharmacyTechnician, handlers.getAllSales)
  .post(authorize.isPharmacyTechnician, salesMiddleware.updateInventoryPackSizeQuantityAfterSale, handlers.makeSale)
  .delete(authorize.isChiefPharmacist, handlers.deleteSales);

router.route("/:id")
  .get(authorize.isPharmacyTechnician, handlers.getSalesById)
  .put(authorize.isPharmacyTechnician, handlers.updateSales)
  .patch(authorize.isPharmacyTechnician, handlers.updateSalesAttributes)
  .delete(authorize.isChiefPharmacist, handlers.deleteSalesById);


module.exports = router;
