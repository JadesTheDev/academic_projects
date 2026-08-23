/*
=========================================================
SDC445 - Interface Design
From the Farm

Description:
Listings page (formerly "Product Catalog", now reached from
the "Listings" menu button). Displays the full set of
available products as gridded tiles, based on the "Product
Catalog" screen from the Visual Foundation design, adapted
from a vertical list to a gridded tile layout for the web
app. Each tile shows the product's graphic, price,
supplier, availability, and food category. Selecting a
product opens its "Product Listing" page, which shows the
supplier carrying that product.

=========================================================
*/

import { useMemo, useState } from "react";
import "./ProductCatalog.css";
import ProductTile from "./ProductTile";
import { catalogProducts } from "../data/marketplaceData";

export { catalogProducts } from "../data/marketplaceData";

function ProductCatalog({ onSelectProduct }) {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  const categories = [
    "All",
    ...new Set(
      catalogProducts.map((product) => product.category)
    ),
  ];

  const filtered = useMemo(
    () =>
      catalogProducts.filter((product) => {
        const matchesCategory =
          category === "All" || product.category === category;

        const term = search.trim().toLowerCase();

        const matchesSearch =
          !term ||
          `${product.name} ${product.supplier.name} ${product.category}`
            .toLowerCase()
            .includes(term);

        return matchesCategory && matchesSearch;
      }),
    [search, category]
  );

  return (
    <section className="catalog-page">
      <div className="catalog-title-row">
        <div>
          <p className="page-eyebrow">
            Fresh nearby
          </p>

          <h2 className="catalog-heading">
            Listings
          </h2>

          <p className="catalog-subheading">
            Browse local food and meet the people behind it.
          </p>
        </div>

        <span className="catalog-count">
          {filtered.length} local items
        </span>
      </div>

      <div className="catalog-tools">
        <input
          type="search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search products or suppliers..."
          aria-label="Search listings"
        />

        <div
          className="catalog-filters"
          aria-label="Filter listings by category"
        >
          {categories.map((item) => (
            <button
              type="button"
              key={item}
              className={
                category === item ? "is-active" : ""
              }
              onClick={() => setCategory(item)}
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      <div className="product-grid-tiles">
        {filtered.map((product) => (
          <ProductTile
            key={product.id}
            product={product}
            onSelect={onSelectProduct}
          />
        ))}
      </div>

      {!filtered.length && (
        <p className="empty-state">
          No listings match that search yet.
        </p>
      )}
    </section>
  );
}

export default ProductCatalog;
