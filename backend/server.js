const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
require("dotenv").config();

// New, more secure upload routes
const imageKitUploadRoutes = require("./routes/imageKitUploadRoutes");

// Routes
const projectRoutes = require("./routes/projectRoutes");
const profileRoutes = require("./routes/profileRoutes");
const skillsRoutes = require("./routes/skillsRoutes");
const awardsRoutes = require("./routes/awardsRoutes");
const blogsRoutes = require("./routes/blogsRoutes");
const clientsRoutes = require("./routes/clientsRoutes");
const experiencesRoutes = require("./routes/experiencesRoutes");
const affiliatesRoutes = require("./routes/affiliatesRoutes");
const testimonialsRoutes = require("./routes/testimonialsRoutes");
const emailRoutes = require("./routes/emailRoutes");

// Generate secure random JWT secret at runtime
const SECRET_KEY = crypto.randomBytes(64).toString("hex");

// Persistent single-session token state
let currentToken = null; // Stores the currently valid token for a single active session
let lastActivityTime = null; // Stores the timestamp of the last activity

// Init
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("MongoDB connected successfully!"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Middleware to authenticate admin and handle session management
const authenticateAdmin = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Token missing" });
  }

  // 1. Check if the token matches the current server-side token (single session enforcement)
  if (token !== currentToken) {
    return res
      .status(401)
      .json({ message: "Session expired or invalidated. Please log in again." });
  }

  // 2. Check for inactivity (e.g., 30 minutes of no requests)
  const INACTIVITY_LIMIT_MS = 30 * 60 * 1000; // 30 minutes in milliseconds
  if (
    lastActivityTime &&
    Date.now() - lastActivityTime > INACTIVITY_LIMIT_MS
  ) {
    // If inactive, invalidate the session on the server
    currentToken = null;
    lastActivityTime = null;
    return res.status(401).json({
      message: "Session expired due to inactivity. Please log in again.",
    });
  }

  try {
    jwt.verify(token, SECRET_KEY);
    lastActivityTime = Date.now();
    next();
  } catch (err) {
    currentToken = null;
    lastActivityTime = null;
    return res
      .status(401)
      .json({ message: "Token expired or invalid. Please log in again." });
  }
};

app.post("/api/admin/login", async (req, res) => {
  const { username, password } = req.body;

  if (username !== process.env.ADMIN_USERNAME) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const isValid = await bcrypt.compare(password, process.env.ADMIN_PASSWORD_HASH);
  if (!isValid) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const token = jwt.sign({ username }, SECRET_KEY, { expiresIn: "30m" });
  currentToken = token;
  lastActivityTime = Date.now();
  return res.status(200).json({ message: "Login successful", token });
});

app.post("/api/admin/logout", authenticateAdmin, (req, res) => {
  const authHeader = req.headers["authorization"];
  const tokenToLogout = authHeader && authHeader.split(" ")[1];

  if (tokenToLogout === currentToken) {
    currentToken = null;
    lastActivityTime = null;
  }
  res.status(200).json({ message: "Logged out successfully" });
});

// Protected Routes
app.use("/api/projects", projectRoutes(authenticateAdmin));
app.use("/api/profile", profileRoutes(authenticateAdmin));
app.use("/api/skills", skillsRoutes(authenticateAdmin));
app.use("/api/awards", awardsRoutes(authenticateAdmin));
app.use("/api/blogs", blogsRoutes(authenticateAdmin));
app.use("/api/clients", clientsRoutes(authenticateAdmin));
app.use("/api/experiences", experiencesRoutes(authenticateAdmin));
app.use("/api/affiliates", affiliatesRoutes(authenticateAdmin));
app.use("/api/testimonials", testimonialsRoutes(authenticateAdmin));
app.use("/api/uploads", imageKitUploadRoutes(authenticateAdmin));

// Public Routes
app.use("/api/email", emailRoutes());

// Start Server
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
