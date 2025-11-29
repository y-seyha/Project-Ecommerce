import { calculateCartQuantity, updateCartQuantity } from "./data/cart.js";
import { updateOrdersBadge } from "./data/orders.js";

const defaultOrders = [];
const localOrders = JSON.parse(localStorage.getItem("orders")) || [];
const allOrders = [...localOrders, ...defaultOrders];
// const ordersBadge = document.getElementById("ordersBadge");
updateOrdersBadge(allOrders);
updateCartQuantity(calculateCartQuantity);
