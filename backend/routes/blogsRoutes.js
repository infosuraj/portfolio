const express = require("express");
const Blog = require("../models/blogs"); 

const router = express.Router();

module.exports = (authenticateAdmin) => {
  
  router.get("/", async (req, res) => {
    try {
      let blogs;
      const { limit } = req.query;

      if (!isNaN(limit) && limit > 0) {
        blogs = await Blog.find({}).sort({ createdAt: -1 }).limit(Number(limit));
      } else {
        blogs = await Blog.find({});
      }
      res.status(200).json(blogs);
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error fetching blogs", error: error.message });
    }
  });

  
  router.post("/", authenticateAdmin, async (req, res) => {
    try {
      const data = req.body;

      
      if (!data.title || !data.date || !data.author || !data.image || !data.link) {
        return res
          .status(400)
          .json({ message: "Missing required fields: title, date, author, image, and link are required." });
      }

      const newBlog = new Blog(data);
      const savedBlog = await newBlog.save();
      res.status(201).json(savedBlog);
    } catch (err) {
      res
        .status(500)
        .json({ message: "Error saving blog", error: err.message });
    }
  });

  
  router.put("/:_id", authenticateAdmin, async (req, res) => {
    try {
      const updatedBlog = await Blog.findByIdAndUpdate(
        req.params._id,
        req.body,
        { new: true, runValidators: true } 
      );
      if (!updatedBlog) {
        return res.status(404).json({ message: "Blog entry not found" });
      }
      res.status(200).json(updatedBlog);
    } catch (err) {
      if (err.name === "CastError") {
        return res.status(400).json({ message: "Invalid Blog ID format." });
      }
      res
        .status(500)
        .json({ message: "Error updating blog", error: err.message });
    }
  });

  
  router.delete("/:_id", authenticateAdmin, async (req, res) => {
    try {
      const deletedBlog = await Blog.findByIdAndDelete(req.params._id);
      if (!deletedBlog) {
        return res.status(404).json({ message: "Blog entry not found" });
      }
      res
        .status(200)
        .json({ message: "Blog entry deleted", deletedBlog: deletedBlog });
    } catch (err) {
      if (err.name === "CastError") {
        return res.status(400).json({ message: "Invalid Blog ID format." });
      }
      res
        .status(500)
        .json({ message: "Error deleting blog", error: err.message });
    }
  });

  return router;
};