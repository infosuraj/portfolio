const express = require("express");
const Affiliate = require("../models/affiliates"); 

const router = express.Router();

module.exports = (authenticateAdmin) => {
  
  router.get("/", async (req, res) => {
    try {
      const { limit } = req.query;
      let affiliates;

      if (!isNaN(limit) && limit > 0) {
        affiliates = await Affiliate.find({}).sort({ createdAt: -1 }).limit(Number(limit));
      } else {
        affiliates = await Affiliate.find({});
      }
      res.status(200).json(affiliates);
    } catch (err) {
      res.status(500).json({ message: "Error fetching affiliates", error: err.message });
    }
  });

  
  router.post("/", authenticateAdmin, async (req, res) => {
    try {
      const data = req.body;

      
      if (!data.logo ||!data.title || !data.description || !data.image || !data.link) {
        return res.status(400).json({
          message: "Missing required fields: title, description, image, and link are required.",
        });
      }

      const newAffiliate = new Affiliate(data);
      const savedAffiliate = await newAffiliate.save();
      res.status(201).json(savedAffiliate);
    } catch (err) {
      res.status(500).json({ message: "Error saving affiliate", error: err.message });
    }
  });

  
  router.put("/:_id", authenticateAdmin, async (req, res) => {
    try {
      const updatedAffiliate = await Affiliate.findByIdAndUpdate(
        req.params._id,
        req.body,
        { new: true, runValidators: true }
      );
      if (!updatedAffiliate) {
        return res.status(404).json({ message: "Affiliate entry not found" });
      }
      res.status(200).json(updatedAffiliate);
    } catch (err) {
      if (err.name === "CastError") {
        return res.status(400).json({ message: "Invalid Affiliate ID format." });
      }
      res.status(500).json({ message: "Error updating affiliate", error: err.message });
    }
  });

  
  router.delete("/:_id", authenticateAdmin, async (req, res) => {
    try {
      const deletedAffiliate = await Affiliate.findByIdAndDelete(req.params._id);
      if (!deletedAffiliate) {
        return res.status(404).json({ message: "Affiliate entry not found" });
      }
      res.status(200).json({ message: "Affiliate entry deleted", deletedAffiliate });
    } catch (err) {
      if (err.name === "CastError") {
        return res.status(400).json({ message: "Invalid Affiliate ID format." });
      }
      res.status(500).json({ message: "Error deleting affiliate", error: err.message });
    }
  });

  return router;
};