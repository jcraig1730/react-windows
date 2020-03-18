const express = require("express");
const { File, Folder } = require("../db");

const router = express.Router();

createFile = async (req, res) => {
  try {
    const { parent, name, data } = req.body;
    const newFile = new File({
      name,
      data: data || "",
      parent: parent || (await Folder.find({ name: "C" }))
    });
    await newFile.save();
    res.status(201).json(newFile);
  } catch (err) {
    console.log(err);
    res.status(500).json({ err: "Please try your request again." });
  }
};

updateFile = async (req, res) => {};

deleteFile = async (req, res) => {};

getFile = async (req, res) => {};

router.post("/", createFile);

module.exports = router;
