const express = require("express");
const { Folder, File } = require("../db");

const router = express.Router();

createFolder = async (req, res) => {
  try {
    const { name, parent } = req.body;

    if (name === "C") {
      const newFolder = new Folder({ name, type: "folder" });
      await newFolder.save();
      return res.status(203).json(newFolder);
    }

    const newFolder = new Folder({ name, parent, type: "folder" });
    await newFolder.save();
    const parentFolder = await Folder.findById(parent);
    parentFolder.contents.push(newFolder._id);
    await parentFolder.save();
    res.status(203).json(newFolder);
  } catch (err) {
    console.log(err);
    res.status(500).json({ err: "Please try your request again." });
  }
};

editFolder = async (req, res) => {};

deleteFolder = async (req, res) => {
  try {
    const { id } = req.params;
    // find the folder that is being removed
    const target = await Folder.findById(id);

    // find the parent of the target and remove it from parent's contents
    const parent = await Folder.findById(target.parent);
    const idx = parent.contents.findIndex(folderId => {
      return folderId.toString() === id;
    });
    console.log(idx);
    parent.contents = parent.contents
      .slice(0, idx)
      .concat(parent.contents.slice(idx + 1));
    console.log(parent.contents);
    await parent.save();
    await target.remove();
    res.sendStatus(204);
  } catch (err) {
    console.log(err);
    res.status(500).json({ err: "Please try your request again" });
  }
};

getRoot = async (req, res) => {
  try {
    const result = await Folder.find({ name: "C" });
    res.status(200).json(result);
  } catch (err) {
    res.status(500);
  }
};

getFolder = async (req, res) => {
  try {
    console.log(req.params.id);
    const result = await Folder.findById(req.params.id);
    res.status(200).json(result);
  } catch (err) {
    res.status(500);
  }
};

router.get("/", getRoot);
router.get("/:id", getFolder);
router.post("/", createFolder);
router.delete("/:id", deleteFolder);

module.exports = router;
