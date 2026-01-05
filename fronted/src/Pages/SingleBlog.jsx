import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function SingleBlog() {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);

  // 🔹 Convert HTML → Plain Text
  const stripHTML = (html) => {
    const div = document.createElement("div");
    div.innerHTML = html;
    return div.textContent || div.innerText || "";
  };

  useEffect(() => {
    const loadBlog = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/blog/getBlog/${id}`
        );
        if (res.data.success) {
          setBlog(res.data.blog);
        }
      } catch (err) {
        console.error(err);
      }
    };
    loadBlog();
  }, [id]);

  if (!blog) return <p>Loading...</p>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Title */}
      <h1 className="text-3xl font-bold">{blog.title}</h1>

      {/* Image */}
      {blog.image && (
        <img
          src={blog.image}
          alt={blog.title}
          className="w-full h-60 object-cover rounded-lg my-4"
        />
      )}

      {/* 🔥 Show clean plain text instead of HTML tags */}
      <div className="mt-4 text-lg text-gray-700 whitespace-pre-line">
        {stripHTML(blog.content)}
      </div>
    </div>
  );
}

export default SingleBlog;
