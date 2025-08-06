// File: src/components/Topbar.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaBars, FaUser } from "react-icons/fa";
import "./Topbar.css";

export default function Topbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleNavigate = (path) => {
    navigate(path);
    setMenuOpen(false); // Close menu after navigating
  };

  return (
    <div className="topbar">
      <div className="topbar-top-blue"></div>
      <div className="topbar-main">
        <FaBars
          className="hamburger"
          onClick={() => setMenuOpen((prev) => !prev)}
        />
        {menuOpen && (
          <div className="dropdown">
            <div onClick={() => handleNavigate("/basic")}>Basic</div>
            <div onClick={() => handleNavigate("/intermediate")}>Intermediate</div>
            <div onClick={() => handleNavigate("/advanced")}>Advanced</div>
          </div>
        )}
        <h1 className="title">Skill2Start</h1>
        <div className="topbar-right">
          <FaUser
            className="profile-icon"
            onClick={() => navigate("/profile/create")}
          />
        </div>
      </div>
    </div>
  );
}
