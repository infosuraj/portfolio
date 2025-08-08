const mongoose = require("mongoose");

const awardSchema = new mongoose.Schema(
  {
    title: { type: String, required: false },
    year: { type: String, required: false },
    award: { type: String, required: false },
    image: { type: String, required: false },
    description: { type: String, required: false },
    link: { type: String, required: false },
  },
  { timestamps: true } 
);

module.exports = mongoose.model("Award", awardSchema);