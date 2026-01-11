import laga from "../assets/laga.png";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  return (
    <nav className="w-full flex items-center justify-between px-6 py-4">
      
      <div className="flex items-center space-x-2">
        <img src={laga} alt="" className="h-12 w-12" />
        <span className="font-semibold text-lg">Engineering Blogs</span>
      </div>

      
      <div className="flex-1 max-w-md mx-6">
        <input
          type="text"
          placeholder="Search here"
          className="w-full px-4 py-2 rounded-lg border border-gray-600 focus:outline"
        />
      </div>

      
      <div className="space-x-3">
        <button
          onClick={() => navigate("/login")}
          className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300"
        >
          Login
        </button>
        <button
          onClick={() => navigate("/signup")}
          className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
        >
          Sign Up
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
