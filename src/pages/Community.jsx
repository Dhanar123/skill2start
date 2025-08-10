import React, { useState, useEffect } from "react";
import { db } from "../firebase";
import {
  collection,
  addDoc,
  onSnapshot,
  query,
  where,
  Timestamp,
} from "firebase/firestore";

export default function Community() {
  const [communityName, setCommunityName] = useState("");
  const [description, setDescription] = useState("");
  const [memberEmail, setMemberEmail] = useState("");
  const [communities, setCommunities] = useState([]);
  const currentUser = localStorage.getItem("username") || "guest@example.com";

  // Create a new community
  const handleCreate = async () => {
    if (!communityName || !description) return;

    await addDoc(collection(db, "communities"), {
      name: communityName,
      description,
      createdBy: currentUser,
      createdAt: Timestamp.now(),
    });

    setCommunityName("");
    setDescription("");
  };

  // Add member to community
  const handleAddMember = async (communityId) => {
    if (!memberEmail) return;
    await addDoc(collection(db, "communityMembers"), {
      communityId,
      email: memberEmail,
      joinedAt: Timestamp.now(),
    });
    setMemberEmail("");
    alert("Member added!");
  };

  // Real-time fetch only the user's communities
  useEffect(() => {
    const q = query(
      collection(db, "communities"),
      where("createdBy", "==", currentUser)
    );
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setCommunities(data);
    });

    return () => unsubscribe();
  }, [currentUser]);

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>👥 Create Community</h2>
      <div style={styles.form}>
        <input
          placeholder="Community Name"
          value={communityName}
          onChange={(e) => setCommunityName(e.target.value)}
          style={styles.input}
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          style={{ ...styles.input, height: "60px", resize: "none" }}
        />
        <button onClick={handleCreate} style={styles.button}>Create</button>
      </div>

      <h3 style={styles.subheading}>Your Communities</h3>
      {communities.length === 0 ? (
        <p style={styles.empty}>No communities created yet.</p>
      ) : (
        <div style={styles.cardsContainer}>
          {communities.map((com) => (
            <div key={com.id} style={styles.card}>
              <h4 style={styles.cardTitle}>{com.name}</h4>
              <p style={styles.cardDescription}>{com.description}</p>

              <input
                placeholder="Member email"
                value={memberEmail}
                onChange={(e) => setMemberEmail(e.target.value)}
                style={styles.input}
              />
              <button onClick={() => handleAddMember(com.id)} style={styles.button}>
                Add Member
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

const styles = {
  container: {
    padding: "20px",
    maxWidth: "1200px",
    margin: "auto",
  },
  heading: {
    textAlign: "center",
    color: "#003366",
    marginBottom: "20px",
  },
  subheading: {
    marginTop: "30px",
    color: "#003366",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "10px",
    background: "#ffffff",
    padding: "20px",
    borderRadius: "15px",
    boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
    maxWidth: "500px",
    margin: "auto",
  },
  input: {
    padding: "12px",
    width: "100%",
    maxWidth: "400px",
    fontSize: "16px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    outline: "none",
    transition: "0.3s",
  },
  button: {
    padding: "12px 20px",
    backgroundColor: "#003366",
    color: "white",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "16px",
    transition: "background 0.3s",
  },
  buttonHover: {
    backgroundColor: "#0055aa",
  },
  cardsContainer: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
    gap: "20px",
    marginTop: "20px",
  },
  card: {
    background: "#ffffff",
    padding: "20px",
    borderRadius: "15px",
    boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
    transition: "transform 0.2s ease, box-shadow 0.2s ease",
  },
  cardTitle: {
    fontSize: "18px",
    fontWeight: "bold",
    marginBottom: "8px",
    color: "#003366",
  },
  cardDescription: {
    fontSize: "14px",
    color: "#555",
    marginBottom: "10px",
  },
  empty: {
    marginTop: "10px",
    color: "#888",
  },
};