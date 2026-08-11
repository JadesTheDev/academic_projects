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
button functionality, menu visibility, and homepage content.

=========================================================
*/

// ==========================
// Imports
// ==========================

import { useState } from "react";
import "./App.css";

import Header from "./components/Header";
import Menu from "./components/Menu";
import Searchbar from "./components/Searchbar";
import NewsCard from "./components/NewsCard";
import ProductCard from "./components/ProductCard";
import ProductCatalog from "./components/ProductCatalog";

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

  // ==========================
  // Button Functions
  // ==========================

  function handleBackClick() {
    if (currentPage === "catalog") {
      setCurrentPage("home");
      setStatusMessage("Back selected: returning to the homepage.");
      return;
    }

    setStatusMessage(
      "Back selected: returning to the previous page."
    );
  }

  function handleHomeClick() {
    if (currentPage === "home") {
      setStatusMessage(
        "Home selected: you are already on the homepage."
      );
      return;
    }

    setCurrentPage("home");
    setStatusMessage("Home selected: returning to the homepage.");
  }

  function handleMenuClick() {
    setIsMenuOpen((currentMenuState) => !currentMenuState);
  }

  function handleNavigate(page) {
    setIsMenuOpen(false);

    if (page === "products") {
      setCurrentPage("catalog");
      setStatusMessage("Viewing the product catalog.");
      return;
    }

    if (page === "home") {
      setCurrentPage("home");
      setStatusMessage("Home selected: you are already on the homepage.");
      return;
    }

    setStatusMessage(`The ${page} page is not built yet.`);
  }

  function handleSearch() {
    const cleanedSearchText = searchText.trim();

    if (cleanedSearchText === "") {
      setStatusMessage(
        "Search selected: please enter a search term."
      );

      return;
    }

    setStatusMessage(
      `Search results for: ${cleanedSearchText}`
    );
  }

  // ==========================
  // Placeholder Data
  // ==========================

  const newsItems = [
    {
      id: 1,
      title: "Weekend Farmers' Market",
      description:
        "Local farmers will gather downtown this Saturday with produce, baked goods, and handmade products."
    },
    {
      id: 2,
      title: "What Is in Season?",
      description:
        "Learn which fruits and vegetables are currently available from farms in your community."
    },
    {
      id: 3,
      title: "Community Farm Event",
      description:
        "Families are invited to visit a nearby farm for demonstrations, activities, and local food."
    }
  ];

  const products = [
    {
      id: 1,
      name: "Fresh Local Tomatoes",
      price: "$4.00 per basket"
    },
    {
      id: 2,
      name: "Local Wildflower Honey",
      price: "$9.00 per jar"
    }
  ];

  // ==========================
  // Render Homepage
  // ==========================

  return (
    <div className="app">
      {/* Header */}

      <Header
        onBackClick={handleBackClick}
        onHomeClick={handleHomeClick}
        onMenuClick={handleMenuClick}
      />

      {/* Navigation Menu */}

      {isMenuOpen && <Menu onNavigate={handleNavigate} />}

      {/* Main Page Content */}

      <main className="main-content">
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

        {/* Page Content */}

        {currentPage === "home" ? (
          <>
            {/* Hero Section */}

            <section className="hero-section">
              <div className="hero-graphic">
                <p>Farm Image Placeholder</p>
              </div>

              <div className="hero-text">
                <h2>Discover Food Grown Near You</h2>

                <p>
                  Find nearby farms, farmers&apos; markets,
                  seasonal products, and community events.
                </p>
              </div>
            </section>

            {/* Recent News Section */}

            <section className="content-section">
              <h2>Recent News</h2>

              <div className="card-grid news-grid">
                {newsItems.map((newsItem) => (
                  <NewsCard
                    key={newsItem.id}
                    title={newsItem.title}
                    description={newsItem.description}
                  />
                ))}
              </div>
            </section>

            {/* Featured Products Section */}

            <section className="content-section">
              <h2>For You</h2>

              <div className="card-grid product-grid">
                {products.map((product) => (
                  <ProductCard
                    key={product.id}
                    name={product.name}
                    price={product.price}
                  />
                ))}
              </div>
            </section>
          </>
        ) : (
          <ProductCatalog />
        )}
      </main>

      {/* Footer */}

      <footer className="footer">
        <p>From the Farm — React Group Project</p>
      </footer>
    </div>
  );
}

// ==========================
// Export Component
// ==========================

export default App;
