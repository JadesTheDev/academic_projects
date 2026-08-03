import { useState } from "react";
import "./App.css";

import Header from "./Header";
import Searchbar from "./Searchbar";
import NewsCard from "./NewsCard";
import ProductCard from "./ProductCard";

function App() {
  const [searchText, setSearchText] = useState("");
  const [statusMessage, setStatusMessage] = useState(
    "Welcome to From the Farm"
  );

  function handleBackClick() {
    setStatusMessage("Back button clicked");
  }

  function handleHomeClick() {
    setStatusMessage("You are already on the homepage");
  }

  function handleSearch() {
    const cleanedSearchText = searchText.trim();

    if (cleanedSearchText === "") {
      setStatusMessage("Please enter something to search for");
      return;
    }

    setStatusMessage(`You searched for: ${cleanedSearchText}`);
  }

  const newsItems = [
    {
      id: 1,
      title: "Weekend Farmers’ Market",
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

  return (
    <div className="app">
      <Header
        onBackClick={handleBackClick}
        onHomeClick={handleHomeClick}
      />

      <main className="main-content">
        <Searchbar
          searchText={searchText}
          onSearchTextChange={setSearchText}
          onSearch={handleSearch}
        />

        <p className="status-message" aria-live="polite">
          {statusMessage}
        </p>

        <section className="hero-section">
          <div className="hero-graphic">
            <p>Farm Image Placeholder</p>
          </div>

          <div className="hero-text">
            <h2>Discover Food Grown Near You</h2>

            <p>
              Find nearby farms, farmers’ markets, seasonal products,
              and community events.
            </p>
          </div>
        </section>

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
      </main>

      <footer className="footer">
        <p>From the Farm — Week 1 React Project</p>
      </footer>
    </div>
  );
}

export default App;
