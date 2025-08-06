import React from "react";

export default function Sidebar({ onSelectSector }) {
  const sectors = [
    "Software",
    "Agriculture",
    "Fashion",
    "Automobiles",
    "Construction",
    "Crypto",
    "Miscellaneous",
  ];

  return (
    <div style={styles.sidebar}>
      <h3 style={{ color: "orange" }}>Sectors</h3>
      {sectors.map((sector) => (
        <button
          key={sector}
          onClick={() => onSelectSector(sector)}
          style={styles.btn}
        >
          {sector}
        </button>
      ))}

      {/* 📅 Meet Button at Bottom */}
      <button
        onClick={() => window.open("https://meet.google.com/new", "_blank")}
        style={{ ...styles.btn, marginTop: "30px", backgroundColor: "#004080" }}
      >
        📅 Meet
      </button>
    </div>
  );
}

const styles = {
  sidebar: {
    width: "220px",
    backgroundColor: "#003366",
    padding: "20px",
    height: "100vh",
  },
  btn: {
    display: "block",
    width: "100%",
    margin: "10px 0",
    padding: "10px",
    backgroundColor: "#003366",
    border: "none",
    color: "orange",
    fontSize: "16px",
    cursor: "pointer",
    textAlign: "left",
  },
};
