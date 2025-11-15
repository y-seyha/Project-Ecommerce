export let cart = loadFromStorage();

export function loadFromStorage() {
  const stored = localStorage.getItem("cart");

  if (stored) return JSON.parse(stored);

  const defualtCart = [
    {
      productId: "0d1e2f3a-4b5c-6d7e-8f9a-0b1c2d3e4f5g",
      quantity: 2,
      deliveryOptionId: "1",
    },
    {
      productId: "3c4d5e6f-7a8b-9c0d-1e2f-3a4b5c6d7e8f",
      quantity: 4,
      deliveryOptionId: "2",
    },
  ];

  localStorage.setItem("cart", JSON.stringify(defualtCart));

  return defualtCart;
}

function save() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

function findItem(productId) {
  return cart.find((item) => item.productId === productId);
}

export function addToCart(productId) {
  const quantitySelector = document.querySelector(
    `.js-quantity-selector-${productId}`
  );
  const quantity = Number(quantitySelector.value);

  const item = findItem(productId);

  if (item) {
    item.quantity += quantity;
  } else {
    cart.push({
      productId,
      quantity,
      deliveryOptionId: "1",
    });
  }

  showAddMessage(productId);
  save();
}

function showAddMessage(productId) {
  const message = document.querySelector(`.js-add-to-cart-${productId}`);
  if (!message) return;
  message.classList.add("add-to-cart-visible");

  setTimeout(() => {
    message.classList.remove("add-to-cart-visible");
  }, 3000);
}

export function removeFromCart(productId) {
  cart = cart.filter((item) => item.productId !== productId);
  save();
}

export function calculateCartQuantity() {
  return cart.reduce((sum, item) => sum + item.quantity, 0);
}

export function updateQuantity(productId, newQuantity) {
  const item = findItem(productId);
  if (!item) return;

  item.quantity = newQuantity;
  save();
}

export function updateDeliveryOption(productId, deliveryOptionId) {
  const item = findItem(productId);
  if (!item) return;

  item.deliveryOptionId = deliveryOptionId;
  save();
}
