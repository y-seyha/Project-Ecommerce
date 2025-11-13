import { products } from "./data/products.js";
import { formatCurrency } from "./utils/money.js";
import { addToCart, cart, calculateCartQuantity } from "./data/cart.js";

function renderHomepage() {
  let productSummaryHTML = "";
  // console.log(products);
  products.forEach((product) => {
    productSummaryHTML += `
            <div class="product-card">
                <img src="./images/${product.img}" alt="${product.name}" />
                <h3 class="name">${product.name}</h3>
                <div class="stars">${getStarRating(product.rating)}</div>
                <div class="price">$${formatCurrency(product.priceCents)}</div>
                <div class="keywords">${product.keyword.join(", ")}</div>
                <div class="type">Type: ${product.type}</div>
                <div class="size">Size: ${product.sizeCharLink}</div>
                <a href="${
                  product.warrantyLink
                }" target="_blank">Warranty Info</a>
                <div class="product-quantity-container">
                  <select class = "js-quantity-selector-${product.id}" >
                    <option selected value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                    <option value="8">8</option>
                    <option value="9">9</option>
                    <option value="10">10</option>
                  </select>
                </div>
                <div class="instruction">${product.instruction}</div>
                <button class="add-to-cart
                js-add-to-cart
                js-add-to-cart-${product.id}"
                data-product-id = "${product.id}">Add to Cart</button>
            </div>
        `;
  });

  document.querySelector(".js-product-list").innerHTML = productSummaryHTML;

  function getStarRating(rating) {
    const fullStars = "★".repeat(Math.floor(rating));
    const emptyStars = "☆".repeat(5 - Math.floor(rating));
    return `${fullStars}${emptyStars} (${rating}/5)`;
  }

  function updateCartQuantity() {
    const cartQuantity = calculateCartQuantity();
    document.querySelector(".js-cart-notification-badge").innerHTML =
      cartQuantity;
  }

  updateCartQuantity();

  document.querySelectorAll(".js-add-to-cart").forEach((button) => {
    button.addEventListener("click", () => {
      const productId = button.dataset.productId;
      addToCart(productId);
      updateCartQuantity();
    });
  });
}

renderHomepage();
