import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import {
  collection,
  query,
  orderBy,
  onSnapshot,
  addDoc,
} from "firebase/firestore";

export default function Posts() {
  const [posts, setPosts] = useState([]);
  const username = localStorage.getItem("username");

  useEffect(() => {
    const q = query(collection(db, "posts"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const postsData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setPosts(postsData);
    });

    return () => unsubscribe();
  }, []);

  const handleView = async (post) => {
    if (!username) return;
    await addDoc(collection(db, "views"), {
      username,
      postId: post.id,
      title: post.title,
      category: post.category || "Uncategorized",
      viewedAt: new Date(),
    });
    alert(`Viewed "${post.title}" logged.`);
  };

  const handleBookmark = async (post) => {
    if (!username) return;
    try {
      await addDoc(collection(db, "bookmarks"), {
        user: username,
        postId: post.id,
        title: post.title,
        desc: post.desc,
        category: post.category || "Uncategorized",
        bookmarkedAt: new Date(),
      });
      alert(`Bookmarked "${post.title}"`);
    } catch (err) {
      console.error("Bookmark failed:", err);
    }
  };

  return (
    <div style={styles.container}>
      <h2>📚 All Posts</h2>
      {posts.length === 0 ? (
        <p>No posts available.</p>
      ) : (
        posts.map((post) => (
          <div key={post.id} style={styles.card} onClick={() => handleView(post)}>
            <h3>{post.title}</h3>
            <p>{post.desc}</p>
            <p style={styles.category}>
              Category: {post.category || "N/A"}
            </p>
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleBookmark(post);
              }}
              style={styles.bookmarkBtn}
            >
              📌 Bookmark
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
  card: {
    border: "1px solid #ccc",
    borderRadius: "10px",
    padding: "20px",
    margin: "15px auto",
    maxWidth: "600px",
    textAlign: "left",
    backgroundColor: "#cee7f8ff", // Pastel gold
    color: "#001F3F", // Navy blue
    cursor: "pointer",
  },
  category: {
    fontSize: "12px",
    fontStyle: "italic",
    color: "#001F3F", // Navy blue
  },
  bookmarkBtn: {
    backgroundColor: "#003366",
    color: "orange",
    padding: "8px 16px",
    border: "none",
    borderRadius: "5px",
    marginTop: "10px",
    cursor: "pointer",
  },
};
