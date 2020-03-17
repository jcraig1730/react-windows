const mongoose = require("mongoose");

const { Schema } = mongoose;

const folderSchema = new Schema({
  name: { type: String, required },
  contents: [Schema.Types.ObjectId],
  location: { type: String, required }
});
