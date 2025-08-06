import dotenv from "dotenv";
dotenv.config(); // Load .env variables

import express from "express";

const app = express();
const port = 3000;

// ✅ Middleware to parse JSON
app.use(express.json());

// ✅ Root route
app.get("/", (req, res) => {
  res.send("✅ Skill2Start API Server is running without chatbot!");
});

// ✅ Start the server
app.listen(port, () => {
  console.log(`🚀 Server running at http://localhost:${port}`);
});
