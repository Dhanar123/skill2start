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
      <h2>👥 Create Community</h2>
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
        style={{ ...styles.input, height: "60px" }}
      />
      <button onClick={handleCreate} style={styles.button}>Create</button>

      <h3 style={{ marginTop: "30px" }}>Your Communities</h3>
      {communities.length === 0 ? (
        <p>No communities created yet.</p>
      ) : (
        communities.map((com) => (
          <div key={com.id} style={styles.card}>
            <strong>{com.name}</strong>
            <p>{com.description}</p>

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
        ))
      )}
    </div>
  );
}

const styles = {
  container: {
    padding: "40px",
    textAlign: "center",
  },
  input: {
    padding: "10px",
    margin: "10px",
    width: "300px",
    fontSize: "16px",
  },
  button: {
    padding: "10px 20px",
    backgroundColor: "#003366",
    color: "white",
    border: "none",
    cursor: "pointer",
  },
  card: {
    border: "1px solid #ccc",
    borderRadius: "10px",
    padding: "20px",
    margin: "15px auto",
    maxWidth: "500px",
    backgroundColor: "#f9f9f9",
  },
};
