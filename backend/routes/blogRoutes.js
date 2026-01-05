import express from "express";
import {
  uploadBlog,
  getBlogs,
  getBlog,
  deleteBlog,
  editBlog,
  getPublicBlogs
} from "../controllers/blogController.js";
import userAuth from "../middleware/auth.js"; // ✅ Add this line


const router = express.Router();


router.post("/uploadBlog", userAuth, uploadBlog);
router.delete("/deleteBlog/:id", userAuth, deleteBlog);
router.put("/editBlog/:id", userAuth, editBlog);
router.get("/myBlogs", userAuth, getBlogs);
router.get("/publicBlogs", getPublicBlogs);




router.get("/getBlogs", getBlogs);
router.get("/getBlog/:id", getBlog);

export default router;
