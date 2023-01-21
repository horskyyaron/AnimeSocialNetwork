import React from "react";
import Navbar from "./Navbar";
import MyProfile from "./pages/MyProfile";
import Home from "./pages/Home";
import About from "./pages/About";
import Register from "./pages/Register";
import Login from "./pages/Login";
import { Route, Routes } from "react-router-dom";
import SearchBar from "./Components/SearchBar";

function App() {
  return (
    <>
      <Navbar />
      <div className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/myprofile" element={<MyProfile />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
