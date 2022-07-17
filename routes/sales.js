// jshint esversion:9

"use strict";

const express = require("express");
const router = express.Router();
const handlers = require("../controllers/sales");

/* GET home page. */
// eslint-disable-next-line no-unused-vars
router.route("/")
  .get(handlers.getAllSales)
  .post(handlers.createSale)
  .delete(handlers.deleteSales);

router.route("/:id")
  .get(handlers.getSalesById)
  .put(handlers.updateSales)
  .patch(handlers.updateSalesAttributes)
  .delete(handlers.deleteSalesById);


module.exports = router;
