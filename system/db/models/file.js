const mongoose = require("mongoose");

const { Schema } = mongoose;

const fileSchema = new Schema(
  {
    name: { type: String, required: true },
    parent: { type: Schema.Types.ObjectId },
    data: String,
    size: Number,
    type: String
  },
  { timestamps: true }
);

module.exports = mongoose.model("File", fileSchema);
