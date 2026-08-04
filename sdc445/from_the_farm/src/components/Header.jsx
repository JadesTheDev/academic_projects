/*
=========================================================
SDC445 - Interface Design
From the Farm

Description:
Header component for the application.
Displays the navigation buttons, application title,
shopping cart button, and menu toggle.

=========================================================
*/

// ==========================
// Imports
// ==========================

import { PiArrowElbowUpLeftBold } from "react-icons/pi";
import { TfiHome } from "react-icons/tfi";

// ==========================
// Header Component
// ==========================

function Header({
  onBackClick,
  onHomeClick,
  onMenuClick
}) {
  return (
    <header className="header">
      {/* Left Navigation */}

      <div className="header-navigation">

        <button
          type="button"
          className="header-button"
          onClick={onBackClick}
          aria-label="Back"
        >
          <PiArrowElbowUpLeftBold />
        </button>

        <button
          type="button"
          className="header-button"
          onClick={onHomeClick}
          aria-label="Home"
        >
          <TfiHome />
        </button>

      </div>

      {/* Application Title */}

      <h1 className="app-title">
        From the Farm
      </h1>

      {/* Right Navigation */}

      <div className="header-placeholders">

        <button
          type="button"
          className="header-button"
          aria-label="Shopping Cart"
        >
          Cart
        </button>

        <button
          type="button"
          className="header-button"
          onClick={onMenuClick}
          aria-label="Menu"
        >
          Menu
        </button>

      </div>
    </header>
  );
}

// ==========================
// Export Component
// ==========================

export default Header;
