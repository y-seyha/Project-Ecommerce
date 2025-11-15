import { products } from "./data/products.js";
import { addToCart, calculateCartQuantity } from "./data/cart.js";

// --- RENDER HOMEPAGE ---
function renderHomepage(productList = products) {
  const productContainer = document.querySelector(".js-product-list");
  let productSummaryHTML = "";

  productList.forEach((product) => {
    productSummaryHTML += `
      <div class="product-card">
        <img src="./images/${product.img}" alt="${product.name}" />
        <h3 class="name">${product.name}</h3>
        <div class="stars">${getStarRating(product.rating)}</div>
        <div class="price">$${product.getPrice()}</div>
        <div class="keywords">${product.keyword.join(", ")}</div>
        <div class="type">Type: ${product.type}</div>
        <div class="size">Size: ${product.sizeCharLink}</div>
        <a href="${product.warrantyLink}" target="_blank">Warranty Info</a>
        <div class="product-quantity-container">
          <select class="js-quantity-selector-${product.id}">
            ${[...Array(10)]
              .map((_, i) => `<option value="${i + 1}">${i + 1}</option>`)
              .join("")}
          </select>
        </div>
        <div class="instruction">${product.instruction}</div>
        <button class="add-to-cart js-add-to-cart" data-product-id="${
          product.id
        }">
          Add to Cart
        </button>
      </div>
    `;
  });

  productContainer.innerHTML = productSummaryHTML;
  attachAddToCartListener();
  updateCartQuantity();

  function getStarRating(rating) {
    const fullStars = "★".repeat(Math.floor(rating));
    const emptyStars = "☆".repeat(5 - Math.floor(rating));
    return `${fullStars}${emptyStars} (${rating}/5)`;
  }
}

// --- ATTACH ADD TO CART LISTENER ---
function attachAddToCartListener() {
  document.querySelectorAll(".js-add-to-cart").forEach((button) => {
    button.addEventListener("click", () => {
      const productId = button.dataset.productId;
      addToCart(productId);
      updateCartQuantity();
    });
  });
}

// --- UPDATE CART QUANTITY ---
function updateCartQuantity() {
  const cartQuantity = calculateCartQuantity();
  const badge = document.querySelector(".js-cart-notification-badge");
  if (badge) badge.textContent = cartQuantity;
}

// --- SEARCH FUNCTIONALITY ---
function attachSearchListener() {
  const searchInput = document.querySelector(".js-search-input");
  const searchResults = document.getElementById("searchResults");
  const resultsList = searchResults.querySelector(".results-list");
  const closeBtn = document.getElementById("closeSearch");

  if (!searchInput) return;

  searchInput.addEventListener("input", () => {
    const query = searchInput.value.toLowerCase().trim();
    const filteredProducts = products.filter((product) =>
      product.name.toLowerCase().includes(query)
    );

    if (filteredProducts.length === 0 || query === "") {
      resultsList.innerHTML = "";
      searchResults.style.display = "none";
      return;
    }

    resultsList.innerHTML = filteredProducts
      .map(
        (product) => `
      <div class="search-item" data-product-id="${product.id}">
        ${product.name} - $${product.getPrice()}
      </div>
    `
      )
      .join("");

    searchResults.style.display = "block";

    // Add click event to each search item
    resultsList.querySelectorAll(".search-item").forEach((item) => {
      item.addEventListener("click", () => {
        const productId = item.dataset.productId;
        addToCart(productId);
        updateCartQuantity();
        searchResults.style.display = "none";
        searchInput.value = "";
      });
    });
  });

  // Close button
  closeBtn.addEventListener("click", () => {
    searchResults.style.display = "none";
    searchInput.value = "";
  });
}

// --- INITIAL LOAD ---
document.addEventListener("DOMContentLoaded", () => {
  renderHomepage(); // Render main homepage
  attachSearchListener(); // Activate search
});
