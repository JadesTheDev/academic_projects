import { PiArrowElbowUpLeftBold } from "react-icons/pi";
import { TfiHome } from "react-icons/tfi";

function Header({
  onBackClick,
  onHomeClick,
  onMenuClick
}) {
  return (
    <header className="header">
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

      <h1 className="app-title">From the Farm</h1>

      <div className="header-placeholders">
        <span className="header-placeholder">Cart</span>
        <span className="header-placeholder">Menu</span>
      </div>
    </header>
  );
}

export default Header;
