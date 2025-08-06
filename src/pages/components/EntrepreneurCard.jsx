import React from "react";

export default function EntrepreneurCard({ entrepreneur }) {
  return (
    <div style={styles.card}>
      <h3>{entrepreneur.name}</h3>
      <p>{entrepreneur.designation}</p>
      <p><strong>Company:</strong> {entrepreneur.company}</p>
      <a href={`mailto:${entrepreneur.email}`} style={styles.btn}>
        📩 Connect
      </a>
    </div>
  );
}

const styles = {
  card: {
    backgroundColor: "#fff3c4",
    padding: "15px",
    borderRadius: "10px",
    marginBottom: "15px",
  },
  btn: {
    backgroundColor: "#003366",
    color: "white",
    padding: "6px 12px",
    textDecoration: "none",
    borderRadius: "5px",
    display: "inline-block",
    marginTop: "10px",
  },
};
