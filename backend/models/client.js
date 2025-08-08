const mongoose = require("mongoose");

const clientSchema = new mongoose.Schema(
  {
    link: { type: String, required: true },
    clientImage: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Client", clientSchema);