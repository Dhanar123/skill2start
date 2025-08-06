import React from "react";

export default function SidebarRight() {
  return (
    <div className="w-64 p-4 border-l bg-gray-50 min-h-screen">
      <h2 className="text-lg font-semibold mb-4">Options</h2>
      <ul className="space-y-3">
        <li><button className="w-full text-left">New Post</button></li>
        <li><button className="w-full text-left">Posts</button></li>
        <li><button className="w-full text-left">Active Sector</button></li>
        <li><button className="w-full text-left">Bookmark</button></li>
        <li><button className="w-full text-left">Report</button></li>
        <li><button className="w-full text-left">Community</button></li>
      </ul>
    </div>
  );
}
