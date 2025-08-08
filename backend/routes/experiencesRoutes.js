const express = require("express");
const Experience = require("../models/experiences");

const router = express.Router();

module.exports = (authenticateAdmin) => {
  
  router.get("/", async (req, res) => {
    try {
      const { limit } = req.query;
      const query = Experience.find({}).sort({ createdAt: -1 });
      if (!isNaN(limit) && limit > 0) {
        query.limit(Number(limit));
      }
      const experiences = await query.exec();
      res.status(200).json(experiences);
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error fetching experiences", error: error.message });
    }
  });

  
  router.get("/:_id", async (req, res) => {
    try {
      const experience = await Experience.findById(req.params._id);
      if (!experience) {
        return res
          .status(404)
          .json({ message: `Experience with ID ${req.params._id} not found.` });
      }
      res.status(200).json(experience);
    } catch (error) {
      if (error.name === "CastError") {
        return res
          .status(400)
          .json({ message: "Invalid Experience ID format." });
      }
      res
        .status(500)
        .json({ message: "Error fetching experience", error: error.message });
    }
  });

  
  router.post("/", authenticateAdmin, async (req, res) => {
    try {
      const { title, position, startDate, endDate, description } = req.body;
      if (!title || !position || !startDate || !endDate || !description) {
        return res.status(400).json({ message: "All fields are required." });
      }
      const newExperience = new Experience({
        title,
        position,
        startDate,
        endDate,
        description,
      });
      const savedExperience = await newExperience.save();
      res.status(201).json(savedExperience);
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error saving experience", error: error.message });
    }
  });

  
  router.put("/:_id", authenticateAdmin, async (req, res) => {
    try {
      const { title, position, startDate, endDate, description } = req.body;
      if (!title || !position || !startDate || !endDate || !description) {
        return res
          .status(400)
          .json({ message: "All fields are required for update." });
      }

      const updatedExperience = await Experience.findByIdAndUpdate(
        req.params._id,
        { title, position, startDate, endDate, description },
        { new: true, runValidators: true }
      );

      if (!updatedExperience) {
        return res.status(404).json({ message: "Experience not found." });
      }

      res
        .status(200)
        .json({ message: "Experience updated", updatedExperience });
    } catch (error) {
      if (error.name === "CastError") {
        return res
          .status(400)
          .json({ message: "Invalid Experience ID format." });
      }
      res
        .status(500)
        .json({ message: "Error updating experience", error: error.message });
    }
  });

  
  router.delete("/:_id", authenticateAdmin, async (req, res) => {
    try {
      const deleted = await Experience.findByIdAndDelete(req.params._id);
      if (!deleted) {
        return res.status(404).json({ message: "Experience not found" });
      }
      res
        .status(200)
        .json({ message: "Experience deleted", deletedExperience: deleted });
    } catch (error) {
      if (error.name === "CastError") {
        return res
          .status(400)
          .json({ message: "Invalid Experience ID format." });
      }
      res
        .status(500)
        .json({ message: "Error deleting experience", error: error.message });
    }
  });

  return router;
};
