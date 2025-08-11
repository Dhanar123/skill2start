// src/pages/Home.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../firebase";
import { doc, setDoc } from "firebase/firestore";

export default function Home() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState([]);
  const [userMessage, setUserMessage] = useState("");

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

  const sendChatMessage = async () => {
    if (!userMessage.trim()) return;

    // Add user message to chat
    const updatedMessages = [...chatMessages, { sender: "user", text: userMessage }];
    setChatMessages(updatedMessages);

    setUserMessage("");

    // Add a temporary "Thinking..." message
    setChatMessages((prev) => [...prev, { sender: "bot", text: "Thinking..." }]);

    try {
      const response = await fetch("https://skill2start-backend-2.onrender.com", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMessage }),
      });

      const data = await response.json();

      // Replace "Thinking..." with the actual bot reply
      setChatMessages((prev) => {
        const msgs = prev.slice(0, -1); // Remove last "Thinking..."
        msgs.push({ sender: "bot", text: data.reply || "Sorry, no response." });
        return msgs;
      });
    } catch (error) {
      // Replace "Thinking..." with error message
      setChatMessages((prev) => {
        const msgs = prev.slice(0, -1);
        msgs.push({ sender: "bot", text: "Error: Unable to get response." });
        return msgs;
      });
      console.error("Chatbot API error:", error);
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

      {/* Profile creation */}
      <div
        style={{
          marginBottom: "30px",
          padding: "20px",
          borderRadius: "10px",
          backgroundColor: "transparent",
          boxShadow: "none",
          maxWidth: "400px",
          margin: "0 auto",
        }}
      >
        <h3 style={{ color: "#1e3a8a", marginBottom: "15px", textAlign: "center" }}>
          👤 Create Profile
        </h3>
        <input
          type="text"
          placeholder="Enter your Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={{
            ...inputStyle,
            marginBottom: "12px",
          }}
        />
        <input
          type="email"
          placeholder="Enter your Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{
            ...inputStyle,
            marginBottom: "12px",
          }}
        />
        <button onClick={handleLogin} style={saveBtnStyle}>
          Save
        </button>
      </div>

      {/* Welcome and Navigation */}
      <h2 style={{ textAlign: "center", marginBottom: "20px" }}>
        🚀 Welcome to Skill2Start
      </h2>
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

      {/* Floating Chatbot */}
      <div style={chatbotWrapper}>
        {chatOpen && (
          <div style={chatWindow}>
            <div style={chatHeader}>💬 Entrepreneurship Assistant</div>
            <div style={chatBody}>
              {chatMessages.map((msg, i) => (
                <div
                  key={i}
                  style={{
                    textAlign: msg.sender === "user" ? "right" : "left",
                    margin: "5px 0",
                  }}
                >
                  <span
                    style={{
                      display: "inline-block",
                      backgroundColor: msg.sender === "user" ? "#1e3a8a" : "#e0f2fe",
                      color: msg.sender === "user" ? "white" : "#1e3a8a",
                      padding: "6px 10px",
                      borderRadius: "8px",
                      maxWidth: "80%",
                    }}
                  >
                    {msg.text}
                  </span>
                </div>
              ))}
            </div>
            <div style={chatInputWrapper}>
              <input
                type="text"
                value={userMessage}
                onChange={(e) => setUserMessage(e.target.value)}
                placeholder="Ask about entrepreneurship..."
                style={chatInput}
                onKeyDown={(e) => {
                  if (e.key === "Enter") sendChatMessage();
                }}
              />
              <button onClick={sendChatMessage} style={chatSendBtn}>Send</button>
            </div>
          </div>
        )}

        <button style={chatToggleBtn} onClick={() => setChatOpen(!chatOpen)}>
          💬
        </button>
      </div>
    </div>
  );
}

// === Styles ===
const fixedTopRight = {
  position: "fixed",
  top: "16px",
  right: "16px",
  zIndex: 999,
};

const levelsButtonStyle = {
  backgroundColor: "#1e3a8a",
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
  border: "1px solid #1e3a8a",
  borderRadius: "6px",
  boxShadow: "0 0 10px rgba(0,0,0,0.1)",
  zIndex: 1000,
  minWidth: "150px",
};

const dropdownItemStyle = {
  padding: "10px 14px",
  borderBottom: "1px solid #eee",
  color: "#1e3a8a",
  cursor: "pointer",
  fontSize: "14px",
};

const menuOptionsStyle = {
  display: "flex",
  flexDirection: "column",
  gap: "10px",
  marginTop: "20px",
};

const homeBtnStyle = {
  backgroundColor: "white",
  border: "1px solid #1e3a8a",
  color: "#1e3a8a",
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
  backgroundColor: "#1e3a8a",
  color: "white",
  padding: "10px 20px",
  border: "none",
  borderRadius: "6px",
  marginTop: "10px",
  cursor: "pointer",
};

// === Chatbot Styles ===
const chatbotWrapper = {
  position: "fixed",
  bottom: "20px",
  right: "20px",
  zIndex: 999,
};

const chatToggleBtn = {
  backgroundColor: "#1e3a8a",
  color: "white",
  border: "none",
  borderRadius: "50%",
  width: "50px",
  height: "50px",
  fontSize: "22px",
  cursor: "pointer",
  boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
};

const chatWindow = {
  position: "fixed",
  bottom: "80px",
  right: "20px",
  width: "300px",
  height: "400px",
  backgroundColor: "white",
  border: "1px solid #ccc",
  borderRadius: "10px",
  display: "flex",
  flexDirection: "column",
  boxShadow: "0 4px 15px rgba(0,0,0,0.2)",
};

const chatHeader = {
  backgroundColor: "#1e3a8a",
  color: "white",
  padding: "10px",
  borderTopLeftRadius: "10px",
  borderTopRightRadius: "10px",
  fontWeight: "bold",
};

const chatBody = {
  flex: 1,
  padding: "10px",
  overflowY: "auto",
  fontSize: "14px",
};

const chatInputWrapper = {
  display: "flex",
  borderTop: "1px solid #ccc",
};

const chatInput = {
  flex: 1,
  border: "none",
  padding: "8px",
  outline: "none",
};

const chatSendBtn = {
  backgroundColor: "#1e3a8a",
  color: "white",
  border: "none",
  padding: "8px 12px",
  cursor: "pointer",
};