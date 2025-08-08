const mongoose = require("mongoose");

const skillItemSchema = new mongoose.Schema({
  icon: { type: String, required: false },
  value: { type: String, required: false },
  label: { type: String, required: false },
  description: { type: String, required: false },
});

const individualSkillProgressSchema = new mongoose.Schema({
  name: { type: String, required: false },
  progress: { type: Number, required: false },
});

// New schema for a skill category
const skillCategorySchema = new mongoose.Schema({
  categoryTitle: { type: String, required: true },
  skills: { type: [individualSkillProgressSchema], default: [] },
});

const skillsSchema = new mongoose.Schema(
  {
    items: { type: [skillItemSchema], default: [] },
    skillsProgress: { type: [skillCategorySchema], default: [] },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Skills", skillsSchema);