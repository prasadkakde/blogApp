import React from "react";
import { recentBlog } from "../../../data/blog";
import Card from "../../../components/ui/Card";


function RecentBlog() {
  return (
    <section className="py-12 bg-gray-100">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-2xl font-bold text-center mb-8">
          Our Recent Blogs
        </h2>

        <div className="grid grid-cols-4 gap-6">
          
          <div >
            <div className=" h-full rounded-lg flex items-center justify-center ">
              <p className="text-lg font-semibold text-gray-800">Advertisement</p>
            </div>
          </div>

        
          <div className="col-span-3 grid grid-cols-2 gap-6 ">
            {recentBlog.map((blog) => (
  <Card
    key={blog.id}
    title={blog.title}
    excerpt={blog.excerpt}
    author={blog.author}
    image={blog.image}
  />
))}

          </div>
        </div>
      </div>
    </section>
  );
}

export default RecentBlog;
