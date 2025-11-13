import { cart } from "../data/cart.js";
import { getProduct } from "../data/products.js";
import { getDeliveryOption } from "../data/deliveryOptions.js";
import { formatCurrency } from "../utils/money.js";

export function renderPaymentSummary() {
  let productPriceCents = 0;
  let shippingPriceCents = 0;
  cart.forEach((cartItem) => {
    const product = getProduct(cartItem.productId);
    productPriceCents += product.priceCents * cartItem.quantity;

    const deliveryOption = getDeliveryOption(cartItem.deliveryOptionId);
    shippingPriceCents += deliveryOption.priceCents;
  });

  const totalBeforeTaxCents = productPriceCents + shippingPriceCents;
  const taxCents = totalBeforeTaxCents * 0.1;
  const totalCents = totalBeforeTaxCents + taxCents;

  const html = `
        <h2>Order Summary</h2>
        <div class="summary-line">
          <span>Items (3):</span><span>$${formatCurrency(
            productPriceCents
          )}</span>
        </div>
        <div class="summary-line">
          <span>Shipping & handling:</span><span>$${formatCurrency(
            shippingPriceCents
          )}</span>
        </div>
        <div class="summary-line">
          <span>Total before tax:</span><span>$${formatCurrency(
            totalBeforeTaxCents
          )}</span>
        </div>
        <div class="summary-line">
          <span>Estimated tax (10%):</span><span>$${formatCurrency(
            taxCents
          )}</span>
        </div>
        <div class="summary-total">
          <span>Order total:</span><span>$${formatCurrency(totalCents)}</span>
        </div>
        <button class="place-order">Place your order</button>
  `;

  document.querySelector(".js-right").innerHTML = html;
}
