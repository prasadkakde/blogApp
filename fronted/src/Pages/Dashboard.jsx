import React, { useState } from "react";
import RecentBlog from "./Home/Section/RecentBlog";
import laga from "../assets/laga.png";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";

function Dashboard () {
  const navigate = useNavigate();

  const [counts, setCounts] = useState([0, 0, 0, 0, 0]);

  const handleEmojiClick = (index) => {
    const newCounts = [...counts];
    newCounts[index] += 1;
    setCounts(newCounts);
  };

  const handleblog = () => {
    navigate("/Myblog");
  };

  return (
    <div className="w-full h-full flex flex-col bg-blue-100">
      
      <nav className="w-full flex items-center justify-between px-6 py-4 bg-white text-white relative">
  
        <div className="flex items-center space-x-2">
          <img src={laga} alt="" className="h-12 w-12" />
          <span className="font-semibold text-lg text-black">Engineering Blog</span>
        </div>

        <div className="flex-1 max-w-md mx-6 ">
          <input
            type="text"
            placeholder="Search here"
            className="w-full px-4 py-2 rounded-lg border border-gray-600  text-black"
          />
        </div>

        <div className="flex gap-8">
          <button onClick={() => navigate("/createBlog")} className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-800">
            Create Blog
          </button>
          <button onClick={handleblog} className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700">
            My Blog
          </button>
          <button onClick={() => navigate("/")} className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700">
            Log Out
          </button>
        </div>
      </nav>

      <section className="h-[400px] bg-gray-300 flex items-center justify-between px-10 ">
        <h1 className="text-3xl font-bold">Trending Blog</h1>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md shadow">
          Create new blog
        </button>
      </section>

      <section>
        <RecentBlog />
      </section>

      
      <section className="h-[300px] bg-white flex flex-col justify-center items-center">
        <h2 className="text-lg font-semibold mb-4">Rating Feedback</h2>

        <div className="flex justify-center gap-6">
          {["😞", "🙁", "😐", "🙂", "😁"].map((emoji, i) => (
            <div 
              key={i} 
              className="flex flex-col items-center cursor-pointer"
              onClick={() => handleEmojiClick(i)}
            >
              <span className="text-2xl">{emoji}</span>
              <span className="mt-1 text-sm">{counts[i]}</span>
            </div>
          ))}
        </div>
      </section>

      <footer>
        <Footer />
      </footer>
    </div>
  );
};

export default Dashboard;
