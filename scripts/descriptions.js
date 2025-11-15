import { products } from "./data/products.js";
import { calculateCartQuantity, addToCart } from "./data/cart.js";

const params = new URLSearchParams(window.location.search);
const id = params.get("id");

const product = products.find((p) => p.id === id);

const mainContainer = document.querySelector(".js-main-container");

if (!product) {
  mainContainer.innerHTML = "<h1>Product not found</h1>";
} else {
  mainContainer.innerHTML = `
    <div class="product-container">
      <div class="product-image">
        <img src="images/${product.img}" alt="${product.name}" />
      </div>

      <div class="product-details">
        <h1 class="product-title">${product.name}</h1>

        <div class="rating">
          <div class="stars">${getStarRating(product.rating)}</div>
          <div class="rating-text">(${product.rating})</div>
        </div>

        <div class="price">$${product.getPrice()}</div>

        <div class="fragrance-notes">
          <span>Fragrance Notes: </span>
          <div class="note-tags">
            ${product.keyword
              .map((k) => `<span class="note-tag">${k}</span>`)
              .join("")}
          </div>
        </div>

        <div class="specs">
          <div class="spec-item">
            <div class="spec-label">Type:</div>
            <div class="spec-value">${product.type}</div>
          </div>
          <div class="spec-item">
            <div class="spec-label">Size:</div>
            <div class="spec-value">${product.sizeCharLink}</div>
          </div>
        </div>

        <div class="warranty">
          <h3>Warranty Info</h3>
          <p>30-day money-back guarantee. 1-year manufacturer warranty. Free shipping on orders over $50.</p>
        </div>

        <div class="description">
          <p>${product.instruction}</p>
        </div>

        <div class="divider"></div>
            <div class="product-quantity-container">
          <select class="js-quantity-selector-${product.id}">
            ${[...Array(10)]
              .map((_, i) => `<option value="${i + 1}">${i + 1}</option>`)
              .join("")}
          </select>
          <button class="add-to-cart js-add-to-cart" data-product-id="${
            product.id
          }">
          Add to Cart
        </button>
        </div>
        
      </div>
    </div>
  `;
}
attachAddToCartListener();
updateCartQuantity();

export function attachAddToCartListener() {
  document.querySelectorAll(".js-add-to-cart").forEach((button) => {
    button.addEventListener("click", () => {
      console.log("click");
      const productId = button.dataset.productId;
      addToCart(productId);
      updateCartQuantity();
    });
  });
}

function updateCartQuantity() {
  const cartQuantity = calculateCartQuantity();
  document.querySelector(".js-cart-notification-badge").innerHTML =
    cartQuantity;
}
function getStarRating(rating) {
  const fullStars = "★".repeat(Math.floor(rating));
  const emptyStars = "☆".repeat(5 - Math.floor(rating));
  return `${fullStars}${emptyStars} (${rating}/5)`;
}
