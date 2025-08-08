const express = require("express");
const Skills = require("../models/skills");

const router = express.Router();

module.exports = (authenticateAdmin) => {
  // GET all skills documents (usually there's only one)
  router.get("/", async (req, res) => {
    try {
      const { limit } = req.query;
      const skills = await Skills.find({})
        .sort({ createdAt: -1 })
        .limit(limit && !isNaN(limit) && limit > 0 ? Number(limit) : 0);
      res.status(200).json(skills);
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error fetching skills", error: error.message });
    }
  });

  // POST a new skills document (should only be one)
  router.post("/", authenticateAdmin, async (req, res) => {
    try {
      const existing = await Skills.findOne();
      if (existing) {
        return res
          .status(400)
          .json({ message: "Skills document already exists." });
      }

      const newSkills = new Skills(req.body);
      const savedSkills = await newSkills.save();
      res.status(201).json(savedSkills);
    } catch (err) {
      res
        .status(500)
        .json({ message: "Error saving skills", error: err.message });
    }
  });

  // PUT (update/replace) existing skills document - primarily for full array updates
  // This will replace the entire 'items' and 'skillsProgress' arrays.
  router.put("/:_id", authenticateAdmin, async (req, res) => {
    try {
      const { items, skillsProgress } = req.body; // Expecting the full updated arrays

      const updatedSkills = await Skills.findByIdAndUpdate(
        req.params._id,
        { $set: { items: items, skillsProgress: skillsProgress } }, // Use $set to replace arrays
        { new: true, runValidators: true }
      );

      if (!updatedSkills) {
        return res.status(404).json({ message: "Skills document not found" });
      }
      res.status(200).json(updatedSkills);
    } catch (err) {
      console.error("Error updating skills document:", err);
      if (err.name === "CastError") {
        return res.status(400).json({ message: "Invalid ID format in URL." });
      }
      res.status(500).json({ message: "Error updating skills", error: err.message });
    }
  });


  // --- PATCH Routes for UPDATING existing sub-documents (individual fields) ---
  // These are used when you want to update *just a few fields* of an existing sub-document.

  // PATCH (update) an individual item within the 'items' array
  router.patch("/:skillsDocId/items/:itemId", authenticateAdmin, async (req, res) => {
    const { skillsDocId, itemId } = req.params;
    const updates = req.body; // Expects fields like { icon, value, label, description }
    try {
      const updatedSkills = await Skills.findOneAndUpdate(
        { _id: skillsDocId, "items._id": itemId },
        {
          $set: {
            "items.$.icon": updates.icon,
            "items.$.value": updates.value,
            "items.$.label": updates.label,
            "items.$.description": updates.description,
          },
        },
        { new: true, runValidators: true }
      );

      if (!updatedSkills) {
        return res.status(404).json({ message: "Skills document or item not found." });
      }
      res.status(200).json({ message: "Skill item updated successfully.", updatedSkills });
    } catch (err) {
      if (err.name === "CastError") {
        return res.status(400).json({ message: "Invalid ID format in URL." });
      }
      res.status(500).json({ message: "Error updating skill item.", error: err.message });
    }
  });

  // PATCH (update) a skill category title within 'skillsProgress'
  router.patch("/:skillsDocId/skillsProgress/:categoryId", authenticateAdmin, async (req, res) => {
    const { skillsDocId, categoryId } = req.params;
    const { categoryTitle } = req.body; // Expecting { categoryTitle: "New Title" }
    try {
      const updatedSkills = await Skills.findOneAndUpdate(
        { _id: skillsDocId, "skillsProgress._id": categoryId },
        { $set: { "skillsProgress.$.categoryTitle": categoryTitle } },
        { new: true, runValidators: true }
      );

      if (!updatedSkills) {
        return res.status(404).json({ message: "Skills document or category not found." });
      }
      res.status(200).json({ message: "Skill category title updated successfully.", updatedSkills });
    } catch (err) {
      if (err.name === "CastError") {
        return res.status(400).json({ message: "Invalid ID format in URL." });
      }
      res.status(500).json({ message: "Error updating skill category title.", error: err.message });
    }
  });

  // PATCH (update) an individual skill's name or progress within a category
  router.patch(
    "/:skillsDocId/skillsProgress/:categoryId/skills/:skillId",
    authenticateAdmin,
    async (req, res) => {
      const { skillsDocId, categoryId, skillId } = req.params;
      const { name, progress } = req.body; // Expecting name and/or progress in the body

      try {
        const updatedSkills = await Skills.findOneAndUpdate(
          {
            _id: skillsDocId,
            "skillsProgress._id": categoryId,
            "skillsProgress.skills._id": skillId
          },
          {
            $set: {
              "skillsProgress.$[cat].skills.$[skill].name": name,
              "skillsProgress.$[cat].skills.$[skill].progress": progress
            }
          },
          {
            new: true,
            arrayFilters: [
              { "cat._id": categoryId },
              { "skill._id": skillId }
            ],
            runValidators: true
          }
        );

        if (!updatedSkills) {
          return res.status(404).json({ message: "Skills document, category, or skill not found." });
        }
        res.status(200).json({ message: "Skill item updated successfully.", updatedSkills });
      } catch (err) {
        if (err.name === "CastError") {
          return res.status(400).json({ message: "Invalid ID format in URL." });
        }
        res.status(500).json({ message: "Error updating skill item.", error: err.message });
      }
    }
  );

  // --- DELETE Routes for various levels ---

  // DELETE a skills document (entire document)
  router.delete("/:_id", authenticateAdmin, async (req, res) => {
    try {
      const deletedSkills = await Skills.findByIdAndDelete(req.params._id);
      if (!deletedSkills) {
        return res.status(404).json({ message: "Skills document not found" });
      }
      res.status(200).json({ message: "Skills document deleted", deletedSkills });
    } catch (err) {
      if (err.name === "CastError") {
        return res.status(400).json({ message: "Invalid Skills ID format." });
      }
      res.status(500).json({ message: "Error deleting skills", error: err.message });
    }
  });

  // DELETE an individual item from the 'items' array
  router.delete("/:skillsDocId/items/:itemId", authenticateAdmin, async (req, res) => {
    const { skillsDocId, itemId } = req.params;
    try {
      const updatedSkills = await Skills.findByIdAndUpdate(
        skillsDocId,
        { $pull: { items: { _id: itemId } } }, // Use $pull to remove by ID
        { new: true }
      );
      if (!updatedSkills) {
        return res.status(404).json({ message: "Skills document or item not found." });
      }
      res.status(200).json({ message: "Skill item removed successfully.", updatedSkills });
    } catch (err) {
      if (err.name === "CastError") {
        return res.status(400).json({ message: "Invalid ID format in URL." });
      }
      res.status(500).json({ message: "Error removing skill item.", error: err.message });
    }
  });

  // DELETE a skill category from the 'skillsProgress' array
  router.delete("/:skillsDocId/skillsProgress/:categoryId", authenticateAdmin, async (req, res) => {
    const { skillsDocId, categoryId } = req.params;
    try {
      const updatedSkills = await Skills.findByIdAndUpdate(
        skillsDocId,
        { $pull: { skillsProgress: { _id: categoryId } } }, // Use $pull to remove by ID
        { new: true }
      );

      if (!updatedSkills) {
        return res.status(404).json({ message: "Skills document or category not found." });
      }
      res.status(200).json({ message: "Skill category removed successfully.", updatedSkills });
    } catch (err) {
      if (err.name === "CastError") {
        return res.status(400).json({ message: "Invalid ID format in URL." });
      }
      res.status(500).json({ message: "Error removing skill category.", error: err.message });
    }
  });

  // DELETE an individual skill from within a category (nested skill)
  router.delete(
    "/:skillsDocId/skillsProgress/:categoryId/skills/:skillId",
    authenticateAdmin,
    async (req, res) => {
      const { skillsDocId, categoryId, skillId } = req.params;

      try {
        const updatedSkills = await Skills.findOneAndUpdate(
          { _id: skillsDocId, "skillsProgress._id": categoryId },
          { $pull: { "skillsProgress.$.skills": { _id: skillId } } },
          { new: true }
        );

        if (!updatedSkills) {
          return res.status(404).json({
            message: "Skills document, category, or skill not found.",
          });
        }

        res.status(200).json({
          message: "Individual skill removed successfully.",
          updatedSkills,
        });
      } catch (err) {
        if (err.name === "CastError") {
          return res.status(400).json({ message: "Invalid ID format in URL." });
        }
        res.status(500).json({
          message: "Error removing individual skill.",
          error: err.message,
        });
      }
    }
  );

  return router;
};