const mongoose = require("mongoose");

const { Schema } = mongoose;

const desktopSchema = new Schema({ iconList: [Schema.Types.ObjectId] });

module.exports = mongoose.model("Desktop", desktopSchema);
