import React from "react";
import "./Menu.css";

function Menu({ onNavigate }) {
  return (
    <div className="menu">
      <h2>From the Farm</h2>

      <ul>
        <li onClick={() => onNavigate("home")}>🏠 Home</li>
        <li onClick={() => onNavigate("products")}>🧺 Products</li>
        <li onClick={() => onNavigate("suppliers")}>🚜 Suppliers</li>
        <li onClick={() => onNavigate("map")}>🗺 Map</li>
        <li onClick={() => onNavigate("calendar")}>📅 Seasonal Calendar</li>
        <li onClick={() => onNavigate("news")}>📰 News</li>
        <li onClick={() => onNavigate("profile")}>👤 Profile</li>
      </ul>
    </div>
  );
}

export default Menu;
