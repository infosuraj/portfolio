const express = require("express");
const Testimonial = require("../models/testimonials"); 

const router = express.Router();

module.exports = (authenticateAdmin) => {
  
  router.get("/", async (req, res) => {
    try {
      const { limit } = req.query;
      let testimonials;

      if (!isNaN(limit) && limit > 0) {
        testimonials = await Testimonial.find({})
          .sort({ createdAt: -1 })
          .limit(Number(limit));
      } else {
        testimonials = await Testimonial.find({});
      }

      res.status(200).json(testimonials);
    } catch (err) {
      res.status(500).json({ message: "Error fetching testimonials", error: err.message });
    }
  });

  
  router.post("/", authenticateAdmin, async (req, res) => {
    try {
      const { name, position, image, content } = req.body;

      
      if (!name || !position || !image || !content) {
        return res.status(400).json({
          message: "Missing required fields: name, position, image, and content are required.",
        });
      }

      const newTestimonial = new Testimonial({ name, position, image, content });
      const savedTestimonial = await newTestimonial.save();
      res.status(201).json(savedTestimonial);
    } catch (err) {
      res.status(500).json({ message: "Error saving testimonial", error: err.message });
    }
  });

  
  router.put("/:_id", authenticateAdmin, async (req, res) => {
    try {
      const updatedTestimonial = await Testimonial.findByIdAndUpdate(
        req.params._id,
        req.body,
        { new: true, runValidators: true }
      );

      if (!updatedTestimonial) {
        return res.status(404).json({ message: "Testimonial entry not found" });
      }

      res.status(200).json(updatedTestimonial);
    } catch (err) {
      if (err.name === "CastError") {
        return res.status(400).json({ message: "Invalid Testimonial ID format." });
      }
      res.status(500).json({ message: "Error updating testimonial", error: err.message });
    }
  });

  
  router.delete("/:_id", authenticateAdmin, async (req, res) => {
    try {
      const deletedTestimonial = await Testimonial.findByIdAndDelete(req.params._id);
      if (!deletedTestimonial) {
        return res.status(404).json({ message: "Testimonial entry not found" });
      }

      res.status(200).json({ message: "Testimonial entry deleted", deletedTestimonial });
    } catch (err) {
      if (err.name === "CastError") {
        return res.status(400).json({ message: "Invalid Testimonial ID format." });
      }
      res.status(500).json({ message: "Error deleting testimonial", error: err.message });
    }
  });

  return router;
};