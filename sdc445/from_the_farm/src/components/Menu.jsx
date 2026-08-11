import React from "react";

function Menu({ onProfileClick }) {
  return (
    <div className="menu">
      <h2>From the Farm</h2>

      <ul>
        <li>🏠 Home</li>
        <li>🧺 Products</li>
        <li>🚜 Suppliers</li>
        <li>🗺 Map</li>
        <li>📅 Seasonal Calendar</li>
        <li>📰 News</li>
        <li onClick={onProfileClick}>👤 Profile</li>
      </ul>
    </div>
  );
}

export default Menu;