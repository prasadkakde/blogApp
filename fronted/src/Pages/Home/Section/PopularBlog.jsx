import React, { useEffect, useState } from "react";
import Card from "../../../components/ui/Card";
import axios from "axios";

function PopularBlogs() {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      const res = await axios.get("http://localhost:3000/api/blog/publicBlogs");
      if (res.data.success) {
        setBlogs(res.data.blogs);
      }
    };
    fetchBlogs();
  }, []);

  return (
    <section className="py-12 bg-gray-100">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-2xl font-bold text-center mb-8">Popular Blogs</h2>

        <div className="grid grid-cols-4 gap-6">

          <div>
            <div className="h-full rounded-lg flex items-center justify-center">
              <p className="text-lg font-semibold text-gray-800">Advertisement</p>
            </div>
          </div>

          <div className="col-span-3 grid grid-cols-2 gap-6">
           {blogs.slice(0, 4).map((blog) => (

              <Card
                key={blog._id}
                id={blog._id}
                title={blog.title}
                image={blog.image}
              />
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}

export default PopularBlogs;
