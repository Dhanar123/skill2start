import React, { useState, useEffect } from "react";
import { db } from "../firebase";
import { collection, getDocs, doc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import "../App.css";

export default function Basic() {
  const [domains, setDomains] = useState([]);
  const [selectedDomain, setSelectedDomain] = useState(null);
  const [activeTab, setActiveTab] = useState("books");
  const [items, setItems] = useState([]);
  const [loadingDomains, setLoadingDomains] = useState(true);
  const [loadingItems, setLoadingItems] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchDomains = async () => {
      try {
        const snapshot = await getDocs(collection(db, "domains"));
        const list = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setDomains(list);
      } catch (err) {
        console.error("Error fetching domains:", err);
      } finally {
        setLoadingDomains(false);
      }
    };
    fetchDomains();
  }, []);

  useEffect(() => {
    const fetchContent = async () => {
      if (!selectedDomain || !selectedDomain.id) return;
      setLoadingItems(true);
      try {
        const subColRef = collection(
          doc(db, "domains", selectedDomain.id),
          activeTab
        );
        const snapshot = await getDocs(subColRef);
        const data = snapshot.docs.map((doc) => doc.data());
        setItems(data);
      } catch (err) {
        console.error("Error fetching items:", err);
        setItems([]);
      } finally {
        setLoadingItems(false);
      }
    };

    fetchContent();
  }, [selectedDomain, activeTab]);

  const renderItems = () => {
    if (loadingItems) {
      return (
        <div style={{ textAlign: "center" }}>
          <div className="spinner"></div>
          <p style={{ marginTop: "10px", color: "#FFA500", fontWeight: "bold" }}>
            Loading content...
          </p>
        </div>
      );
    }

    if (!items.length) return <p>No content available.</p>;

    return (
      <ul className="item-list">
        {items.map((item, i) => {
          const title = item.title?.trim();
          const author = item.author?.trim();
          const link = item.link?.trim();
          const rating = item.rating;

          return (
            <li key={i} className="item-card">
              {title && <strong>{title}</strong>}
              {title && author && " — "}
              {author && <span>{author}</span>}
              <br />
              {rating && <>⭐ {rating}</>}
              <br />
              {link && (
                <a href={link} target="_blank" rel="noopener noreferrer">
                  📎 Link
                </a>
              )}
            </li>
          );
        })}
      </ul>
    );
  };

  return (
    <div className="basic-wrapper">
      {/* LEVELS Button */}
      <div style={fixedTopRight}>
        <button
          style={levelsButtonStyle}
          onClick={() => setDropdownOpen(!dropdownOpen)}
        >
          ☰
        </button>

        {dropdownOpen && (
          <div style={levelsDropdownStyle}>
            <a
              style={dropdownItemStyle}
              onClick={() => {
                navigate("/");
                setDropdownOpen(false);
              }}
            >
              Home
            </a>
            <a
              style={dropdownItemStyle}
              onClick={() => {
                navigate("/basic");
                setDropdownOpen(false);
              }}
            >
              Basic
            </a>
            <a
              style={dropdownItemStyle}
              onClick={() => {
                navigate("/intermediate");
                setDropdownOpen(false);
              }}
            >
              Intermediate
            </a>
            <a
              style={dropdownItemStyle}
              onClick={() => {
                navigate("/advanced");
                setDropdownOpen(false);
              }}
            >
              Advanced
            </a>
          </div>
        )}
      </div>

      {/* Heading */}
      <div className="heading-line">
        <h3>Select a domain to view content</h3>
      </div>

      {/* Domain Buttons */}
      <div className="top-bar">
        {loadingDomains ? (
          <div className="spinner" style={{ margin: "30px auto" }}></div>
        ) : (
          domains.map((domain) => (
            <button
              key={domain.id}
              onClick={() => {
                setSelectedDomain(domain);
                setActiveTab("books");
              }}
              className="skill-button"
            >
              {domain.name}
            </button>
          ))
        )}
      </div>

      {/* Main Content */}
      <div className="basic-content">
        {selectedDomain && (
          <>
            <h2>{selectedDomain.name}</h2>

            {/* Tab Buttons */}
            <div className="tab-buttons-wrapper">
              <div className="tab-buttons">
                {["books", "videos", "courses", "blogs"].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`tab-button ${
                      activeTab === tab ? "active-tab" : ""
                    }`}
                  >
                    {tab === "books" && "📚 Books"}
                    {tab === "videos" && "🎥 Videos"}
                    {tab === "courses" && "💻 Courses"}
                    {tab === "blogs" && "📝 Blogs"}
                  </button>
                ))}
              </div>
            </div>
          </>
        )}
      </div>

      {/* Content List */}
      <div className="content-box">{renderItems()}</div>
    </div>
  );
}

// === Dropdown Styles ===
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
  display: "flex",
  flexDirection: "column",
  padding: "10px",
};

const dropdownItemStyle = {
  padding: "6px 12px",
  cursor: "pointer",
  borderRadius: "4px",
  color: "#003366",
  fontWeight: "bold",
  textDecoration: "none",
};