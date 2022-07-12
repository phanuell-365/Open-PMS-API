// jshint esversion:9

"use strict";

const express = require("express");
const router = express.Router();
const handlers = require("../controllers/drugs");

/* GET home page. */
// eslint-disable-next-line no-unused-vars
router.route("/").get(handlers.get).post(handlers.post).delete(handlers.delete);

module.exports = router;
