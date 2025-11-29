import { renderOrderSummary } from "./checkout/orderSummary.js";
import { renderPaymentSummary } from "./checkout/paymentSummary.js";
import { updateOrdersBadge } from "./data/orders.js";

const defaultOrders = [];
const localOrders = JSON.parse(localStorage.getItem("orders")) || [];
const allOrders = [...localOrders, ...defaultOrders];
const ordersBadge = document.getElementById("ordersBadge");
updateOrdersBadge(allOrders);
renderOrderSummary();
renderPaymentSummary();
