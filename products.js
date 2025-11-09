function generateId() {
  return "prod_" + Math.random().toString(36).substring(2, 10);
}

// Example product data
const products = [
  {
    img: "https://images.unsplash.com/photo-1615218862436-0b74c6a5e5d7?auto=format&fit=crop&w=400&q=80",
    rating: 4,
    priceCents: 4999,
    keyword: ["fragrance", "luxury"],
    type: "Eau de Parfum",
    sizeCharLink: "50ml",
    warrantyLink: "#",
    instruction: "Keep away from direct sunlight.",
  },
  {
    img: "https://images.unsplash.com/photo-1612831455541-3ad6f2b0c780?auto=format&fit=crop&w=400&q=80",
    rating: 5,
    priceCents: 6999,
    keyword: ["sport", "fresh"],
    type: "Eau de Toilette",
    sizeCharLink: "100ml",
    warrantyLink: "#",
    instruction: "Store in a cool dry place.",
  },
  {
    img: "https://images.unsplash.com/photo-1612831455541-3ad6f2b0c780?auto=format&fit=crop&w=400&q=80",
    rating: 5,
    priceCents: 6999,
    keyword: ["sport", "fresh"],
    type: "Eau de Toilette",
    sizeCharLink: "100ml",
    warrantyLink: "#",
    instruction: "Store in a cool dry place.",
  },
  {
    img: "https://images.unsplash.com/photo-1612831455541-3ad6f2b0c780?auto=format&fit=crop&w=400&q=80",
    rating: 5,
    priceCents: 6999,
    keyword: ["sport", "fresh"],
    type: "Eau de Toilette",
    sizeCharLink: "100ml",
    warrantyLink: "#",
    instruction: "Store in a cool dry place.",
  },
  {
    img: "https://images.unsplash.com/photo-1612831455541-3ad6f2b0c780?auto=format&fit=crop&w=400&q=80",
    rating: 5,
    priceCents: 6999,
    keyword: ["sport", "fresh"],
    type: "Eau de Toilette",
    sizeCharLink: "100ml",
    warrantyLink: "#",
    instruction: "Store in a cool dry place.",
  },
  {
    img: "https://images.unsplash.com/photo-1612831455541-3ad6f2b0c780?auto=format&fit=crop&w=400&q=80",
    rating: 5,
    priceCents: 6999,
    keyword: ["sport", "fresh"],
    type: "Eau de Toilette",
    sizeCharLink: "100ml",
    warrantyLink: "#",
    instruction: "Store in a cool dry place.",
  },
];

// Add id to each product
products.forEach((p) => (p.id = generateId()));

// Render products
const productList = document.getElementById("product-list");

products.forEach((p) => {
  const card = document.createElement("div");
  card.classList.add("product-card");
  card.innerHTML = `
    <img src="${p.img}" alt="Product Image">
    <div class="stars">${"★".repeat(p.rating)}${"☆".repeat(5 - p.rating)}</div>
    <div class="price">$${(p.priceCents / 100).toFixed(2)}</div>
    <div class="keywords">${p.keyword.join(", ")}</div>
    <div class="type">Type: ${p.type}</div>
    <div class="size">Size: ${p.sizeCharLink}</div>
    <a href="${p.warrantyLink}">Warranty Info</a>
    <div class="instruction">${p.instruction}</div>
  `;
  productList.appendChild(card);
});
