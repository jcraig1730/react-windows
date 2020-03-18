const mongoose = require("mongoose");

const { Schema } = mongoose;

const folderSchema = new Schema(
  {
    name: { type: String, required: true },
    parent: { type: Schema.Types.ObjectId },
    contents: [Schema.Types.ObjectId],
    size: Number,
    type: String
  },
  { timestamps: true }
);

module.exports = mongoose.model("Folder", folderSchema);
