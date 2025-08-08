const mongoose = require("mongoose");

const affiliateSchema = new mongoose.Schema(
  {
    logo: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String, required: true },
    link: { type: String, required: true },
    categories: { type: [String], default: [] },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Affiliate", affiliateSchema);