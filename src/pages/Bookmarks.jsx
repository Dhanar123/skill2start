import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, query, where, getDocs } from "firebase/firestore";

export default function Bookmarks() {
  const [bookmarkedPosts, setBookmarkedPosts] = useState([]);
  const username = localStorage.getItem("username");

  useEffect(() => {
    const fetchBookmarks = async () => {
      if (!username) return;

      const q = query(
        collection(db, "bookmarks"),
        where("user", "==", username)
      );
      const snapshot = await getDocs(q);
      const posts = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setBookmarkedPosts(posts);
    };

    fetchBookmarks();
  }, [username]);

  return (
    <div style={styles.container}>
      <h2>📌 Bookmarked Posts</h2>
      {bookmarkedPosts.length === 0 ? (
        <p>No bookmarks found.</p>
      ) : (
        bookmarkedPosts.map((post) => (
          <div key={post.id} style={styles.card}>
            <h3>{post.title}</h3>
            <p>{post.desc}</p>
            <p style={styles.category}>Category: {post.category}</p>
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
  card: {
    border: "1px solid #ccc",
    borderRadius: "10px",
    padding: "20px",
    margin: "15px auto",
    maxWidth: "600px",
    textAlign: "left",
    backgroundColor: "#bdd6e7ff", 
    color: "#001F3F", // navy blue
  },
  category: {
    fontSize: "12px",
    fontStyle: "italic",
    color: "#001F3F",
  },
};
