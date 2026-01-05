import Blog from "../models/Blog.js";
import jwt from "jsonwebtoken";

const getUserFromToken = (token) => {
  try {
    if (!token) return null;
    const decoded = jwt.verify(
      token.replace("Bearer ", "").trim(),
      process.env.JWT_SECRET || "somesecret"
    );
    return decoded.id;
  } catch (err) {
    return null;
  }
};


export const uploadBlog = async (req, res) => {
  try {
    const token = req.body.token || req.headers["authorization"] || "";
    const authorId = getUserFromToken(token);
    if (!authorId) return res.status(401).json({ success: false, msg: "Invalid token" });

    const { title, desc, content, image } = req.body;
    const blog = await Blog.create({
      title,
      desc,
      content,
      image, // image URL from frontend
      author: authorId,
    });

    return res.json({ success: true, msg: "Blog uploaded", blog });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, msg: err.message });
  }
};


export const getBlogs = async (req, res) => {
  try {
    const token = req.headers["authorization"] || "";
    const userId = getUserFromToken(token);
    if (!userId) return res.status(401).json({ success: false, msg: "Invalid token" });

    const blogs = await Blog.find({ author: userId }).sort({ createdAt: -1 });
    return res.json({ success: true, blogs });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, msg: err.message });
  }
};


export const getBlog = async (req, res) => {
  try {
    const blogId = req.params.id;   // ✅ Correct way to read URL param

    const blog = await Blog.findById(blogId).populate("author", "name email");

    if (!blog) {
      return res.json({ success: false, msg: "Blog not found" });
    }

    return res.json({ success: true, blog });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, msg: err.message });
  }
};

export const getPublicBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 });
    return res.json({ success: true, blogs });
  } catch (err) {
    return res.status(500).json({ success: false, msg: err.message });
  }
};




export const deleteBlog = async (req, res) => {
  try {
    const token = req.headers["authorization"] || req.body.token || "";
    const userId = getUserFromToken(token);
    const blogId = req.params.id;

    const blog = await Blog.findById(blogId);
    if (!blog) return res.json({ success: false, msg: "Blog not found" });

    if (!userId || blog.author.toString() !== userId)
      return res.json({ success: false, msg: "Not authorized" });

    await blog.deleteOne();
    return res.json({ success: true, msg: "Blog deleted" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, msg: err.message });
  }
};


export const editBlog = async (req, res) => {
  try {
    const token = req.headers["authorization"] || "";
    const userId = getUserFromToken(token);
    if (!userId) return res.status(401).json({ success: false, msg: "Invalid token" });

    const { id, title, desc, content, image } = req.body;
    const blog = await Blog.findById(id);
    if (!blog) return res.json({ success: false, msg: "Blog not found" });
    if (blog.author.toString() !== userId)
      return res.json({ success: false, msg: "Not authorized" });

    blog.title = title || blog.title;
    blog.desc = desc || blog.desc;
    blog.content = content || blog.content;
    blog.image = image || blog.image;

    await blog.save();
    return res.json({ success: true, msg: "Blog updated", blog });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, msg: err.message });
  }
};
