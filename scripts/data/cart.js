export let cart;

loadFromStorage();

export function loadFromStorage() {
  if (!cart) {
    cart = [
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
  }
}

function saveToStorage() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

export function addToCart(productId) {
  let addedMessageTimeoutid;
  let matchingItem;
  cart.forEach((cartItem) => {
    if (productId === cartItem.productId) {
      matchingItem = cartItem;
    }
  });

  const quantitySelector = document.querySelector(
    `.js-quantity-selector-${productId}`
  );
  const quantity = Number(quantitySelector.value);

  if (matchingItem) {
    matchingItem.quantity += quantity;
  } else {
    cart.push({
      productId: productId,
      quantity: quantity,
      deliveryOptionId: "1",
    });
  }

  const addedMessage = document.querySelector(`.js-add-to-cart-${productId}`);
  addedMessage.classList.add("add-to-cart-visible");

  if (addedMessageTimeoutid) {
    clearTimeout(addedMessageTimeoutid);
  }

  const timeoutId = setTimeout(() => {
    addedMessage.classList.remove("add-to-cart-visible");
  }, 3000);
  addedMessageTimeoutid = timeoutId;
  saveToStorage();
}

export function removeFromCart(productId) {
  const newCart = [];
  cart.forEach((cartItem) => {
    if (cartItem.productId !== productId) {
      newCart.push(cartItem);
    }
  });
  cart = newCart;
  saveToStorage();
}

export function calculateCartQuantity() {
  let cartQuantity = 0;

  cart.forEach((cartItem) => {
    cartQuantity += cartItem.quantity;
  });
  return cartQuantity;
}

export function updateQuantity(productId, newQuantity) {
  let matchingItem;

  cart.forEach((cartItem) => {
    if (productId === cartItem.productId) {
      matchingItem = cartItem;
    }
  });

  matchingItem.quantity = newQuantity;
  saveToStorage();
}

export function updateDeliveryOption(productId, deliveryOptionId) {
  let matchingItem;

  cart.forEach((cartItem) => {
    if (productId === cartItem.productId) {
      matchingItem = cartItem;
    }
  });
  matchingItem.deliveryOptionId = deliveryOptionId;

  saveToStorage();
}
