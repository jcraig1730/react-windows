const mongoose = require("mongoose");
const File = require("./models/file");
const Window = require("./models/window");
const Icon = require("./models/icon");

const connectionString = "mongodb://localhost:27017/windowsMock";

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: true
};

mongoose.connect(connectionString, options);

module.exports = {
  File,
  Window,
  Icon
};
