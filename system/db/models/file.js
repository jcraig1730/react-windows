const mongoose = require("mongoose");

const { Schema } = mongoose;

const fileSchema = new Schema(
  {
    name: { type: String, required: true },
    parent: { type: Schema.Types.ObjectId, ref: "File" },
    size: Number,
    type: String,
    children: [{ type: Schema.Types.ObjectId, ref: "File" }],
    data: String
  },
  { timestamps: true }
);

module.exports = mongoose.model("File", fileSchema);
