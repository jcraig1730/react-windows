const express = require("express");

const router = express.Router();

router.use("/file", require("./file"));
router.use("/icon", require("./icon"));
router.use("/window", require("./window"));

module.exports = router;
