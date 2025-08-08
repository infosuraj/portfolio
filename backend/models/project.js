const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    date: { type: String, required: true },
    categories: { type: [String], default: [] },
    description: { type: String, required: true },
    task: { type: String, required: true },
    role: { type: [String], default: [] },
    client: String,
    categoryYear: String,
    liveSite: { type: String, default: "#" },

    // --- New Thumbnail Fields ---
    thumbnail: {
      smallScreen: { type: String, default: "" }, // URL for mobile/small screen thumbnail
      largeScreen: { type: String, default: "" }, // URL for desktop/larger screen thumbnail
    },
    // --- End New Thumbnail Fields ---

    gallery: { type: [String], default: [] }, // This remains for the main project image gallery
    selected: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Project", projectSchema);