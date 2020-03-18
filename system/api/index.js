const express = require("express");

const router = express.Router();

router.use("/folder", require("./folder"));
router.use("/file", require("./file"));

router.use("/desktop", require("./desktop"));

module.exports = router;
