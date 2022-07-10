const express = require("express");
const router = express.Router();

/* GET users listing. */
// eslint-disable-next-line no-unused-vars
router.get("/", (req, res, next) => {
  if (req.session.viewCount) {
    req.session.viewCount++;
  } else {
    req.session.viewCount = 1;
  }
  res.json(`You have visited this page ${req.session.viewCount} times`);
});

module.exports = router;
