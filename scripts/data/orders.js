import { cart, clearCart } from "./cart.js";
import { getProduct } from "./products.js";
import { getDeliveryOption, estimateDeliveryDate } from "./deliveryOptions.js";
import dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js";

export let orders = JSON.parse(localStorage.getItem("orders")) || [];

function generateOrderNumber() {
  const randomNumber = Math.floor(100000 + Math.random() * 900000);
  return `FF-${randomNumber}`;
}

export function calculateCartTotalCents(cart) {
  let productPrice = 0;
  let shippingPrice = 0;

  cart.forEach((item) => {
    const product = getProduct(item.productId);
    const delivery = getDeliveryOption(item.deliveryOptionId);
    productPrice += product.priceCents * item.quantity;
    shippingPrice += delivery.priceCents;
  });

  const subtotal = productPrice + shippingPrice;
  const tax = subtotal * 0.1; // 10%
  return subtotal + tax;
}

export function placeOrder() {
  if (cart.length === 0) {
    alert("Your cart is empty.");
    return;
  }

  // Build items array for the order
  const items = cart.map((cartItem) => {
    const product = getProduct(cartItem.productId);
    const deliveryOption = getDeliveryOption(cartItem.deliveryOptionId);

    return {
      id: product.id,
      name: product.name,
      img: product.img,
      price: product.priceCents, // numeric value for calculations
      quantity: cartItem.quantity,
      deliveryDate: estimateDeliveryDate(deliveryOption),
    };
  });

  const orderTotalCents = calculateCartTotalCents(cart);

  const newOrder = {
    orderNumber: generateOrderNumber(),
    orderDate: dayjs().format("dddd, MMMM D"),
    items,
    total: orderTotalCents,
    status: "Processing",
  };

  orders.push(newOrder);
  localStorage.setItem("orders", JSON.stringify(orders));

  clearCart();

  window.location.href = "orders.html";
}
