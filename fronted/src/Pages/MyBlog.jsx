import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const MyBlog = () => {
  const [blogs, setBlogs] = useState([]);

  // 🔹 Function to remove HTML tags and show simple text
  const stripHTML = (html) => {
    const div = document.createElement("div");
    div.innerHTML = html;
    return div.textContent || div.innerText || "";
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.warn("No token found. Please login first.");
      return;
    }

    fetch("http://localhost:3000/api/blog/myBlogs", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) setBlogs(data.blogs);
        else console.error(data.msg);
      })
      .catch((err) => console.error(err));
  }, []);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure?");
    if (!confirmDelete) return;

    const token = localStorage.getItem("token");

    try {
      const res = await fetch(
        `http://localhost:3000/api/blog/deleteBlog/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await res.json();
      if (data.success) {
        alert("Blog deleted");
        setBlogs((prev) => prev.filter((b) => b._id !== id));
      } else {
        alert("Failed to delete");
      }
    } catch (err) {
      console.error(err);
      alert("Error deleting blog");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-2xl font-bold mb-6">My Blogs</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {blogs.map((blog) => (
          <div key={blog._id} className="bg-white p-4 rounded-lg shadow">
            {blog.image && (
              <img
                src={blog.image}
                alt="cover"
                className="w-full h-40 object-cover rounded-md mb-3"
              />
            )}

            <h2 className="text-lg font-semibold mb-2">{blog.title}</h2>

            {/* 🔹 Show content as plain text (no HTML tags) */}
            <p className="text-gray-600 mb-3">
              {stripHTML(blog.desc).slice(0, 150)}...
            </p>

            <div className="flex gap-3">
              <Link
                to={`/blog/${blog._id}`}
                className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
              >
                Read
              </Link>

              <Link
                to={`/edit-blog/${blog._id}`}
                className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
              >
                Edit
              </Link>

              <button
                onClick={() => handleDelete(blog._id)}
                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyBlog;
