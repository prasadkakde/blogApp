import mongoose from "mongoose";

const blogSchema = new mongoose.Schema({
  title: { type: String, required: true },
  desc: { type: String },
  content: { type: String },
  image: { type: String , required: true},
  author: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
}, { timestamps: true });

export default mongoose.model("Blog", blogSchema);
