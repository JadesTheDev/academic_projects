import tomatoesPhoto from "../assets/products/tomatoes.jpg";
import basilPhoto from "../assets/products/basil.jpg";
import honeyPhoto from "../assets/products/honey.jpg";
import cornPhoto from "../assets/products/corn.jpg";
import eggsPhoto from "../assets/products/eggs.jpg";
import spinachPhoto from "../assets/products/spinach.jpg";
import peachesPhoto from "../assets/products/peaches.jpg";
import chickenPhoto from "../assets/products/chicken-breast.jpg";
import baconPhoto from "../assets/products/bacon.jpg";

export const suppliers = [
  {
    id: "green-valley",
    name: "Green Valley Farms",
    type: "Family Farm",
    distance: "2.4 miles",
    location: "Charleston, SC",
    hours: "Open today · 8 AM–5 PM",
    categories: ["Vegetables", "Herbs"],
    description:
      "Family-owned vegetable farm growing seasonal Lowcountry produce since 1998.",
    contact: "Farm stand and local market pickup",
    mapQuery: "Green Valley Farms Charleston SC",
    image: tomatoesPhoto,
    rating: 4.8,
  },
  {
    id: "creekside",
    name: "Creekside Honey & Produce",
    type: "Apiary & Produce",
    distance: "6.8 miles",
    location: "Summerville, SC",
    hours: "Open today · 9 AM–4 PM",
    categories: ["Honey", "Produce"],
    description:
      "Wildflower honey and a rotating selection of tomatoes, peppers, squash, and preserves.",
    contact: "Farm pickup and community markets",
    mapQuery: "local honey Summerville SC",
    image: honeyPhoto,
    rating: 4.9,
  },
  {
    id: "sunrise-poultry",
    name: "Sunrise Poultry Farm",
    type: "Poultry Farm",
    distance: "8.1 miles",
    location: "Goose Creek, SC",
    hours: "Open today · 8 AM–3 PM",
    categories: ["Eggs", "Meat"],
    description:
      "Pasture-raised eggs and poultry from a small local producer.",
    contact: "Preorder and farm pickup",
    mapQuery: "poultry farm Goose Creek SC",
    image: eggsPhoto,
    rating: 4.7,
  },
  {
    id: "hilltop-orchard",
    name: "Hilltop Orchard",
    type: "Orchard",
    distance: "12.6 miles",
    location: "Moncks Corner, SC",
    hours: "Seasonal hours · 9 AM–5 PM",
    categories: ["Fruit", "Seasonal"],
    description:
      "Third-generation orchard offering peaches, apples, and seasonal fruit.",
    contact: "Farm stand and seasonal events",
    mapQuery: "orchard Moncks Corner SC",
    image: peachesPhoto,
    rating: 4.5,
  },
  {
    id: "oakwood",
    name: "Oakwood Smokehouse",
    type: "Local Producer",
    distance: "10.2 miles",
    location: "North Charleston, SC",
    hours: "Open today · 10 AM–6 PM",
    categories: ["Meat", "Prepared Foods"],
    description:
      "Small-batch smoked meats and locally prepared farm products.",
    contact: "Shop pickup",
    mapQuery: "smokehouse North Charleston SC",
    image: baconPhoto,
    rating: 4.8,
  },
];

const supplierById = Object.fromEntries(
  suppliers.map((supplier) => [supplier.id, supplier])
);

export const catalogProducts = [
  {
    id: 1,
    name: "Heirloom Tomatoes",
    price: "$3.99 / lb",
    category: "Vegetables",
    availability: "In Stock",
    image: tomatoesPhoto,
    supplierId: "green-valley",
  },
  {
    id: 2,
    name: "Fresh Basil",
    price: "$2.39 / bunch",
    category: "Herbs",
    availability: "In Stock",
    image: basilPhoto,
    supplierId: "green-valley",
  },
  {
    id: 3,
    name: "Local Wildflower Honey",
    price: "$9.00 / jar",
    category: "Pantry",
    availability: "Low Stock",
    image: honeyPhoto,
    supplierId: "creekside",
  },
  {
    id: 4,
    name: "Sweet Corn",
    price: "$0.75 / ear",
    category: "Vegetables",
    availability: "In Stock",
    image: cornPhoto,
    supplierId: "green-valley",
  },
  {
    id: 5,
    name: "Farm Fresh Eggs",
    price: "$5.49 / dozen",
    category: "Dairy & Eggs",
    availability: "In Stock",
    image: eggsPhoto,
    supplierId: "sunrise-poultry",
  },
  {
    id: 6,
    name: "Baby Spinach",
    price: "$3.25 / bag",
    category: "Vegetables",
    availability: "Out of Stock",
    image: spinachPhoto,
    supplierId: "green-valley",
  },
  {
    id: 7,
    name: "Golden Peaches",
    price: "$4.50 / lb",
    category: "Fruits",
    availability: "In Stock",
    image: peachesPhoto,
    supplierId: "hilltop-orchard",
  },
  {
    id: 8,
    name: "Chicken Breast",
    price: "$6.99 / lb",
    category: "Meat",
    availability: "In Stock",
    image: chickenPhoto,
    supplierId: "sunrise-poultry",
  },
  {
    id: 9,
    name: "Bacon",
    price: "$7.49 / lb",
    category: "Meat",
    availability: "Low Stock",
    image: baconPhoto,
    supplierId: "oakwood",
  },
].map((product) => ({
  ...product,
  supplier: supplierById[product.supplierId],
}));

export const mapCategories = [
  "Farms",
  "Farmers Markets",
  "Produce",
  "Eggs",
  "Meat",
  "Dairy",
  "Honey",
  "Baked Goods",
  "Plants & Nurseries",
];
