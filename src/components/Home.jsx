// src/pages/Home.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="basic-wrapper">
      {/* Top Right Levels Button */}
      <div className="top-nav">
        <div className="levels-dropdown-trigger">
          <button className="levels-button">Levels ⬇</button>
          <div className="levels-dropdown">
            <a onClick={() => navigate("/basic")}>🟡 Basic</a>
            <a onClick={() => navigate("/intermediate")}>🔵 Intermediate</a>
            <a onClick={() => navigate("/advanced")}>🔴 Advanced</a>
          </div>
        </div>
      </div>

      {/* Centered Content (SidebarLeft Contents as Main) */}
      <div className="basic-content centered">
        <div className="center-box">
          <h2 className="intro-heading">🚀 Welcome to Skill2Start</h2>
          <div className="home-options">
            <div className="home-option">📝 New Post</div>
            <div className="home-option">📄 Posts</div>
            <div className="home-option">🏭 Active Sector</div>
            <div className="home-option">🔖 Bookmark</div>
            <div className="home-option">📢 Report</div>
            <div className="home-option">🤝 Community</div>
          </div>
        </div>
      </div>
    </div>
  );
}
