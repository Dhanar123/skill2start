// src/pages/Home.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../firebase";
import { doc, setDoc } from "firebase/firestore";

export default function Home() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const [name, setName] = useState(localStorage.getItem("username") || "");
  const [email, setEmail] = useState("");

  const handleLogin = async () => {
    if (name && email) {
      localStorage.setItem("username", name);
      try {
        await setDoc(doc(db, "users", email), {
          name,
          email,
          createdAt: new Date(),
        });
        alert("Welcome, " + name + " 🎉");
      } catch (error) {
        console.error("Firebase Error:", error);
        alert("Error saving to Firebase!");
      }
    } else {
      alert("Please enter both name and email.");
    }
  };
return (
  <div className="basic-wrapper">
    {/* Top-right LEVELS button */}
    <div style={fixedTopRight}>
      <button
        style={levelsButtonStyle}
        onClick={() => setDropdownOpen(!dropdownOpen)}
      >
        ☰ LEVELS
      </button>
      {dropdownOpen && (
        <div style={levelsDropdownStyle}>
          <div
            style={dropdownItemStyle}
            onClick={() => {
              navigate("/basic");
              setDropdownOpen(false);
            }}
          >
            🟡 Basic
          </div>
          <div
            style={dropdownItemStyle}
            onClick={() => {
              navigate("/intermediate");
              setDropdownOpen(false);
            }}
          >
            🔵 Intermediate
          </div>
          <div
            style={dropdownItemStyle}
            onClick={() => {
              navigate("/advanced");
              setDropdownOpen(false);
            }}
          >
            🔴 Advanced
          </div>
        </div>
      )}
    </div>

    {/* Center Block */}
    <div style={centerBoxWrapper}>
      {/* 🔼 Create Profile - Now at the Top */}
      <div style={{ marginBottom: "30px" }}>
        <h3 style={{ color: "#003366", marginBottom: "10px" }}>
          👤 Create Profile
        </h3>
        <input
          type="text"
          placeholder="Enter your Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={inputStyle}
        />
        <input
          type="email"
          placeholder="Enter your Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={inputStyle}
        />
        <button onClick={handleLogin} style={saveBtnStyle}>
          Save
        </button>
      </div>

      {/* 🔽 Welcome and Navigation */}
      <h2>🚀 Welcome to Skill2Start</h2>
      <div style={menuOptionsStyle}>
        <button onClick={() => navigate("/newpost")} style={homeBtnStyle}>
          📝 New Post
        </button>
        <button onClick={() => navigate("/posts")} style={homeBtnStyle}>
          📄 Posts
        </button>
        <button onClick={() => navigate("/activesector")} style={homeBtnStyle}>
          🏭 Active Sector
        </button>
        <button onClick={() => navigate("/bookmark")} style={homeBtnStyle}>
          🔖 Bookmarks
        </button>
        <button onClick={() => navigate("/community")} style={homeBtnStyle}>
          🤝 Community
        </button>
      </div>
    </div>
  </div>
);
}
// === Inline Styles ===
const fixedTopRight = {
  position: "fixed",
  top: "16px",
  right: "16px",
  zIndex: 999,
};

const levelsButtonStyle = {
  backgroundColor: "#FFA500",
  color: "white",
  padding: "10px 14px",
  border: "none",
  borderRadius: "6px",
  fontSize: "16px",
  cursor: "pointer",
};

const levelsDropdownStyle = {
  position: "absolute",
  top: "42px",
  right: "0",
  backgroundColor: "white",
  border: "1px solid #FFA500",
  borderRadius: "6px",
  boxShadow: "0 0 10px rgba(0,0,0,0.1)",
  zIndex: 1000,
  minWidth: "150px",
};

const dropdownItemStyle = {
  padding: "10px 14px",
  borderBottom: "1px solid #eee",
  color: "#FFA500",
  cursor: "pointer",
  fontSize: "14px",
};

const centerBoxWrapper = {
  maxWidth: "500px",
  margin: "60px auto 0",
  padding: "30px",
  backgroundColor: "#fff4cc",
  borderRadius: "10px",
  textAlign: "center",
  boxShadow: "0 0 8px rgba(0,0,0,0.05)",
};

const menuOptionsStyle = {
  display: "flex",
  flexDirection: "column",
  gap: "10px",
  marginTop: "20px",
};

const homeBtnStyle = {
  backgroundColor: "white",
  border: "1px solid #FFA500",
  color: "#FFA500",
  padding: "10px",
  borderRadius: "6px",
  cursor: "pointer",
  fontSize: "15px",
};

const inputStyle = {
  display: "block",
  width: "90%",
  margin: "8px auto",
  padding: "10px",
  border: "1px solid #ccc",
  borderRadius: "6px",
};

const saveBtnStyle = {
  backgroundColor: "#003366",
  color: "white",
  padding: "10px 20px",
  border: "none",
  borderRadius: "6px",
  marginTop: "10px",
  cursor: "pointer",
};