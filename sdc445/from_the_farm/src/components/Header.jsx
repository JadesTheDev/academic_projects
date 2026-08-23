/*
=========================================================
SDC445 - Interface Design
From the Farm

Description:
Header component for the application.
Displays the navigation buttons, application title,
login button, and menu toggle.

=========================================================
*/

import { PiArrowElbowUpLeftBold } from "react-icons/pi";
import { TfiHome } from "react-icons/tfi";
import plantLogo from "../assets/brand/plant-logo.svg";

function Header({
  onBackClick,
  onHomeClick,
  onLoginClick,
  onMenuClick,
  isMenuOpen,
}) {
  return (
    <header className="header">
      <div className="header-navigation">
        <button
          type="button"
          className="header-icon-button"
          onClick={onBackClick}
          aria-label="Back"
        >
          <PiArrowElbowUpLeftBold />
        </button>

        <button
          type="button"
          className="header-icon-button"
          onClick={onHomeClick}
          aria-label="Home"
        >
          <TfiHome />
        </button>
      </div>

      <button
        type="button"
        className="brand-button"
        onClick={onHomeClick}
        aria-label="From the Farm home"
      >
        <img
          src={plantLogo}
          alt=""
          className="brand-logo"
        />
        <span className="app-title">From the Farm</span>
      </button>

      <div className="header-actions">
        <button
          type="button"
          className="header-action-button"
          onClick={onLoginClick}
        >
          Log In
        </button>

        <button
          type="button"
          className="header-action-button"
          onClick={onMenuClick}
          aria-label="Menu"
          aria-haspopup="menu"
          aria-expanded={isMenuOpen}
        >
          Menu
        </button>
      </div>
    </header>
  );
}

export default Header;
