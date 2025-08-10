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
  setLoadingItems(true); // show loading before fetch

  const fetchData = async () => {
    try {
      const snapshot = await getDocs(collection(db, "yourCollectionName"));
      const fetchedItems = snapshot.docs.map(doc => doc.data());
      setItems(fetchedItems);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoadingItems(false); // hide loading after fetch
    }
  };

  fetchData();
}, []);

const renderItems = () => {
  if (loadingItems) {
    return (
      <div style={{ textAlign: "center", padding: "20px" }}>
        <div
          className="spinner"
          style={{
            margin: "auto",
            border: "4px solid #f3f3f3ff",
            borderTop: "4px solid #1e3a8a",
            borderRadius: "50%",
            width: "40px",
            height: "40px",
            animation: "spin 1s linear infinite",
          }}
        ></div>
        <p
  style={{
    marginTop: "10px",
    backgroundColor: "transparent",  // background removed
    color: "#1e3a8a",
    fontWeight: "bold"
  }}
>
  Loading content...
</p>
      </div>
    );
  }

  if (!items.length) {
    return (
      <p
        style={{
          backgroundColor: "#e0f2fe",
          color: "#1e3a8a",
          padding: "12px",
          borderRadius: "8px",
          textAlign: "center",
          fontWeight: "500",
        }}
      >
        Explore above  to learn about entrepreneurship!!
      </p>
    );
  }

  return (
    <ul className="item-list">
      {items.map((item, i) => (
        <li key={i} className="item-card">
          {item.title && <strong>{item.title}</strong>}
          {item.title && item.author && " — "}
          {item.author && <span>{item.author}</span>}
          <br />
          {item.rating && <>⭐ {item.rating}</>}
          <br />
          {item.link && (
            <a href={item.link} target="_blank" rel="noopener noreferrer">
              📎 Link
            </a>
          )}
        </li>
      ))}
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
      <div className="heading-line" style={{ backgroundColor: "#dbeafe" }}>
  <h3>Select a domain to view content</h3>
</div>
      {/* Domain Buttons */}
      <div className="top-bar responsive-buttons">
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
    style={{
      backgroundColor:
        selectedDomain?.id === domain.id ? "#dbeafe" : "white", // Selected -> light blue
      color: "rgb(30,58,138)",
      border: "2px solid rgb(30,58,138)",
      padding: "8px 14px",
      borderRadius: "6px",
      fontWeight: "bold",
      cursor: "pointer",
    }}
  >
    {domain.name}
  </button>
)))}
      </div>

      {/* Main Content */}
      <div className="basic-content">
        {selectedDomain && (
          <>
            <h2>{selectedDomain.name}</h2>

            {/* Tab Buttons */}
            <div className="tab-buttons-wrapper">
              <div className="tab-buttons scroll-tabs">
                {["books", "videos", "courses", "blogs"].map((tab) => (
  <button
    key={tab}
    onClick={() => setActiveTab(tab)}
    className="tab-button"
    style={{
      backgroundColor: activeTab === tab ? "#dbeafe" : "white",  // selected tab light blue
      color: "rgb(30,58,138)",
      border: "2px solid rgb(30,58,138)",
      padding: "8px 14px",
      borderRadius: "6px",
      fontWeight: "bold",
      cursor: "pointer",
    }}
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
  backgroundColor: "rgba(253, 253, 255, 1)",
  border: "1px solid ",
  borderRadius: "6px",
  boxShadow: "0 0 10px rgba(0,0,0,0.1)",
  zIndex: 1000,
  display: "flex",
  flexDirection: "column",
  padding: "10px",
  minWidth: "140px",
};

const dropdownItemStyle = {
  padding: "6px 12px",
  cursor: "pointer",
  borderRadius: "4px",
  color: "#003366",
  fontWeight: "bold",
  textDecoration: "none",
};