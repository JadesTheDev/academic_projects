/*
=========================================================
SDC445 - Interface Design
From the Farm

Description:
ProductTile component for the Listings page. Displays a
single product as a clickable grid tile with a graphic,
name, price, category, availability, and supplier,
adapting the "Product Catalog" screen from the Visual
Foundation design (a vertical list) into a gridded tile
layout for the web app. Selecting a tile opens that
product's "Product Listing" page, which shows the supplier
carrying it.

=========================================================
*/

import "./ProductTile.css";

function ProductTile({ product, onSelect }) {
  const { name, price, category, availability, supplier, image } = product;

  return (
    <button
      type="button"
      className="product-tile"
      onClick={() => onSelect && onSelect(product)}
    >
      <div className="product-tile-image">
        <img src={image} alt={name} className="product-tile-photo" />
      </div>

      <div className="product-tile-details">
        <h3 className="product-tile-name">{name}</h3>
        <p className="product-tile-price">{price}</p>

        <div className="product-tile-meta">
          <span className="product-tile-badge product-tile-category">
            {category}
          </span>
          <span
            className={`product-tile-badge product-tile-availability ${availabilityClass(
              availability
            )}`}
          >
            {availability}
          </span>
        </div>

        <p className="product-tile-supplier">Supplier: {supplier.name}</p>
      </div>
    </button>
  );
}

function availabilityClass(availability) {
  switch (availability) {
    case "In Stock":
      return "is-in-stock";
    case "Low Stock":
      return "is-low-stock";
    case "Out of Stock":
      return "is-out-of-stock";
    default:
      return "";
  }
}

// ==========================
// Export Component
// ==========================

export default ProductTile;
