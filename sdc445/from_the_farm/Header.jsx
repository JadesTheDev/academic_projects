function Header({ onBackClick, onHomeClick }) {
  return (
    <header className="header">
      <div className="header-navigation">
        <button
          type="button"
          className="header-button"
          onClick={onBackClick}
        >
          Back
        </button>

        <button
          type="button"
          className="header-button"
          onClick={onHomeClick}
        >
          Home
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