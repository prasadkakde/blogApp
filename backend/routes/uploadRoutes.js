import express from "express";
import multer from "multer";
import path from "path";

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage });

router.post("/upload-image", upload.single("image"), (req, res) => {
  return res.json({
    success: true,
    imageUrl: `http://localhost:3000/uploads/${req.file.filename}`
  });
});

export default router;
