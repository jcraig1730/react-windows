const express = require("express");
const { File } = require("../db");

const router = express.Router();

const createFolder = async (req, res) => {
  try {
    const { name, parent, type } = req.body;

    if (name === "C:/") {
      const newFile = new File({ name, type });
      try {
        await newFile.save();
      } catch (err) {}
      return newFile;
    }
    const newFile = new File({ name, parent, type });
    await newFile.save();
    return newFile;
  } catch (err) {
    return err;
  }
};

const createFile = async (req, res) => {
  try {
    const { name, parent, type, data } = req.body;
    const newFile = new File({ name, parent, type, data: data || "" });
    return await newFile.save();
  } catch (err) {
    return err;
  }
};

create = async (req, res) => {
  try {
    const { type, parent } = req.body;
    let newFile;

    if (type === "folder") {
      newFile = await createFolder(req, res);
    }
    if (type === "file") {
      newFile = await createFile(req, res);
    }

    const parentFile = await File.findById(parent);
    if (parentFile) {
      parentFile.children.push(newFile._id);
      await parentFile.save();
    }
    return res.status(201).json(newFile);

    throw "Must be of type 'file' or 'folder'.";
  } catch (err) {
    console.log(err);
    res.status(500).json({ err: "Please try your request again." });
  }
};

editFolder = async (req, res) => {};

deleteFolder = async (req, res) => {
  try {
    const { id } = req.params;
    const target = await Folder.findById(id);
    const parent = await Folder.findById(target.parent);
    const idx = parent.contents.findIndex(folderId => {
      return folderId.toString() === id;
    });
    parent.contents = parent.contents
      .slice(0, idx)
      .concat(parent.contents.slice(idx + 1));
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
    let result = await File.find({ name: "C:/" });
    if (result.length === 0) {
      result = [await createFolder({ body: { name: "C:/", type: "folder" } })];
    }
    const populatedResult = await result[0].populate("children").execPopulate();
    res.status(200).json(populatedResult);
  } catch (err) {
    res.status(500);
  }
};

getFile = async (req, res) => {
  try {
    const result = await File.findById(req.params.id);
    const populatedResult = await result.populate("children").execPopulate();
    res.status(200).json(populatedResult);
  } catch (err) {
    res.status(500);
  }
};

router.get("/", getRoot);
router.get("/:id", getFile);
router.post("/", create);
router.delete("/:id", deleteFolder);

module.exports = router;
