const express = require("express");
const { File, Folder, Desktop, DesktopIcon } = require("../db");

const router = express.Router();

const getDesktop = async (req, res) => {
  try {
    const desktop = await Desktop.find();
    res.status(200).json(desktop[0]);
  } catch (err) {
    console.log(err);
    res.sendStatus(503);
  }
};

const createDesktopIcon = async (req, res) => {
  try {
    const { id, startX, startY } = req.body;
    const newIconData = { id, startX: startX || 0, startY: startY || 0 };
    const newIcon = await new DesktopIcon(newIconData);
    await newIcon.save();
    let desktop = await Desktop.find();
    if (desktop.length === 0) {
      desktop = await new Desktop({ iconList: [] });
    }
    desktop.iconList.push(newIcon._id);
    await desktop.save();
    res.status(201).json();
  } catch (err) {
    console.log(err);
    res.sendStatus(503);
  }
};

router.get("/", getDesktop);
router.post("/", createDesktopIcon);

module.exports = router;
