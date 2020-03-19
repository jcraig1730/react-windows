const express = require("express");
const { Icon } = require("../db");

const router = express.Router();

const createIcon = async (req, res) => {
  try {
    const { startX, startY, file } = req.body;
    const newIconData = { file, startX: startX || 0, startY: startY || 0 };
    const newIcon = await new Icon(newIconData);
    await newIcon.save();
    res.status(201).json(newIcon);
  } catch (err) {
    console.log(err);
    res.sendStatus(503);
  }
};

const updateIcon = async (req, res) => {
  try {
    const { id } = req.params;
    const target = await Icon.findByIdAndUpdate(id, req.body);
    res.status(201);
  } catch (err) {
    console.log(err);
    res.sendStatus(503);
  }
};

router.post("/", createIcon);
router.put("/:id", updateIcon);

module.exports = router;
