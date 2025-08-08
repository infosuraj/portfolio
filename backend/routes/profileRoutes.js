const express = require("express");
const Profile = require("../models/profile"); 

const router = express.Router();

module.exports = (authenticateAdmin) => {
  
  router.get("/", async (req, res) => {
    try {
      const profile = await Profile.findOne(); 
      if (!profile) {
        
        
        return res.status(200).json(null); 
      }
      res.status(200).json(profile);
    } catch (error) {
      console.error("Error fetching profile:", error);
      res.status(500).json({ message: "Error fetching profile", error: error.message });
    }
  });

  
  router.post("/", authenticateAdmin, async (req, res) => {
    try {
      
      const existingProfile = await Profile.findOne();
      if (existingProfile) {
        return res.status(409).json({ message: "Profile already exists. Use PUT to update it." });
      }

      const newProfile = new Profile(req.body);
      const savedProfile = await newProfile.save();
      res.status(201).json(savedProfile); 
    } catch (err) {
      console.error("Error creating profile:", err);
      
      if (err.name === 'ValidationError') {
        return res.status(400).json({ message: err.message });
      }
      res.status(500).json({ message: "Error creating profile", error: err.message });
    }
  });

  router.put("/:id", authenticateAdmin, async (req, res) => {
    try {
      const { id } = req.params; 
      
      
      const updatedProfile = await Profile.findByIdAndUpdate(
        { _id: id },
        req.body,
        { new: true, runValidators: true }
      );

      if (!updatedProfile) {
        return res.status(404).json({ message: "Profile not found for update." });
      }

      res.status(200).json(updatedProfile);
    } catch (err) {
      console.error("Error updating profile:", err);
      
      if (err.name === "CastError") {
        return res.status(400).json({ message: "Invalid Profile ID format." });
      }
      
      if (err.name === 'ValidationError') {
        return res.status(400).json({ message: err.message });
      }
      res.status(500).json({ message: "Error updating profile", error: err.message });
    }
  });
  return router;
};