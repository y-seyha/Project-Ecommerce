import { formatCurrency } from "../utils/money.js";
import { getProduct } from "../data/products.js";
import {
  cart,
  removeFromCart,
  calculateCartQuantity,
  updateQuantity,
  updateDeliveryOption,
} from "../data/cart.js";
import {
  deliveryOptions,
  getDeliveryOption,
  estimateDeliveryDate,
} from "../data/deliveryOptions.js";
import { renderPaymentSummary } from "./paymentSummary.js";

export function renderOrderSummary() {
  let cartSummaryHTML = "";
  cart.forEach((cartItem) => {
    const productId = cartItem.productId;

    const matchingProduct = getProduct(productId);

    const deliveryOptionId = cartItem.deliveryOptionId;

    const deliveryOption = getDeliveryOption(deliveryOptionId);

    const dateString = estimateDeliveryDate(deliveryOption);

    cartSummaryHTML += `
  <div class="order-box
  js-order-box-${matchingProduct.id}">
          <p class="delivery-date">
            Delivery date: <span>${dateString}</span>
          </p>

          <div class="item-details">
            <img src="${matchingProduct.img}" alt="Perfume" />

            <div class="item-info">
              <h3>${matchingProduct.name}</h3>
              <p class="price">$${matchingProduct.getPrice()}</p>
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
            ${deliveryOptionHTML(matchingProduct, cartItem)}
             </div>
        </div>  </div>`;
  });

  function deliveryOptionHTML(matchingProduct, cartItem) {
    let html = "";
    deliveryOptions.forEach((deliveryOption) => {
      const dateString = estimateDeliveryDate(deliveryOption);

      const priceString =
        deliveryOption.priceCents === 0
          ? "Free"
          : `$${formatCurrency(deliveryOption.priceCents)}`;
      const isChecked = deliveryOption.id === cartItem.deliveryOptionId;
      html += `      <div class="delivery-options js-delivery-option"
                    data-product-id = "${matchingProduct.id}"
                    data-delivery-id = "${deliveryOption.id}">
                      <label class="delivery-option">
                        <input 
                        type="radio" ${isChecked ? "checked" : ""}
                          class="delivery-option-input"
                          name="delivery-option-${matchingProduct.id}" /> 
                          
                     <span class="checkmark"></span>
                       <div>
                         <div class="delivery-option-date">${dateString}</div>
                        <div class="delivery-option-price free">${priceString}</div>
                        </div>
                     </label>
                    </div>
    `;
    });
    return html;
  }

  document.querySelector(".js-order-summary").innerHTML = cartSummaryHTML;

  document.querySelectorAll(".js-delete-link").forEach((link) => {
    link.addEventListener("click", () => {
      const productId = link.dataset.productId;
      removeFromCart(productId);

      const container = document.querySelector(`.js-order-box-${productId}`);
      container.remove();
      renderOrderSummary();
      renderPaymentSummary();
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

      if (newQauntity < 0 || newQauntity > 100) {
        alert("Quantity must be at least 0 and less than 100");
        return;
      }
      quantityLabel.innerHTML = newQauntity;
      updateCartQuantity();

      const container = document.querySelector(`.js-order-box-${productId}`);
      container.classList.remove("is-editing-quantity");
      updateQuantity(productId, newQauntity);
      renderPaymentSummary();
    });
  });

  document.querySelectorAll(".js-delivery-option").forEach((element) => {
    element.addEventListener("click", () => {
      const { productId, deliveryId } = element.dataset;
      updateDeliveryOption(productId, deliveryId);
      renderPaymentSummary();
    });
  });
}
