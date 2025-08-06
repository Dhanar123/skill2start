// src/components/SectorPage.jsx

import React, { useState, useEffect } from "react";
import { auth, db, provider } from "../firebase";
import { signInWithPopup } from "firebase/auth";
import {
  collection,
  getDocs,
  doc,
  setDoc,
  addDoc,
  query,
  where,
} from "firebase/firestore";

export default function SectorPage({ sector }) {
  const [entrepreneurs, setEntrepreneurs] = useState([]);
  const [showEntrepreneurs, setShowEntrepreneurs] = useState(false);
  const [currentUserEmail, setCurrentUserEmail] = useState(null);
  const [appliedEntrepreneurs, setAppliedEntrepreneurs] = useState([]);

  useEffect(() => {
    // When user is logged in, store their email
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) setCurrentUserEmail(user.email);
    });
    return () => unsubscribe();
  }, []);

  const handleEntrepreneurLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      const email = user.email;

      const allowedDomains = [
        "@tcs.com",
        "@infosys.com",
        "@wipro.com",
        "@hcl.com",
        "@google.com",
        "@microsoft.com",
      ];

      if (allowedDomains.some((domain) => email.endsWith(domain))) {
        // Register to Firestore
        await setDoc(doc(db, "entrepreneurs", email), {
          name: user.displayName,
          email,
          createdAt: new Date(),
        });

        alert("✅ You’re logged in and registered as an Entrepreneur!");

        loadEntrepreneurs(); // Show updated list
        setShowEntrepreneurs(true);
      } else {
        alert("❌ Only company email users can log in as Entrepreneurs.");
      }
    } catch (error) {
      console.error("Login Error:", error);
      alert("Something went wrong during login");
    }
  };

  const loadEntrepreneurs = async () => {
    const snapshot = await getDocs(collection(db, "entrepreneurs"));
    const data = snapshot.docs.map((doc) => doc.data());
    setEntrepreneurs(data);
  };

  const handleApply = async (toEmail) => {
    if (!currentUserEmail) return;

    try {
      await addDoc(collection(db, "internshipApplications"), {
        from: currentUserEmail,
        to: toEmail,
        sector,
        appliedAt: new Date(),
      });
      alert("✅ Application sent!");
      setAppliedEntrepreneurs((prev) => [...prev, toEmail]);
    } catch (err) {
      console.error("Application Error:", err);
      alert("❌ Failed to apply");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>{sector} Sector</h2>

      <button onClick={handleEntrepreneurLogin} style={styles.loginBtn}>
        🔐 Internship - Entrepreneur Login
      </button>

      {showEntrepreneurs && (
        <div style={styles.entrepreneurBox}>
          <h3>👤 Registered Entrepreneurs</h3>
          <ul style={{ listStyle: "none", paddingLeft: 0 }}>
            {entrepreneurs.length === 0 ? (
              <li>No entrepreneurs found.</li>
            ) : (
              entrepreneurs.map((e, index) => (
                <li key={index} style={styles.card}>
                  <p><strong>{e.name}</strong> — {e.email}</p>
                  {currentUserEmail === e.email ? (
                    <p style={{ color: "gray" }}>🔒 This is your profile</p>
                  ) : appliedEntrepreneurs.includes(e.email) ? (
                    <button style={{ ...styles.applyBtn, backgroundColor: "gray" }} disabled>
                      ✅ Applied
                    </button>
                  ) : (
                    <button
                      style={styles.applyBtn}
                      onClick={() => handleApply(e.email)}
                    >
                      Apply Now
                    </button>
                  )}
                </li>
              ))
            )}
          </ul>
        </div>
      )}

      <hr />
      <h3>🧩 Recommended Communities</h3>
      <p>Coming soon...</p>
    </div>
  );
}

const styles = {
  loginBtn: {
    marginBottom: "15px",
    padding: "10px 20px",
    backgroundColor: "#003366",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
  entrepreneurBox: {
    backgroundColor: "#fff",
    border: "1px solid #ccc",
    padding: "15px",
    borderRadius: "8px",
    marginTop: "20px",
  },
  card: {
    borderBottom: "1px solid #eee",
    paddingBottom: "10px",
    marginBottom: "10px",
  },
  applyBtn: {
    padding: "6px 12px",
    backgroundColor: "#003366",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    marginTop: "5px",
  },
};
