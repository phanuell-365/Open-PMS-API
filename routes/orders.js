// jshint esversion:9

"use strict";

const express = require("express");
const router = express.Router();
const handlers = require("../controllers/orders");
const authorize = require("../security/authorizations");
const orderMiddlewares = require("../middlewares/orders.middleware");


/* GET home page. */
// eslint-disable-next-line no-unused-vars
router.route("/")
  .get(authorize.isPharmacist, authorize.isPharmacyTechnician, handlers.getAllOrders)
  .post(authorize.isPharmacist, authorize.isPharmacyTechnician, handlers.createOrder)
  .delete(authorize.isChiefPharmacist, handlers.cancelOrders);

router.route("/:id")
  .get(authorize.isPharmacist, authorize.isPharmacyTechnician, handlers.getOrderById);

module.exports = router;
