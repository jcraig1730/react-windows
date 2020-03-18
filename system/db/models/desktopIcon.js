const mongoose = require("mongoose");

const { Schema } = mongoose;

const desktopIconSchema = new Schema({
  item: Schema.Types.ObjectId,
  startX: Number,
  startY: Number
});

module.exports = mongoose.model("DesktopItem", desktopIconSchema);
