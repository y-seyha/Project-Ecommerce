import { products } from "./data/products.js";
import { formatCurrency } from "./utils/money.js";

let productSummaryHTML = "";
console.log(products);
products.forEach((product) => {
  productSummaryHTML += `
            <div class="product-card">
                <img src="./images/${product.img}" alt="${product.name}" />
                <h3 class="name">${product.name}</h3>
                <div class="stars">${getStarRating(product.rating)}</div>
                <div class="price">${formatCurrency(product.priceCents)}</div>
                <div class="keywords">${product.keyword.join(", ")}</div>
                <div class="type">Type: ${product.type}</div>
                <div class="size">Size: ${product.sizeCharLink}</div>
                <a href="${
                  product.warrantyLink
                }" target="_blank">Warranty Info</a>
                <div class="instruction">${product.instruction}</div>
                <button class="add-to-cart">Add to Cart</button>
            </div>
        `;
});

document.querySelector(".js-product-list").innerHTML = productSummaryHTML;

function getStarRating(rating) {
  const fullStars = "★".repeat(Math.floor(rating));
  const emptyStars = "☆".repeat(5 - Math.floor(rating));
  return `${fullStars}${emptyStars} (${rating}/5)`;
}
