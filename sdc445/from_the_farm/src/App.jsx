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
import Profile from "./components/Profile";
import Login from "./components/Login";
import MapPage from "./components/MapPage";
import SeasonalCalendar from "./components/SeasonalCalendar";
import ProductCatalog from "./components/ProductCatalog";
import ProductListing from "./components/ProductListing";
import News from "./components/News";
import Suppliers from "./components/Suppliers";

import heroImage from "./assets/products/farmers-market.jpg";


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
  const [previousPage, setPreviousPage] = useState("home");
  const [selectedProduct, setSelectedProduct] = useState(null);


  // ==========================
  // Navigation Functions
  // ==========================

  function navigateTo(page) {
    if (page !== currentPage) {
      setPreviousPage(currentPage);
      setCurrentPage(page);
    }

    setIsMenuOpen(false);
  }

  function handleBackClick() {
    const pageToReturnTo = previousPage;

    setPreviousPage(currentPage);
    setCurrentPage(pageToReturnTo);
    setIsMenuOpen(false);
    setStatusMessage("Returned to the previous page.");
  }

  function handleHomeClick() {
    navigateTo("home");
    setStatusMessage("Welcome to From the Farm");
  }

  function handleLoginClick() {
    navigateTo("login");
  }

  function handleSelectProduct(product) {
    setSelectedProduct(product);
    navigateTo("productListing");
  }

  function handleMenuClick() {
    setIsMenuOpen((currentMenuState) => !currentMenuState);
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
        "Local farmers will gather downtown this Saturday with produce, baked goods, and handmade products.",
    },
    {
      id: 2,
      title: "What Is in Season?",
      description:
        "Learn which fruits and vegetables are currently available from farms in your community.",
    },
    {
      id: 3,
      title: "Community Farm Event",
      description:
        "Families are invited to visit a nearby farm for demonstrations, activities, and local food.",
    },
  ];

  const products = [
    {
      id: 1,
      name: "Fresh Local Tomatoes",
      price: "$4.00 per basket",
    },
    {
      id: 2,
      name: "Local Wildflower Honey",
      price: "$9.00 per jar",
    },
  ];


  // ==========================
  // Page Rendering
  // ==========================

  function renderCurrentPage() {
    switch (currentPage) {
      case "profile":
        return <Profile />;

      case "login":
        return <Login />;

      case "map":
        return <MapPage />;

      case "suppliers":
        return <Suppliers />;

      case "calendar":
        return <SeasonalCalendar />;

      case "listings":
        return (
          <ProductCatalog
            onSelectProduct={handleSelectProduct}
          />
        );

      case "productListing":
        return (
          <ProductListing
            product={selectedProduct}
            onBack={() => navigateTo("listings")}
          />
        );

      case "news":
        return <News />;

      default:
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
              <div className="hero-graphic">
                <img
                  className="hero-photo"
                  src={heroImage}
                  alt="Fresh produce at a local farmers market"
                />
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
        );
    }
  }


  // ==========================
  // Render Application
  // ==========================

  return (
    <div className="app">
      <Header
        onBackClick={handleBackClick}
        onHomeClick={handleHomeClick}
        onLoginClick={handleLoginClick}
        onMenuClick={handleMenuClick}
        isMenuOpen={isMenuOpen}
      />

      {isMenuOpen && (
        <Menu
          onHomeClick={handleHomeClick}
          onListingsClick={() => navigateTo("listings")}
          onSuppliersClick={() => navigateTo("suppliers")}
          onMapClick={() => navigateTo("map")}
          onCalendarClick={() => navigateTo("calendar")}
          onProfileClick={() => navigateTo("profile")}
          onNewsClick={() => navigateTo("news")}
        />
      )}

      <main className="main-content">
        {renderCurrentPage()}
      </main>

      <footer className="footer">
        <p>From the Farm — React Group Project</p>
      </footer>
    </div>
  );
}

export default App;
