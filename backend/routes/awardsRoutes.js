const express = require("express");
const Award = require("../models/awards"); 

const router = express.Router();

module.exports = (authenticateAdmin) => {
  
  router.get("/", async (req, res) => {
    try {
      let awards;
      const { limit } = req.query;

      if (!isNaN(limit) && limit > 0) {
        awards = await Award.find({}).sort({ createdAt: -1 }).limit(Number(limit));
      } else {
        awards = await Award.find({});
      }
      res.status(200).json(awards);
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error fetching awards", error: error.message });
    }
  });

  
  router.post("/", authenticateAdmin, async (req, res) => {
    try {
      const data = req.body;

      
      
      
      if (!data.title) {
        return res
          .status(400)
          .json({ message: "Missing required field: title" });
      }

      const newAward = new Award(data);
      const savedAward = await newAward.save();
      res.status(201).json(savedAward);
    } catch (err) {
      res
        .status(500)
        .json({ message: "Error saving award", error: err.message });
    }
  });

  
  router.put("/:_id", authenticateAdmin, async (req, res) => {
    try {
      const updatedAward = await Award.findByIdAndUpdate(
        req.params._id,
        req.body,
        { new: true, runValidators: true }
      );
      if (!updatedAward) {
        return res.status(404).json({ message: "Award not found" });
      }
      res.status(200).json(updatedAward);
    } catch (err) {
      if (err.name === "CastError") {
        return res.status(400).json({ message: "Invalid Award ID format." });
      }
      res
        .status(500)
        .json({ message: "Error updating award", error: err.message });
    }
  });

  
  router.delete("/:_id", authenticateAdmin, async (req, res) => {
    try {
      const deletedAward = await Award.findByIdAndDelete(req.params._id);
      if (!deletedAward) {
        return res.status(404).json({ message: "Award not found" });
      }
      res
        .status(200)
        .json({ message: "Award deleted", deletedAward: deletedAward });
    } catch (err) {
      if (err.name === "CastError") {
        return res.status(400).json({ message: "Invalid Award ID format." });
      }
      res
        .status(500)
        .json({ message: "Error deleting award", error: err.message });
    }
  });

  return router;
};