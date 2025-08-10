import React, { useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../firebase";
import {
  doc,
  getDoc,
  getDocs,
  collection,
  addDoc,
  query,
  where,
} from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import "../App.css";

export default function Advanced() {
  const [selectedOption, setSelectedOption] = useState("");
  const [isEntrepreneur, setIsEntrepreneur] = useState(false);
  const [entrepreneurs, setEntrepreneurs] = useState([]);
  const [currentUserEmail, setCurrentUserEmail] = useState(null);
  const [appliedCount, setAppliedCount] = useState(0);
  const [funds, setFunds] = useState([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setCurrentUserEmail(user.email);
        const docRef = doc(db, "entrepreneurs", user.email);
        const docSnap = await getDoc(docRef);
        setIsEntrepreneur(docSnap.exists());

        const q = query(
          collection(db, "internshipApplications"),
          where("applicant", "==", user.email)
        );
        const snap = await getDocs(q);
        setAppliedCount(snap.size);
      } else {
        setCurrentUserEmail(null);
        setIsEntrepreneur(false);
      }
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const fetchEntrepreneurs = async () => {
      const q = query(
        collection(db, "entrepreneurs"),
        where("registered", "==", true)
      );
      const snapshot = await getDocs(q);
      const list = snapshot.docs.map((doc) => doc.data());
      setEntrepreneurs(list);
    };
    fetchEntrepreneurs();
  }, []);

  useEffect(() => {
    const fetchFunds = async () => {
      const snapshot = await getDocs(collection(db, "funds"));
      const list = snapshot.docs.map((doc) => doc.data());
      setFunds(list);
    };
    fetchFunds();
  }, []);

  const handleApply = async (entrepreneurEmail) => {
    if (!currentUserEmail) return;
    try {
      await addDoc(collection(db, "internshipApplications"), {
        applicant: currentUserEmail,
        to: entrepreneurEmail,
        appliedAt: new Date(),
      });
      alert("✅ Application sent!");
      setAppliedCount(appliedCount + 1);
    } catch (err) {
      console.error("Error applying:", err);
      alert("❌ Failed to apply");
    }
  };

  const renderContent = () => {
    if (!selectedOption) {
  return (
    <div
      className="content-box"
      style={{
        backgroundColor: "#dbeafe",
        padding: "20px",
        borderRadius: "8px"
      }}
    >
      <h2 className="intro-heading">🚀 Advanced Section</h2>
      <p className="intro-text">
        Access private & government funding 💰, explore verified entrepreneurs 👤,
        apply for internships 🤝, and stay updated with startup insights 📢 — all in one place!
      </p>
    </div>
  );
}

    switch (selectedOption) {
      case "entrepreneur":
        return (
          <>
            <h2 className="section-heading">👤 Registered Entrepreneurs</h2>
            <div className="card-grid">
              {entrepreneurs.length === 0 ? (
                <p>No entrepreneurs found.</p>
              ) : (
                entrepreneurs.map((e, index) => (
                  <div key={index} className="card-style">
                    <p><strong>👤 Name:</strong> {e.name}</p>
                    <p><strong>📧 Email:</strong> {e.email}</p>
                    {currentUserEmail === e.email ? (
                      <p style={{ color: "gray" }}>🔒 This is your profile</p>
                    ) : (
                      <button
                        className="apply-button"
                        style={{
                          backgroundColor: appliedCount >= 5 ? "#1e3a8a" : "#003366",
                          cursor: appliedCount >= 5 ? "not-allowed" : "pointer",
                        }}
                        disabled={appliedCount >= 5}
                        onClick={() => handleApply(e.email)}
                      >
                        {appliedCount >= 5 ? "Premium Required" : "Apply Now"}
                      </button>
                    )}
                  </div>
                ))
              )}
            </div>
          </>
        );

      case "fund":
        return (
          <>
            <h2 className="section-heading">📊 Available Funds</h2>
            <div className="card-grid">
              {funds.length === 0 ? (
                <p>No funds available.</p>
              ) : (
                funds.map((fund, index) => (
                  <div key={index} className="card-style">
                    <h3 style={{ color: "#003366" }}>{fund.name}</h3>
                    <p><strong>Type:</strong> {fund.type}</p>
                    <p>{fund.description}</p>
                    {fund.applyLink && fund.applyLink.startsWith("http") ? (
                      <a
  href={fund.applyLink}
  target="_blank"
  rel="noopener noreferrer"
  className="apply-fund-button"
  style={{
    display: "inline-block",
    padding: "10px 18px",
    background: "linear-gradient(135deg, #1e3a8a, #3b82f6)",
    color: "white",
    fontWeight: "bold",
    borderRadius: "8px",
    textDecoration: "none",
    transition: "all 0.3s ease",
    boxShadow: "0 4px 8px rgba(0,0,0,0.15)",
  }}
  onMouseEnter={(e) => {
    e.target.style.transform = "scale(1.05)";
    e.target.style.boxShadow = "0 6px 12px rgba(0,0,0,0.25)";
  }}
  onMouseLeave={(e) => {
    e.target.style.transform = "scale(1)";
    e.target.style.boxShadow = "0 4px 8px rgba(0,0,0,0.15)";
  }}
>
   Apply Now
</a>
                    ) : (
                      <p style={{ color: "red", fontWeight: "bold" }}>
                        🔗 Application link not available
                      </p>
                    )}
                  </div>
                ))
              )}
            </div>
          </>
        );

      case "info":
        return (
          <div className="content-box">
            <h2 className="section-heading">📄 Compensation Info</h2>
            <p>
              Funds issued by Entrepreneurs through Skill2Start take a small commission: <b>2.75% - 5%</b>
            </p>
          </div>
        );

      case "notification":
        return (
          <div className="content-box">
            <h2 className="section-heading">📬 Entrepreneur-only Notifications</h2>
            <p>Notification system coming soon...</p>
          </div>
        );

      default:
        return <div>Select an option from the menu</div>;
    }
  };

  return (
    <div className="basic-wrapper">
      {/* LEVELS Dropdown with Home */}
      <div style={fixedTopRight}>
        <button
          style={levelsButtonStyle}
          onClick={() => setDropdownOpen(!dropdownOpen)}
        >
          ☰ 
        </button>
        {dropdownOpen && (
          <div style={levelsDropdownStyle}>
            <a style={dropdownItemStyle} onClick={() => { navigate("/"); setDropdownOpen(false); }}> Home</a>
            <a style={dropdownItemStyle} onClick={() => { navigate("/basic"); setDropdownOpen(false); }}> Basic</a>
            <a style={dropdownItemStyle} onClick={() => { navigate("/intermediate"); setDropdownOpen(false); }}> Intermediate</a>
            <a style={dropdownItemStyle} onClick={() => { navigate("/advanced"); setDropdownOpen(false); }}> Advanced</a>
          </div>
        )}
      </div>

      {/* Heading */}
      <div className="heading-line">
        <h3>Select an advanced option to view content</h3>
      </div>

      {/* Top Buttons */}
      <div className="top-bar">
        <button onClick={() => setSelectedOption("entrepreneur")} className="skill-button">
          👤 Entrepreneur
        </button>
        <button onClick={() => setSelectedOption("fund")} className="skill-button">
          💰 Fund
        </button>
        <button onClick={() => setSelectedOption("info")} className="skill-button">
          📄 Info
        </button>
        {isEntrepreneur && (
          <button onClick={() => setSelectedOption("notification")} className="skill-button">
            🔔 Notification
          </button>
        )}
      </div>

      {/* Dynamic Content */}
      <div className="basic-content">{renderContent()}</div>
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
  display: "flex",
  flexDirection: "column",
  gap: "6px",
  padding: "10px",
};

const dropdownItemStyle = {
  padding: "8px 12px",
  cursor: "pointer",
  borderRadius: "4px",
  color: "#003366",
  fontWeight: "bold",
  textDecoration: "none",
  transition: "background 0.2s",
};