import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import blogRoutes from "./routes/blogRoutes.js";

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use("/uploads", express.static(path.join(__dirname, "uploads")));



app.use("/api/auth", authRoutes);
app.use("/api/blog", blogRoutes);
console.log("✅ Blog routes loaded");

app.use("/uploads", express.static("uploads"));

import uploadRoutes from "./routes/uploadRoutes.js";
app.use("/api", uploadRoutes);



app.get("/", (req, res) => res.send("Blog App Backend running"));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
