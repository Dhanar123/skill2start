import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, query, where, onSnapshot } from "firebase/firestore";

export default function ActiveSector() {
  const username = localStorage.getItem("username");
  const [counts, setCounts] = useState({});

  useEffect(() => {
    if (!username) return;

    const q = query(
      collection(db, "views"),
      where("username", "==", username)
    );

    const unsub = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map((doc) => doc.data());

      const sectorCount = {};
      data.forEach((view) => {
        const category = view.category || "Uncategorized";
        sectorCount[category] = (sectorCount[category] || 0) + 1;
      });

      setCounts(sectorCount);
    });

    return () => unsub();
  }, [username]);

  return (
    <div style={styles.container}>
      <h2>📈 Active Sectors</h2>
      {Object.keys(counts).length === 0 ? (
        <p>No activity tracked yet.</p>
      ) : (
        <ul>
          {Object.entries(counts).map(([sector, count]) => (
            <li key={sector} style={styles.item}>
              {sector} — {count} views
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

const styles = {
  container: {
    padding: "40px",
    textAlign: "center",
  },
  item: {
    fontSize: "18px",
    margin: "10px 0",
  },
};
