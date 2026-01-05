import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const BlogDetails = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:3000/api/blog/getBlog/${id}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) setBlog(data.blog);
      });
  }, [id]);

  if (!blog) return <h1>Loading...</h1>;

  return (
    <div className="p-6 max-w-3xl mx-auto bg-white rounded shadow">
      <img
        src={blog.image}
        alt=""
        className="w-full h-60 object-cover rounded mb-4"
      />
      <h1 className="text-3xl font-bold mb-4">{blog.title}</h1>
      <p className="text-gray-700 mb-4">{blog.content}</p>
      <p className="text-gray-500">Posted on: {blog.createdAt?.slice(0, 10)}</p>
    </div>
  );
};

export default BlogDetails;
