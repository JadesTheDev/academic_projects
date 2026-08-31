/*
=========================================================
SDC445 - Interface Design
From the Farm

Description:
Dropdown navigation menu for the From the Farm application.
Provides access to the main pages and local food discovery
features throughout the application.

=========================================================
*/

import "./Menu.css";

function Menu({
  onHomeClick,
  onListingsClick,
  onSuppliersClick,
  onMapClick,
  onCalendarClick,
  onProfileClick,
  onNewsClick,
  onLoginClick,
}) {
  const items = [
    ["🏠", "Home", onHomeClick],
    ["🧺", "Listings", onListingsClick],
    ["🚜", "Suppliers", onSuppliersClick],
    ["🗺️", "Map", onMapClick],
    ["📅", "Seasonal Calendar", onCalendarClick],
    ["📰", "News", onNewsClick],
    ["👤", "Profile", onProfileClick],
    ["🔐", "Log In", onLoginClick],
  ];

  return (
    <nav
      className="menu"
      aria-label="Main navigation"
    >
      <div className="menu-title">
        Explore
      </div>

      <div
        className="menu-buttons"
        role="menu"
      >
        {items.map(([icon, label, handler]) => (
          <button
            key={label}
            type="button"
            className="menu-button"
            onClick={handler}
            role="menuitem"
          >
            <span aria-hidden="true">
              {icon}
            </span>

            <span>
              {label}
            </span>
          </button>
        ))}
      </div>
    </nav>
  );
}

export default Menu;