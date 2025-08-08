const express = require("express");
const Client = require("../models/client");

const router = express.Router();

module.exports = (authenticateAdmin) => {
  
  router.get("/", async (req, res) => {
    try {
      const { limit } = req.query;
      let clients;
      if (!isNaN(limit) && limit > 0) {
        clients = await Client.find({}).sort({ createdAt: -1 }).limit(Number(limit));
      } else {
        clients = await Client.find({});
      }
      res.status(200).json(clients);
    } catch (error) {
      res.status(500).json({ message: "Error fetching clients", error: error.message });
    }
  });

  
  router.get("/:_id", async (req, res) => {
    try {
      const client = await Client.findById(req.params._id);
      if (!client) {
        return res.status(404).json({ message: `Client with ID ${req.params._id} not found.` });
      }
      res.status(200).json(client);
    } catch (error) {
      if (error.name === 'CastError') {
        return res.status(400).json({ message: "Invalid client ID format." });
      }
      res.status(500).json({ message: "Error fetching client", error: error.message });
    }
  });

  
  router.post("/", authenticateAdmin, async (req, res) => {
    try {
      const { link, clientImage } = req.body;
      if (!clientImage) {
        return res.status(400).json({ message: "Missing required field: clientImage" });
      }
      const newClient = new Client({ link, clientImage });
      const savedClient = await newClient.save();
      res.status(201).json(savedClient);
    } catch (err) {
      res.status(500).json({ message: "Error saving client", error: err.message });
    }
  });

  
  router.delete("/:_id", authenticateAdmin, async (req, res) => {
    try {
      const deleted = await Client.findByIdAndDelete(req.params._id);
      if (!deleted) return res.status(404).json({ message: "Client not found" });
      res.status(200).json({ message: "Client deleted", deletedClient: deleted });
    } catch (err) {
      if (err.name === 'CastError') {
        return res.status(400).json({ message: "Invalid client ID format." });
      }
      res.status(500).json({ message: "Error deleting client", error: err.message });
    }
  });

  return router;
};