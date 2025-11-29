import { calculateCartQuantity, updateCartQuantity } from "./data/cart.js";
import { updateOrdersBadge } from "./data/orders.js";
import { deliveryOptions } from "./data/deliveryOptions.js";

// Load orders from localStorage + default
const defaultOrders = [];
const localOrders = JSON.parse(localStorage.getItem("orders")) || [];
const allOrders = [...localOrders, ...defaultOrders];

// Initialize cart in localStorage if not present
if (!localStorage.getItem("cart"))
  localStorage.setItem("cart", JSON.stringify([]));

updateOrdersBadge(allOrders);
updateCartQuantity(calculateCartQuantity);

document.addEventListener("DOMContentLoaded", () => {
  const trackingForm = document.querySelector(".tracking-search form");
  if (!trackingForm) return;

  const orderNumberInput = trackingForm.querySelector('input[name="order"]');
  const defaultView = document.getElementById("defaultView");
  const trackingResults = document.querySelector(".tracking-results");

  if (!orderNumberInput || !defaultView || !trackingResults) return;

  trackingForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const orderNumber = orderNumberInput.value.trim().toLowerCase();

    // Search order in allOrders
    const order = allOrders.find(
      (o) => o.orderNumber.trim().toLowerCase() === orderNumber
    );

    if (!order) {
      if (defaultView) defaultView.style.display = "none";
      trackingResults.innerHTML = `
    <div class="no-results">
      <span class="material-symbols-rounded">error</span>
      <h3>Order Not Found</h3>
      <p>The order number you entered does not exist.</p>
    </div>
  `;
      return;
    }

    if (defaultView) defaultView.style.display = "none";

    // Remove previous dynamic orders
    trackingResults
      .querySelectorAll(".dynamic-order")
      .forEach((el) => el.remove());

    // Build order details
    const customerName = "Yoeun Seyha";
    const orderDate = order.orderDate;
    const status = order.status;
    const total = order.total;
    const trackingNumber =
      order.trackingNumber || "TRK" + Math.floor(Math.random() * 1000000);
    const carrier = order.carrier || "FedEx";
    const orderPlacedLocation = "Phnom Penh";
    const orderConfirmedLocation = order.estimatedDeliveryCity || "Phnom Penh";
    const estimatedDeliveryDay = order.estimatedDeliveryDay || orderDate;

    const orderDiv = document.createElement("div");
    orderDiv.className = "order-result dynamic-order";
    orderDiv.style.marginTop = "20px";

    orderDiv.innerHTML = `
  <div class="order-info">
    <h3>Order #${order.orderNumber}</h3>
    <div class="info-grid">
      <div class="info-item">
        <span class="info-label">Customer</span>
        <span class="info-value">${customerName}</span>
      </div>
      <div class="info-item">
        <span class="info-label">Order Date</span>
        <span class="info-value">${orderDate}</span>
      </div>
      <div class="info-item">
        <span class="info-label">Status</span>
        <span class="info-value" style="color: ${
          status.toLowerCase() === "delivered" ? "#27ae60" : "#9b59b6"
        }">${status}</span>
      </div>
      <div class="info-item">
        <span class="info-label">Total</span>
        <span class="info-value">$${total}</span>
      </div>
      <div class="info-item">
        <span class="info-label">Tracking Number</span>
        <span class="info-value">${trackingNumber}</span>
      </div>
      <div class="info-item">
        <span class="info-label">Carrier</span>
        <span class="info-value">${carrier}</span>
      </div>
    </div>
  </div>

  <div class="tracking-timeline">
    <div class="timeline-line"></div>

    <div class="timeline-item completed">
      <div class="timeline-dot"></div>
      <div class="timeline-content">
        <h4>Order placed</h4>
        <p>${orderPlacedLocation}</p>
        <div class="timeline-date">${orderDate} 10:00 AM</div>
      </div>
    </div>

    <div class="timeline-item completed">
      <div class="timeline-dot"></div>
      <div class="timeline-content">
        <h4>Order confirmed</h4>
        <p>${orderConfirmedLocation}</p>
        <div class="timeline-date">${estimatedDeliveryDay} 12:00 PM</div>
      </div>
    </div>

    <div class="timeline-item ${
      status.toLowerCase() === "processing" ? "active" : "completed"
    }">
      <div class="timeline-dot"></div>
      <div class="timeline-content">
        <h4>Processing order</h4>
        <div class="timeline-date">${orderDate} 03:00 PM</div>
      </div>
    </div>

    <div class="timeline-item ${
      status.toLowerCase() === "shipped" ? "active" : ""
    }">
      <div class="timeline-dot"></div>
      <div class="timeline-content">
        <h4>Shipped via ${carrier}</h4>
        <div class="timeline-date">${estimatedDeliveryDay} 05:00 PM</div>
      </div>
    </div>

    ${
      status.toLowerCase() === "delivered"
        ? `
    <div class="timeline-item active">
      <div class="timeline-dot"></div>
      <div class="timeline-content">
        <h4>Delivered</h4>
        <div class="timeline-date">${estimatedDeliveryDay} 01:00 PM</div>
      </div>
    </div>
    `
        : ""
    }
  </div>

  <div class="tracking-actions">
    <button class="action-btn" onclick="window.print()">
      Print Details
    </button>
    <a class="action-btn" href="mailto:support@fragrancefables.com">Contact Support</a>
  </div>
`;

    trackingResults.appendChild(orderDiv);
  });
});
