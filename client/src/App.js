import React from "react";
import Navbar from "./Navbar";
import MyProfile from "./pages/MyProfile";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import { Route, Routes } from "react-router-dom";
import SearchBar from "./Components/SearchBar";
import { useState } from "react";

export default function App() {
  const [user_id, setUserId] = useState(-1);
  const [user_name, setUserName] = useState("");
  const handleLogin = (user_name, user_id) => {
    setUserId(user_id);
    setUserName(user_name);
  };

  const handleSignUp = (user_name, user_id) => {
    setUserId(user_id);
    setUserName(user_name);
  };
  return (
    <>
      <Navbar user_name={user_name} />
      <div className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/myprofile" element={<MyProfile />} />
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          <Route
            path="/register"
            element={<Register onSignUp={handleSignUp} />}
          />
        </Routes>
      </div>
    </>
  );
}
