const express = require("express");
const { File, Folder, Window, Icon } = require("../db");

const router = express.Router();

const getWindow = async (req, res) => {
  try {
    const { id } = req.params;

    const window = await Window.find(id ? { _id: id } : {});
    const populatedWindow = await window[0].populate("iconList").execPopulate();
    res.status(200).json(populatedWindow);
  } catch (err) {
    console.log(err);
    res.sendStatus(503);
  }
};

const addIcon = async (req, res) => {
  try {
    const { icon } = req.body;
    const { windowId } = req.params;

    const targetWindow = await Window.findById(windowId);
    targetWindow.iconList.push(icon);
    await targetWindow.save();
    res.status(201).json(targetWindow);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
};

const updateWindowIconList = async (req, res) => {
  try {
    const { icon } = req.body;
    let desktop = await Desktop.find();
    if (desktop.length === 0) {
      desktop = new Desktop();
    } else {
      desktop = desktop[0];
    }
    let newIconList;
    let iconIdx = desktop.iconList.findIndex(id => id == icon);
    if (iconIdx != -1) {
      newIconList = desktop.iconList
        .slice(0, iconIdx)
        .concat(desktop.iconList.slice(iconIdx + 1));
    } else {
      newIconList = [...desktop.iconList, icon];
    }
    desktop.iconList = newIconList;
    await desktop.save();
    res.status(201).json(desktop);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
};

router.get("/:id", getWindow);
router.get("/", getWindow);
router.post("/:windowId", addIcon);
router.put("/icon", updateWindowIconList);
// router.put("/position", updateIconPosition);

module.exports = router;
