const mongoose = require("mongoose");
const File = require("./models/file");
const Folder = require("./models/folder");
const Desktop = require("./models/desktop");
const DesktopIcon = require("./models/desktopIcon");

const connectionString = "mongodb://localhost:27017/windowsMock";

const options = { useNewUrlParser: true };

mongoose.connect(connectionString, options);

module.exports = {
  File,
  Folder,
  Desktop,
  DesktopIcon
};
