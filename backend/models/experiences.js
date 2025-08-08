const mongoose = require("mongoose");

const clientSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    position: { type: String, required: true },
    startDate: { type: String, required: true },
    endDate: { type: String, required: true },
    description: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Experience", clientSchema);