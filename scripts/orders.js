import { formatCurrency } from "./utils/money.js";
import { products, getProduct } from "./data/products.js";
import { deliveryOptions } from "./data/deliveryOptions.js";
import { calculateCartQuantity } from "./data/cart.js";

document.addEventListener("DOMContentLoaded", () => {
  const defaultOrders = [];
  const ordersList = document.getElementById("ordersList");
  const filterButtons = document.querySelectorAll(".filter-btn");

  // Load orders from localStorage + defaults
  const localOrders = JSON.parse(localStorage.getItem("orders")) || [];
  const allOrders = [...localOrders, ...defaultOrders];

  // Initialize cart in localStorage if not present
  if (!localStorage.getItem("cart"))
    localStorage.setItem("cart", JSON.stringify([]));

  // Display all orders initially
  displayOrders();

  // ----- Filter Buttons -----
  filterButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      filterButtons.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      displayOrders(btn.textContent);
    });
  });

  // ----- Functions -----
  function displayOrders(filter = "All Orders") {
    const ordersList = document.getElementById("ordersList");
    if (!ordersList) {
      console.error("Element with id='ordersList' not found!");
      return;
    }
    ordersList.innerHTML = "";

    let filteredOrders =
      filter.toLowerCase() === "all orders"
        ? allOrders
        : allOrders.filter(
            (order) => order.status.toLowerCase() === filter.toLowerCase()
          );

    // Sort newest first
    filteredOrders.sort(
      (a, b) => new Date(b.orderDate) - new Date(a.orderDate)
    );

    if (filteredOrders.length === 0) {
      ordersList.innerHTML = `
      <div class="no-orders">
        <span class="material-symbols-rounded">inventory_2</span>
        <h3>No orders found</h3>
        <p>You don't have any ${
          filter.toLowerCase() === "all orders" ? "" : filter
        } orders yet.</p>
        <a href="index.html" class="shop-btn">
          <span class="material-symbols-rounded">storefront</span>
          Start Shopping
        </a>
      </div>
    `;
      return;
    }

    // Optional: show order count
    const ordersCount = document.createElement("p");
    ordersCount.className = "orders-count";
    ordersCount.textContent = `Showing ${filteredOrders.length} order${
      filteredOrders.length > 1 ? "s" : ""
    }`;
    ordersList.appendChild(ordersCount);

    filteredOrders.forEach((order) => {
      ordersList.appendChild(createOrderCard(order));
    });
  }

  function createOrderCard(order) {
    const orderCart = document.createElement("div");
    orderCart.className = "order-cart";

    // Header
    orderCart.innerHTML = `
    <div class="order-header">
      <div class="order-info">
        <div class="info-item">
          <span class="info-label">Order Number</span>
          <span class="info-value">${order.orderNumber}</span>
        </div>
        <div class="info-item">
          <span class="info-label">Order Date</span>
          <span class="info-value">${order.orderDate}</span>
        </div>
        <div class="info-item">
          <span class="info-label">Total</span>
          <span class="info-value">$${formatCurrency(order.total)}</span>
        </div>
      </div>
      <div class="order-status ${order.status.toLowerCase()}">${
      order.status
    }</div>
    </div>
  `;

    // Items container
    const itemsContainer = document.createElement("div");
    itemsContainer.className = "order-items";

    order.items.forEach((item) => {
      const itemDiv = document.createElement("div");
      itemDiv.className = "order-item";

      const product = products.find((p) => p.name === item.name);
      const productImage = product ? product.img : "placeholder.jpg";

      itemDiv.innerHTML = `
      <div class="item-image">
        <img src="${productImage}" alt='${item.name}'/>
      </div>
      <div class="item-details">
        <div class="item-name">${item.name}</div>
        <div class="item-price">$${formatCurrency(item.price)}</div>
        <div class="item-quantity">Quantity: ${item.quantity}</div>
      </div>
    `;
      itemsContainer.appendChild(itemDiv);
    });

    orderCart.appendChild(itemsContainer);

    // Footer: totals & actions
    const actionsContainer = document.createElement("div");
    actionsContainer.innerHTML = `
    <div class="order-total">
      <span class="total-label">Order Total</span>
      <span class="total-amount">$${formatCurrency(order.total)}</span>
    </div>

    <div class="order-actions">
      <a href="tracking.html" class="action-btn">
        <span class="material-symbols-rounded">package_2</span>
        Track Order
      </a>

      <button class="action-btn btn-view-details">
        <span class="material-symbols-rounded">visibility</span>
        View Details
      </button>

      <button class="action-btn secondary btn-buy-again">
        <span class="material-symbols-rounded">replay</span>
        Buy Again
      </button>
    </div>
  `;
    orderCart.appendChild(actionsContainer);

    // View Details toggle
    actionsContainer
      .querySelector(".btn-view-details")
      .addEventListener("click", () => {
        itemsContainer.classList.toggle("expanded");
      });

    // Buy Again
    actionsContainer
      .querySelector(".btn-buy-again")
      .addEventListener("click", () => {
        const cart = JSON.parse(localStorage.getItem("cart")) || [];

        order.items.forEach((item) => {
          const product =
            getProduct(item.productId) ||
            products.find((p) => p.name === item.name);

          if (!product) return;

          const defaultDelivery = deliveryOptions[0]; // first option
          const deliveryOptionId = item.deliveryOptionId || defaultDelivery.id;

          const existing = cart.find((i) => i.productId === product.id);

          if (existing) {
            existing.quantity += item.quantity;
            existing.deliveryOptionId =
              existing.deliveryOptionId || deliveryOptionId;
          } else {
            cart.push({
              productId: product.id,
              quantity: item.quantity,
              deliveryOptionId: deliveryOptionId,
            });
          }
        });

        localStorage.setItem("cart", JSON.stringify(cart));
        alert("Items added to your cart!");
      });

    return orderCart;
  }

  function updateCartQuantity() {
    const cartQuantity = calculateCartQuantity();
    document.querySelector(".js-cart-notification-badge").innerHTML =
      cartQuantity;
  }
  updateCartQuantity();

  const ordersBadge = document.getElementById("ordersBadge");

  function updateOrdersBadge() {
    if (!ordersBadge) return;

    // Example: count orders that are "Pending" or "Processing"
    const pendingOrders = allOrders.filter((order) =>
      ["pending", "processing"].includes(order.status.toLowerCase())
    );

    ordersBadge.textContent = pendingOrders.length;

    // Optional: hide badge if 0
    ordersBadge.style.display = pendingOrders.length ? "inline-block" : "none";
  }

  // Call initially
  updateOrdersBadge();
  const notificationIcon = document.querySelector(".orders-notification .icon");

  notificationIcon?.addEventListener("click", () => {
    // For simplicity, just alert recent orders
    const recentOrders = allOrders.slice(0, 5);
    const list = recentOrders
      .map((o) => `${o.orderNumber} - ${o.status}`)
      .join("\n");
    alert("Recent Orders:\n" + list);
  });
});
