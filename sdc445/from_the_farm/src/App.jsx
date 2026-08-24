/*
=========================================================
SDC445 - Interface Design
From the Farm

Authors:
- Jade Powell
- Holly Hebert
- Patrick Gonzalez

Description:
Main application component for the From the Farm project.
This component manages the application's state,
button functionality, menu visibility, and page content.

=========================================================
*/

import { useState } from "react";
import "./App.css";

import Header from "./components/Header";
import Menu from "./components/Menu";
import Searchbar from "./components/Searchbar";
import Profile from "./components/Profile";
import Login from "./components/Login";
import MapPage from "./components/MapPage";
import SeasonalCalendar from "./components/SeasonalCalendar";
import ProductCatalog from "./components/ProductCatalog";
import ProductListing from "./components/ProductListing";
import News from "./components/News";
import Suppliers from "./components/Suppliers";

import { catalogProducts } from "./data/marketplaceData";

import heroImage from "./assets/products/farmers-market.jpg";
import plantLogo from "./assets/brand/plant-logo.svg";


// ==========================
// Main Application Component
// ==========================

function App() {

  // ==========================
  // React State
  // ==========================

  const [searchText, setSearchText] = useState("");

  const [statusMessage, setStatusMessage] = useState(
    "Welcome to From the Farm"
  );

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState("home");
  const [history, setHistory] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);


  // ==========================
  // Header and Menu Navigation
  // ==========================

  function navigateTo(page) {
    if (page !== currentPage) {
      setHistory((items) =>
        [...items, currentPage].slice(-12)
      );

      setCurrentPage(page);
    }

    setIsMenuOpen(false);
  }

  function handleBackClick() {
    if (history.length) {
      setCurrentPage(history[history.length - 1]);
      setHistory(history.slice(0, -1));
    } else {
      setCurrentPage("home");
    }

    setIsMenuOpen(false);
  }

  function handleHomeClick() {
    if (currentPage !== "home") {
      setHistory((items) =>
        [...items, currentPage].slice(-12)
      );
    }

    setCurrentPage("home");
    setIsMenuOpen(false);
    setStatusMessage("Welcome to From the Farm");
  }

  function handleMenuClick() {
    setIsMenuOpen((open) => !open);
  }


  // ==========================
  // Product Navigation
  // ==========================

  function handleSelectProduct(product) {
    setSelectedProduct(product);
    navigateTo("productListing");
  }


  // ==========================
  // Search Function
  // ==========================

  function handleSearch() {
    const term = searchText.trim();

    if (!term) {
      setStatusMessage(
        "Enter a product, farm, or local food to search."
      );

      return;
    }

    setStatusMessage(
      `Showing local discovery options for “${term}”.`
    );
  }


  // ==========================
  // Home Page
  // ==========================

  function renderHomePage() {
    return (
      <>
        {/* Search Section */}
        <Searchbar
          searchText={searchText}
          onSearchTextChange={setSearchText}
          onSearch={handleSearch}
        />

        <p
          className="status-message"
          aria-live="polite"
        >
          {statusMessage}
        </p>


        {/* Hero Section */}
        <section className="hero-section">
          <img
            className="hero-photo"
            src={heroImage}
            alt="Fresh produce at a local farmers market"
          />

          <div className="hero-text">
            <img
              className="hero-plant"
              src={plantLogo}
              alt=""
            />

            <p className="page-eyebrow">
              Grown close to home
            </p>

            <h2>Come eat local.</h2>

            <p>
              Discover fresh food, the people who produce it,
              when it is in season, and what is happening in
              your local farm community.
            </p>

            <div className="hero-actions">
              <button
                type="button"
                onClick={() => navigateTo("listings")}
              >
                Browse Listings
              </button>

              <button
                type="button"
                className="secondary-button"
                onClick={() => navigateTo("suppliers")}
              >
                Meet Suppliers
              </button>
            </div>
          </div>
        </section>


        {/* Featured Products Section */}
        <section className="content-section">
          <div className="section-heading-row">
            <div>
              <p className="page-eyebrow">
                Fresh right now
              </p>

              <h2>For You</h2>
            </div>

            <button
              type="button"
              className="text-button"
              onClick={() => navigateTo("listings")}
            >
              See all listings →
            </button>
          </div>

          <div className="home-product-grid">
            {catalogProducts
              .slice(0, 4)
              .map((product) => (
                <button
                  type="button"
                  className="home-product-card"
                  key={product.id}
                  onClick={() =>
                    handleSelectProduct(product)
                  }
                >
                  <img
                    src={product.image}
                    alt={product.name}
                  />

                  <span>
                    <strong>
                      {product.name}
                    </strong>

                    <small>
                      {product.price} ·{" "}
                      {product.supplier.name}
                    </small>
                  </span>
                </button>
              ))}
          </div>
        </section>


        {/* Community Section */}
        <section className="community-banner">
          <div>
            <p className="page-eyebrow">
              Your local food community
            </p>

            <h2>Know who grows your food.</h2>

            <p>
              Browse nearby suppliers, check the seasonal
              calendar, and catch market or harvest updates
              in one place.
            </p>
          </div>

          <div>
            <button
              type="button"
              onClick={() => navigateTo("map")}
            >
              Explore the Map
            </button>

            <button
              type="button"
              onClick={() => navigateTo("news")}
            >
              Community News
            </button>
          </div>
        </section>
      </>
    );
  }


  // ==========================
  // Page Rendering
  // ==========================

  function renderCurrentPage() {
    switch (currentPage) {

      // ==========================
      // Profile
      // ==========================

      case "profile":
        return <Profile />;


      // ==========================
      // Login
      // ==========================

      case "login":
        return <Login />;


      // ==========================
      // Map
      // ==========================

      case "map":
        return <MapPage />;


      // ==========================
      // Suppliers
      // ==========================

      case "suppliers":
        return <Suppliers />;


      // ==========================
      // Seasonal Calendar
      // ==========================

      case "calendar":
        return <SeasonalCalendar />;


      // ==========================
      // Product Listings
      // ==========================

      case "listings":
        return (
          <ProductCatalog
            onSelectProduct={handleSelectProduct}
          />
        );


      // ==========================
      // Individual Product
      // ==========================

      case "productListing":
        return (
          <ProductListing
            product={selectedProduct}
            onBack={() => navigateTo("listings")}
          />
        );


      // ==========================
      // News
      // ==========================

      case "news":
        return <News />;


      // ==========================
      // Home
      // ==========================

      default:
        return renderHomePage();
    }
  }


  // ==========================
  // Application Layout
  // ==========================

  return (
    <div className="app">

      {/* ==========================
          Header
          ========================== */}

      <Header
        onBackClick={handleBackClick}
        onHomeClick={handleHomeClick}
        onLoginClick={() => navigateTo("login")}
        onMenuClick={handleMenuClick}
        isMenuOpen={isMenuOpen}
      />


      {/* ==========================
          Navigation Menu
          ========================== */}

      {isMenuOpen && (
        <Menu
          onHomeClick={handleHomeClick}
          onListingsClick={() => navigateTo("listings")}
          onSuppliersClick={() => navigateTo("suppliers")}
          onMapClick={() => navigateTo("map")}
          onCalendarClick={() => navigateTo("calendar")}
          onProfileClick={() => navigateTo("profile")}
          onNewsClick={() => navigateTo("news")}
          onLoginClick={() => navigateTo("login")}
        />
      )}


      {/* ==========================
          Main Page Content
          ========================== */}

      <main className="main-content">
        {renderCurrentPage()}
      </main>


      {/* ==========================
          Footer
          ========================== */}

      <footer className="footer">
        <img
          src={plantLogo}
          alt=""
        />

        <p>
          <strong>From the Farm</strong>
          <br />

          <span>
            Local food. Local people. Grown close to home.
          </span>
        </p>
      </footer>

    </div>
  );
}

export default App;