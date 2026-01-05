import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate(); // for redirect

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:3000/api/auth/login", {
        email,
        password,
      });

      // Save token and user info in localStorage
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      alert("Login successful!");

      // Redirect to Home page
      navigate("/dashboard");
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.msg || "Login failed!");
    }
  };

  return (
    <div className="flex min-h-screen">
      <div className="w-1/2 flex items-center justify-center bg-white p-10"></div>

      <div className="w-1/2 flex items-center justify-center bg-white">
        <form
          onSubmit={handleSubmit}
          className="bg-gray-200 p-6 rounded-xl shadow-md w-80"
        >
          <h2 className="text-2xl font-bold mb-4">Login</h2>

          <input
            type="email"
            placeholder="Email"
            className="w-full p-2 border rounded mb-3"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full p-2 border rounded mb-3"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
