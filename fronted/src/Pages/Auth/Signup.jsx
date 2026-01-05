import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate(); // for redirect

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:3000/api/auth/signup", {
        name,
        email,
        password,
      });

      alert("Signup successful! Please login.");
      navigate("/login"); // redirect to login page

    } catch (err) {
      console.error(err);
      alert(err.response?.data?.msg || "Signup failed!");
    }
  };

  return (
    <div className="flex min-h-screen">
      <div className="w-1/2 flex items-center justify-center bg-white p-10"></div>

      <div className="w-1/2 flex items-center justify-center bg-white">
        <form
          onSubmit={handleSubmit}
          className="bg-amber-50 p-6 rounded-xl shadow-md w-80"
        >
          <h2 className="text-2xl font-bold mb-4">Signup</h2>

          <input
            type="text"
            placeholder="Name"
            className="w-full p-2 border rounded mb-3"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

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

          <button className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-800">
            Signup
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
