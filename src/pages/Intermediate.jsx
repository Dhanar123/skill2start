import React, { useEffect, useState } from "react";  
import SectorPage from "../components/SectorPage";  
import "../App.css"; // For spinner  
import { useNavigate } from "react-router-dom";  
  
export default function Intermediate() {  
  const [selectedSector, setSelectedSector] = useState(null);  
  const [loading, setLoading] = useState(true);  
  const [dropdownOpen, setDropdownOpen] = useState(false);  
  
  const navigate = useNavigate();  
  
  useEffect(() => {  
    const timeout = setTimeout(() => setLoading(false), 1000); // simulate delay  
    return () => clearTimeout(timeout);  
  }, []);  
  
  if (loading) {  
    return (  
      <div style={{ textAlign: "center" }}>  
        <div className="spinner"></div>  
        <p style={{ marginTop: "10px", color: "#FFA500", fontWeight: "bold" }}>  
          Loading Intermediate Content...  
        </p>  
      </div>  
    );  
  }  
  
  return (  
    <div className="intermediate-wrapper">  
      {/* Top-right LEVELS button */}  
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
        <h3>🚀 Welcome to the Intermediate Hub!</h3>  
      </div>  
  
      {/* Sector Buttons */}  
      <div className="top-bar">  
        {["Marketing", "Finance", "Tech"].map((sector) => (  
          <button  
            key={sector}  
            onClick={() => setSelectedSector(sector)}  
            className="skill-button"  
          >  
            {sector}  
          </button>  
        ))}  
      </div>  
  
      {/* Content */}  
      <div className="basic-content">  
        {!selectedSector ? (  
          <>  
            <h2 style={{ color: "#003366" }}>Explore by Sector</h2>  
            <p className="intro-text">  
              Select a sector above to discover content.  
            </p>  
  
            <div className="box-info">  
              <p className="info-label">  
                Are you an Entrepreneur? <br />  
                Register with your company email!  
              </p>  
            </div>  
          </>  
        ) : (  
          <SectorPage sector={selectedSector} />  
        )}  
      </div>  
    </div>  
  );  
}  
  
// === LEVELS Dropdown Button Styles ===  
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
  

// Inside your Advanced.jsx or any component
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