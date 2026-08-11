/*
=========================================================
SDC445 - Interface Design
From the Farm

Description:
Product Catalog page. Displays the full list of available
products as image + name + price rows, based on the
"Product Catalog" screen from the Visual Foundation
design.

=========================================================
*/

// ==========================
// Imports
// ==========================

import "./ProductCatalog.css";
import ProductListItem from "./ProductListItem";

// ==========================
// Placeholder Data
// ==========================
// TODO: Replace with real data from the Stock API once it
// is available (see "FoF Stock API" in Visual Foundation).

const catalogProducts = [
  { id: 1, name: "Heirloom Tomatoes", price: "$3.99 / lb" },
  { id: 2, name: "Fresh Basil", price: "$2.39 / bunch" },
  { id: 3, name: "Local Wildflower Honey", price: "$9.00 / jar" },
  { id: 4, name: "Sweet Corn", price: "$0.75 / ear" },
  { id: 5, name: "Farm Fresh Eggs", price: "$5.49 / dozen" },
  { id: 6, name: "Baby Spinach", price: "$3.25 / bag" },
  { id: 7, name: "Golden Peaches", price: "$4.50 / lb" }
];

// ==========================
// ProductCatalog Component
// ==========================

function ProductCatalog() {
  return (
    <section className="catalog-page">
      <h2 className="catalog-heading">Product Catalog</h2>

      <div className="product-list">
        {catalogProducts.map((product) => (
          <ProductListItem
            key={product.id}
            name={product.name}
            price={product.price}
            imageUrl={product.imageUrl}
          />
        ))}
      </div>
    </section>
  );
}

// ==========================
// Export Component
// ==========================

export default ProductCatalog;
