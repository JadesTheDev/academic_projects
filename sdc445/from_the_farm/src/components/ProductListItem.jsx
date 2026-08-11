/*
=========================================================
SDC445 - Interface Design
From the Farm

Description:
ProductListItem component for the Product Catalog page.
Displays a single product as a horizontal row with an
image placeholder, name, and price, matching the
"Product Catalog" screen from the Visual Foundation
design.

=========================================================
*/

function ProductListItem({ name, price, imageUrl }) {
  return (
    <article className="product-list-item">
      <div className="product-list-image">
        {imageUrl ? (
          <img src={imageUrl} alt={name} />
        ) : (
          <span>Product Image Placeholder</span>
        )}
      </div>

      <div className="product-list-details">
        <h3>{name}</h3>
        <p className="product-list-price">{price}</p>
      </div>
    </article>
  );
}

// ==========================
// Export Component
// ==========================

export default ProductListItem;
