import React, { useState } from "react";
import { db } from "../firebase"; // your firebase config file
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

export default function NewPost() {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !desc) {
      setMessage("❌ Please fill in all fields.");
      setTimeout(() => setMessage(""), 3000);
      return;
    }

    try {
      await addDoc(collection(db, "posts"), {
        title,
        desc,
        createdAt: serverTimestamp(),
      });
      setTitle("");
      setDesc("");
      setMessage("✅ Post submitted successfully!");
      setTimeout(() => setMessage(""), 3000);
    } catch (error) {
      console.error("Error adding post:", error);
      setMessage("❌ Failed to submit post.");
      setTimeout(() => setMessage(""), 3000);
    }
  };

  return (
    <div style={styles.container}>
      <h2>📝 Create New Post</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="text"
          placeholder="Post Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={styles.input}
        />
        <textarea
          placeholder="Post Description"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
          style={styles.textarea}
        />
        <button type="submit" style={styles.button}>
          Submit
        </button>
        {message && <p style={styles.message}>{message}</p>}
      </form>
    </div>
  );
}

const styles = {
  container: {
    padding: "40px",
    textAlign: "center",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
    maxWidth: "500px",
    margin: "0 auto",
  },
  input: {
    padding: "10px",
    fontSize: "16px",
  },
  textarea: {
    padding: "10px",
    fontSize: "16px",
    height: "100px",
  },
  button: {
    padding: "10px",
    fontSize: "16px",
    backgroundColor: "#003366",
    color: "white",
    border: "none",
    cursor: "pointer",
  },
  message: {
    fontWeight: "bold",
    color: "green",
  },
};
