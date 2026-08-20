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

// ==========================
// Imports
// ==========================

import "./ProductCatalog.css";
import ProductTile from "./ProductTile";

import tomatoesPhoto from "../assets/products/tomatoes.jpg";
import basilPhoto from "../assets/products/basil.jpg";
import honeyPhoto from "../assets/products/honey.jpg";
import cornPhoto from "../assets/products/corn.jpg";
import eggsPhoto from "../assets/products/eggs.jpg";
import spinachPhoto from "../assets/products/spinach.jpg";
import peachesPhoto from "../assets/products/peaches.jpg";
import chickenBreastPhoto from "../assets/products/chicken-breast.jpg";
import baconPhoto from "../assets/products/bacon.jpg";

// ==========================
// Placeholder Data
// ==========================
// TODO: Replace with real data from the Stock API once it
// is available (see "FoF Stock API" in Visual Foundation).

export const catalogProducts = [
  {
    id: 1,
    name: "Heirloom Tomatoes",
    price: "$3.99 / lb",
    category: "Vegetables",
    availability: "In Stock",
    image: tomatoesPhoto,
    supplier: {
      name: "Green Valley Farms",
      description:
        "Family-owned vegetable farm growing heirloom produce since 1998.",
      rating: 4.8
    }
  },
  {
    id: 2,
    name: "Fresh Basil",
    price: "$2.39 / bunch",
    category: "Herbs",
    availability: "In Stock",
    image: basilPhoto,
    supplier: {
      name: "Riverbend Herb Co.",
      description:
        "Small-batch herb growers specializing in culinary basil and mint.",
      rating: 4.6
    }
  },
  {
    id: 3,
    name: "Local Wildflower Honey",
    price: "$9.00 / jar",
    category: "Pantry",
    availability: "Low Stock",
    image: honeyPhoto,
    supplier: {
      name: "Creekside Honey & Produce",
      description: "Wildflower honey, tomatoes, peppers, and squash.",
      rating: 4.9
    }
  },
  {
    id: 4,
    name: "Sweet Corn",
    price: "$0.75 / ear",
    category: "Vegetables",
    availability: "In Stock",
    image: cornPhoto,
    supplier: {
      name: "Green Valley Farms",
      description:
        "Family-owned vegetable farm growing heirloom produce since 1998.",
      rating: 4.8
    }
  },
  {
    id: 5,
    name: "Farm Fresh Eggs",
    price: "$5.49 / dozen",
    category: "Dairy & Eggs",
    availability: "In Stock",
    image: eggsPhoto,
    supplier: {
      name: "Sunrise Poultry Farm",
      description:
        "Pasture-raised eggs and poultry, raised without antibiotics.",
      rating: 4.7
    }
  },
  {
    id: 6,
    name: "Baby Spinach",
    price: "$3.25 / bag",
    category: "Vegetables",
    availability: "Out of Stock",
    image: spinachPhoto,
    supplier: {
      name: "Green Valley Farms",
      description:
        "Family-owned vegetable farm growing heirloom produce since 1998.",
      rating: 4.8
    }
  },
  {
    id: 7,
    name: "Golden Peaches",
    price: "$4.50 / lb",
    category: "Fruits",
    availability: "In Stock",
    image: peachesPhoto,
    supplier: {
      name: "Hilltop Orchard",
      description: "Third-generation orchard growing stone fruit and apples.",
      rating: 4.5
    }
  },
  {
    id: 8,
    name: "Chicken Breast",
    price: "$6.99 / lb",
    category: "Meat",
    availability: "In Stock",
    image: chickenBreastPhoto,
    supplier: {
      name: "Sunrise Poultry Farm",
      description:
        "Pasture-raised eggs and poultry, raised without antibiotics.",
      rating: 4.7
    }
  },
  {
    id: 9,
    name: "Bacon",
    price: "$7.49 / lb",
    category: "Meat",
    availability: "Low Stock",
    image: baconPhoto,
    supplier: {
      name: "Oakwood Smokehouse",
      description: "Small-batch, hickory-smoked bacon and cured meats.",
      rating: 4.8
    }
  }
];

// ==========================
// ProductCatalog Component
// ==========================

function ProductCatalog({ onSelectProduct }) {
  return (
    <section className="catalog-page">
      <h2 className="catalog-heading">Listings</h2>

      <p className="catalog-subheading">
        Browse local products and see the supplier behind each one.
      </p>

      <div className="product-grid-tiles">
        {catalogProducts.map((product) => (
          <ProductTile
            key={product.id}
            product={product}
            onSelect={onSelectProduct}
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
