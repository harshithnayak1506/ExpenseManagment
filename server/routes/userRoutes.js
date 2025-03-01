const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const router = express.Router();
const { v4: uuidv4 } = require("uuid");

// Register User
router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const existingUser = await User.findOne({ email });

    if (existingUser) return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ userId: uuidv4(), name, email, password: hashedPassword });

    await newUser.save();
    res.status(201).json({ message: "User registered successfully", userId: newUser.userId });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Login User
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) return res.status(400).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ userId: user.userId }, "SECRET_KEY", { expiresIn: "1h" });
    res.json({ message: "Login successful", token, userId: user.userId });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});




module.exports = router;
