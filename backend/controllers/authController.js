import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";


export const signUp = async (req, res) => {
  try {
    const { username, name, email, password } = req.body;

    
    if (!email || !password || !name) {
      return res.status(400).json({ success: false, msg: "Missing required fields" });
    }

    
    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(400).json({ success: false, msg: "User already exists" });
    }

    
    const hashedPassword = await bcrypt.hash(password, 10);

    
    const user = await User.create({
      username,
      name,
      email,
      password: hashedPassword,
    });

    
    res.json({
      success: true,
      msg: "User registered successfully",
      user: { id: user._id, name: user.name, email: user.email },
    });
  } catch (err) {
    console.error("Signup error:", err);
    res.status(500).json({ success: false, msg: err.message });
  }
};


export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    
    if (!email || !password) {
      return res.status(400).json({ success: false, msg: "Email and password required" });
    }

    
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ success: false, msg: "User not found" });
    }

    
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ success: false, msg: "Invalid credentials" });
    }

    
    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET || "somesecret",
      { expiresIn: "1d" }
    );

    
    res.json({
      success: true,
      msg: "Login successful",
      token,
      user: { id: user._id, name: user.name, email: user.email },
    });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ success: false, msg: err.message });
  }
};
