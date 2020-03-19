const mongoose = require("mongoose");

const { Schema } = mongoose;

const windowSchema = new Schema({
  iconList: [{ type: Schema.Types.ObjectId, ref: "Icon" }]
});

module.exports = mongoose.model("Window", windowSchema);
