// src/App.jsx
import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

// Import all pages
import Home from "./pages/Home";
import Basic from "./pages/Basic";
import Intermediate from "./pages/Intermediate";
import Advanced from "./pages/Advanced";
import NewPost from "./pages/NewPost";
import Posts from "./pages/Posts";
import ActiveSector from "./pages/ActiveSector";
import Bookmarks from "./pages/Bookmarks";
import Community from "./pages/Community";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/basic" element={<Basic />} />
        <Route path="/intermediate" element={<Intermediate />} />
        <Route path="/advanced" element={<Advanced />} />
        <Route path="/newpost" element={<NewPost />} />
        <Route path="/posts" element={<Posts />} />
        <Route path="/activesector" element={<ActiveSector />} />
        <Route path="/bookmark" element={<Bookmarks />} />
        <Route path="/community" element={<Community />} />
      </Routes>
    </Router>
  );
}