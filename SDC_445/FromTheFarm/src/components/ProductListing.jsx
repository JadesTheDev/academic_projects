/*
=========================================================
SDC445 - Interface Design
From the Farm

Description:
Product Listing page. Shows the details for a single
product selected from the Listings page, along with the
supplier that carries it, based on the "Product Listing"
screen from the Visual Foundation design. The supplier
shown here is that product's individual entry from the
Supplier Registry, not the full registry page.

=========================================================
*/

import "./ProductListing.css";

function ProductListing({ product, onBack }) {
  if (!product) {
    return (
      <section className="listing-page">
        <p>No product selected.</p>

        <button
          type="button"
          className="listing-back-button"
          onClick={onBack}
        >
          Back to Listings
        </button>
      </section>
    );
  }

  const { name, price, category, availability, supplier, image } = product;

  return (
    <section className="listing-page">
      <div className="listing-image">
        <img src={image} alt={name} className="listing-photo" />
      </div>

      <h2 className="listing-name">{name}</h2>
      <p className="listing-price">Unit Price: {price}</p>

      <div className="listing-meta">
        <span
          className={`listing-badge listing-availability ${availabilityClass(
            availability
          )}`}
        >
          {availability}
        </span>
        <span className="listing-badge listing-category">{category}</span>
      </div>

      <h3 className="listing-supplier-heading">Supplier</h3>

      {/* Supplier snippet, linked from this product's Supplier Registry entry */}
      <div className="listing-supplier-card">
        <div className="listing-supplier-image">
          <img src={image} alt="" className="listing-supplier-photo" />
        </div>

        <div className="listing-supplier-details">
          <h4>{supplier.name}</h4>
          <p className="listing-supplier-description">
            {supplier.description}
          </p>
        </div>

        <div className="listing-supplier-rating">
          <span aria-hidden="true">⭐</span>
          <span>{supplier.rating}</span>
        </div>
      </div>

      <button type="button" className="listing-back-button" onClick={onBack}>
        Back to Listings
      </button>
    </section>
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

export default ProductListing;
