/*
=========================================================
SDC445 - Interface Design
From the Farm

Description:
Dropdown navigation menu for the From the Farm application.
=========================================================
*/

import React from "react";
import "./Menu.css";

function Menu({
  onHomeClick,
  onListingsClick,
  onMapClick,
  onCalendarClick,
  onProfileClick,
  onNewsClick,
})

{
  return (
    <nav className="menu" aria-label="Main navigation">
      <div className="menu-title">Explore</div>

      <div className="menu-buttons" role="menu">
        <button type="button" className="menu-button" onClick={onHomeClick} role="menuitem">
          <span aria-hidden="true">🏠</span>
          <span>Home</span>
        </button>

        <button type="button" className="menu-button" onClick={onListingsClick} role="menuitem">
          <span aria-hidden="true">🧺</span>
          <span>Listings</span>
        </button>

        <button type="button" className="menu-button" onClick={onMapClick} role="menuitem">
          <span aria-hidden="true">🗺️</span>
          <span>Map</span>
        </button>

        <button type="button" className="menu-button" onClick={onCalendarClick} role="menuitem">
          <span aria-hidden="true">📅</span>
          <span>Seasonal Calendar</span>
        </button>

        <button type="button" className="menu-button" onClick={onNewsClick} role="menuitem">
          <span aria-hidden="true">📰</span>
          <span>News</span>
        </button>

        <button type="button" className="menu-button" onClick={onProfileClick} role="menuitem">
          <span aria-hidden="true">👤</span>
          <span>Profile</span>
        </button>
      </div>
    </nav>
  );
}

export default Menu;
