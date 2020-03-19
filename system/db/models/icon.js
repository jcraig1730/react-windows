const mongoose = require("mongoose");

const { Schema } = mongoose;

const iconSchema = new Schema({
  file: { type: Schema.Types.ObjectId, ref: "File" },
  startX: Number,
  startY: Number
});

module.exports = mongoose.model("Icon", iconSchema);
