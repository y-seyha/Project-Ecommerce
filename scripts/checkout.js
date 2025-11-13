import { formatCurrency } from "./utils/money.js";
import { products } from "./data/products.js";
import {
  cart,
  removeFromCart,
  calculateCartQuantity,
  updateQuantity,
} from "./data/cart.js";

let cartSummaryHTML = "";
cart.forEach((cartItem) => {
  const productId = cartItem.productId;

  let matchingProduct;
  products.forEach((product) => {
    if (product.id === productId) {
      matchingProduct = product;
    }
  });

  cartSummaryHTML += `
  <div class="order-box
  js-order-box-${matchingProduct.id}">
          <p class="delivery-date">
            Delivery date: <span>Wednesday, November 19</span>
          </p>

          <div class="item-details">
            <img src="${matchingProduct.img}" alt="Perfume" />

            <div class="item-info">
              <h3>${matchingProduct.name}</h3>
              <p class="price">$${formatCurrency(
                matchingProduct.priceCents
              )}</p>
              <div class="product-quantity">
            <span> Quantity: <span class="quantity-label 
            js-quantity-label-${matchingProduct.id}">
            ${cartItem.quantity}</span> </span>

            <span class="update-quantity-link link-primary js-update-link"
            data-product-id = "${matchingProduct.id}">
            Update
            </span>
            <input class = "quantity-input js-quantity-input-${
              matchingProduct.id
            }">
            <span class = "save-quantity-link link-primary js-save-link"
            data-product-id = "${matchingProduct.id}">Save</span>
            <span class="delete-quantity-link link-primary js-delete-link"
            data-product-id= "${matchingProduct.id}" >
            Delete
            </span>
                
              </p>
            </div>
            <!--Delivery Option-->
            <div class="delivery-options">
                <label class="delivery-option">
                <input type="radio" checked
                    class="delivery-option-input"
                    name="delivery-option-${matchingProduct.id}" />
                <span class="checkmark"></span>
                <div>
                    <div class="delivery-option-date">Wednesday, November 19</div>
                    <div class="delivery-option-price free">Free - Shipping</div>
                </div>
            </label>
            
            <label class="delivery-option js-delivery-option">
                <input type="radio"
                    class="delivery-option-input"
                    name="delivery-option-${matchingProduct.id}" />
                <span class="checkmark"></span>
                <div>
                    <div class="delivery-option-date">Thursday, November 13</div>
                    <div class="delivery-option-price">$4.99 - Shipping</div>
                </div>
            </label>
            
            <label class="delivery-option js-delivery-option">
                <input type="radio"
                    class="delivery-option-input"
                    name="delivery-option-${matchingProduct.id}" />
                <span class="checkmark"></span>
                <div>
                    <div class="delivery-option-date">Tuesday, November 11</div>
                    <div class="delivery-option-price">$9.99 - Shipping</div>
                </div>
            </label>
                </div>
             </div>
        </div>  </div>`;
});

document.querySelector(".js-order-summary").innerHTML = cartSummaryHTML;

document.querySelectorAll(".js-delete-link").forEach((link) => {
  link.addEventListener("click", () => {
    const productId = link.dataset.productId;
    removeFromCart(productId);

    const container = document.querySelector(`.js-order-box-${productId}`);
    container.remove();
    updateCartQuantity();
  });
});

function updateCartQuantity() {
  const cartQuantity = calculateCartQuantity();
  document.querySelector(".js-cart-notification-badge").innerHTML =
    cartQuantity;
}

updateCartQuantity();

document.querySelectorAll(".js-update-link").forEach((link) => {
  link.addEventListener("click", () => {
    const productId = link.dataset.productId;

    const container = document.querySelector(`.js-order-box-${productId}`);

    container.classList.add("is-editing-quantity");
  });
});

document.querySelectorAll(".js-save-link").forEach((link) => {
  link.addEventListener("click", () => {
    const productId = link.dataset.productId;

    const quantityInput = document.querySelector(
      `.js-quantity-input-${productId}`
    );

    const newQauntity = Number(quantityInput.value);
    updateQuantity(productId, newQauntity);

    const quantityLabel = document.querySelector(
      `.js-quantity-label-${productId}`
    );
    quantityLabel.innerHTML = newQauntity;

    if (newQauntity < 0 || newQauntity > 100) {
      alert("Quantity must be at least 0 and less than 100");
      return;
    }
    updateCartQuantity;

    const container = document.querySelector(`.js-order-box-${productId}`);
    container.classList.remove("is-editing-quantity");
  });
});
