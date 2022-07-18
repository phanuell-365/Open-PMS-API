// jshint esversion:9

"use strict";

const express = require("express");
const router = express.Router();
const handlers = require("../controllers/supplies");

/* GET home page. */
// eslint-disable-next-line no-unused-vars
router.route("/").get(handlers.getAllSupplies).post(handlers.addSupply).delete(handlers.delete);

module.exports = router;
