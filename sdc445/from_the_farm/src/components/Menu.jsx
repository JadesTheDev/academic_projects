import React from "react";

function Menu({
  onHomeClick,
  onMapClick,
  onCalendarClick,
  onLoginClick,
  onProfileClick
}) {
  return (
    <div className="menu">
      <h2>From the Farm</h2>

      <ul>
        <li onClick={onHomeClick}>🏠 Home</li>
        <li>🧺 Products</li>
        <li>🚜 Suppliers</li>
        <li onClick={onMapClick}>🗺 Map</li>
        <li onClick={onCalendarClick}>📅 Seasonal Calendar</li>
        <li>📰 News</li>
        <li onClick={onLoginClick}>🔐 Log In</li>
        <li onClick={onProfileClick}>👤 Profile</li>
      </ul>
    </div>
  );
}

export default Menu;
