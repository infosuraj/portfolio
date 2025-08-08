const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    date: { type: String, required: true },
    author: { type: String, required: true },
    image: { type: String, required: true },
    link: { type: String, required: true },
    categories: { type: [String], default: [] },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Blog", blogSchema);