/*
=========================================================
SDC445 - Interface Design
From the Farm

Authors:
- Jade Powell
- Holly Hebert
- Patrick Gonzalez

Description:
Dropdown navigation menu for the From the Farm application.
Displays full-width navigation buttons and closes through the
existing navigation handlers in App.jsx.
=========================================================
*/

import React from "react";
import "./Menu.css";

function Menu({
  onHomeClick,
  onMapClick,
  onCalendarClick,
  onLoginClick,
  onProfileClick
}) {
  return (
    <nav className="menu" aria-label="Main navigation">
      <div className="menu-title">Menu</div>

      <div className="menu-buttons">
        <button type="button" className="menu-button" onClick={onHomeClick}>
          <span aria-hidden="true">🏠</span>
          <span>Home</span>
        </button>

        <button type="button" className="menu-button">
          <span aria-hidden="true">🧺</span>
          <span>Listings</span>
        </button>

        <button type="button" className="menu-button">
          <span aria-hidden="true">🚜</span>
          <span>Suppliers</span>
        </button>

        <button type="button" className="menu-button" onClick={onMapClick}>
          <span aria-hidden="true">🗺️</span>
          <span>Map</span>
        </button>

        <button type="button" className="menu-button" onClick={onCalendarClick}>
          <span aria-hidden="true">📅</span>
          <span>Seasonal Calendar</span>
        </button>

        <button type="button" className="menu-button">
          <span aria-hidden="true">📰</span>
          <span>News</span>
        </button>

        <button type="button" className="menu-button" onClick={onLoginClick}>
          <span aria-hidden="true">🔐</span>
          <span>Log In</span>
        </button>

        <button type="button" className="menu-button" onClick={onProfileClick}>
          <span aria-hidden="true">👤</span>
          <span>Profile</span>
        </button>
      </div>
    </nav>
  );
}

export default Menu;
