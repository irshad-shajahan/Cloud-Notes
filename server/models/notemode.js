const mongoose = require("mongoose");

const noteSchema = new mongoose.Schema(
  {
    userId: String,
    note: String,
  },
  {
    timestamps: true
  }
);

const noteModel = mongoose.model("notes",noteSchema)
module.exports = noteModel;