
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home/Home";
import Login from "./Pages/Auth/Login";
import Signup from "./Pages/Auth/Signup";
import Dashboard from "./Pages/Dashboard";
import CreateBlog from "./Pages/CreateBlog";
import BlogDetails from "./Pages/BlogDetails";
import MyBlog from "./Pages/MyBlog";
import './App.css'
import SingleBlog from "./Pages/SingleBlog";

 

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard/>} />
        <Route path="/createblog" element={<CreateBlog/>} />
         <Route path="/edit-blog/:id" element={<CreateBlog />}/> 
        <Route path="/MyBlog" element={<MyBlog/>} />
        <Route path="/blog/:id" element={<BlogDetails />} />
        <Route path="/blog/:id" element={<SingleBlog />} />


      </Routes>
    </Router>
  );
}

export default App;
