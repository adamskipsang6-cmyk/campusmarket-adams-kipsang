const products = [
{
id: 1,
name: "Mechanical Coding Keyboard",
category: "Work essentials",
price: 4500,
image: "https://tse4.mm.bing.net/th/id/OIP.qtVjMTlQcGWHZJl82i-aCgHaHa?r=0&rs=1&pid=ImgDetMain&o=7&rm=3",
alt: "Black mechanical keyboard with blue-lit keys",
description: "Tactile switches designed for comfortable and fast typing."
},
{
id: 2,
name: "Ergonomic Wireless Mouse",
category: "Study gear",
price: 2800,
image: "https://images.unsplash.com/photo-1527814050087-3793815479db?auto=format&fit=crop&w=700&q=80",
alt: "Black ergonomic wireless computer mouse",
description: "Comfortable wireless control for long study sessions."
},
{
id: 3,
name: "Laptop Backpack",
category: "Campus essentials",
price: 3500,
image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=700&q=80",
alt: "Black laptop backpack suitable for carrying a computer",
description: "Durable backpack with space for a laptop and study materials."
},
{
id: 4,
name: "USB-C Desk Lamp",
category: "Study gear",
price: 2200,
image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=700&q=80",
alt: "Modern desk lamp providing focused workspace lighting",
description: "Compact lighting for reading, coding and late-night study."
},
{
id: 5,
name: "Portable SSD",
category: "Work essentials",
price: 8500,
image: "https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?auto=format&fit=crop&w=700&q=80",
alt: "Compact portable solid state drive for storing digital files",
description: "Fast external storage for assignments, projects and backups."
}
];

let filteredProducts = [...products];
let galleryIndex = 0;
let cartCount = 0;

const productGrid = document.querySelector("#product-grid");
const productSearch = document.querySelector("#product-search");
const categoryFilter = document.querySelector("#category-filter");
const productCount = document.querySelector("#product-count");
const noResults = document.querySelector("#no-results");

const galleryImage = document.querySelector("#gallery-image");
const galleryCaption = document.querySelector("#gallery-caption");
const galleryPosition = document.querySelector("#gallery-position");
const galleryDots = document.querySelector("#gallery-dots");
const galleryPrevious = document.querySelector("#gallery-prev");
const galleryNext = document.querySelector("#gallery-next");

const checkoutForm = document.querySelector("#checkout-form");
const customerName = document.querySelector("#customer-name");
const customerEmail = document.querySelector("#customer-email");
const checkoutProduct = document.querySelector("#checkout-product");
const quantityInput = document.querySelector("#quantity");
const selectedPrice = document.querySelector("#selected-price");
const runningTotal = document.querySelector("#running-total");
const formStatus = document.querySelector("#form-status");

const menuToggle = document.querySelector("#menu-toggle");
const mainNavigation = document.querySelector("#main-navigation");

function formatCurrency(amount) {
return `KSh ${amount.toLocaleString("en-KE")}`;
}

function createProductCard(product) {
const article = document.createElement("article");
article.className = "product-card";

```
const imageContainer = document.createElement("div");
imageContainer.className = "product-image";

const image = document.createElement("img");
image.src = product.image;
image.alt = product.alt;
image.loading = "lazy";

const details = document.createElement("div");
details.className = "product-details";

const category = document.createElement("span");
category.className = "category";
category.textContent = product.category;

const title = document.createElement("h3");
title.className = "product-title";
title.textContent = product.name;

const description = document.createElement("p");
description.className = "product-desc";
description.textContent = product.description;

const purchaseRow = document.createElement("div");
purchaseRow.className = "purchase-row";

const price = document.createElement("p");
price.className = "price";
price.textContent = formatCurrency(product.price);

const button = document.createElement("button");
button.className = "btn";
button.type = "button";
button.textContent = "Add to Cart";
button.dataset.productId = product.id;

const cartMessage = document.createElement("p");
cartMessage.className = "cart-status";
cartMessage.setAttribute("aria-live", "polite");

button.addEventListener("click", () => {
    cartCount += 1;
    cartMessage.textContent = `Added to cart. Cart items: ${cartCount}.`;
    cartMessage.classList.add("success-animation");

    button.textContent = "Added ✓";

    setTimeout(() => {
        button.textContent = "Add to Cart";
        cartMessage.classList.remove("success-animation");
    }, 1200);
});

imageContainer.appendChild(image);

purchaseRow.appendChild(price);
purchaseRow.appendChild(button);

details.appendChild(category);
details.appendChild(title);
details.appendChild(description);
details.appendChild(purchaseRow);
details.appendChild(cartMessage);

article.appendChild(imageContainer);
article.appendChild(details);

return article;
```

}

function renderProducts() {
productGrid.replaceChildren();

```
productCount.textContent =
    `${filteredProducts.length} product${filteredProducts.length === 1 ? "" : "s"}`;

if (filteredProducts.length === 0) {
    noResults.hidden = false;
    renderGallery();
    return;
}

noResults.hidden = true;

filteredProducts.forEach((product) => {
    productGrid.appendChild(createProductCard(product));
});

renderGallery();
```

}

function populateCategories() {
const categories = [];

```
products.forEach((product) => {
    if (!categories.includes(product.category)) {
        categories.push(product.category);
    }
});

categories.sort();

categories.forEach((category) => {
    const option = document.createElement("option");
    option.value = category.toLowerCase();
    option.textContent = category;
    categoryFilter.appendChild(option);
});
```

}

function populateCheckoutProducts() {
products.forEach((product) => {
const option = document.createElement("option");
option.value = product.id;
option.textContent = `${product.name} - ${formatCurrency(product.price)}`;
checkoutProduct.appendChild(option);
});
}

function renderGallery() {
galleryDots.replaceChildren();

```
if (filteredProducts.length === 0) {
    galleryImage.removeAttribute("src");
    galleryImage.alt = "No product selected";
    galleryCaption.textContent = "No products are available for this filter.";
    galleryPosition.textContent = "0 of 0";
    galleryPrevious.disabled = true;
    galleryNext.disabled = true;
    return;
}

galleryPrevious.disabled = false;
galleryNext.disabled = false;

if (galleryIndex >= filteredProducts.length) {
    galleryIndex = 0;
}

const currentProduct = filteredProducts[galleryIndex];

galleryImage.src = currentProduct.image;
galleryImage.alt = currentProduct.alt;
galleryCaption.textContent =
    `${currentProduct.name} — ${currentProduct.description}`;
galleryPosition.textContent =
    `${galleryIndex + 1} of ${filteredProducts.length}`;

filteredProducts.forEach((product, index) => {
    const dot = document.createElement("button");
    dot.type = "button";
    dot.className = "gallery-dot";
    dot.setAttribute("aria-label", `Show ${product.name}`);
    dot.setAttribute("aria-current", index === galleryIndex ? "true" : "false");

    dot.addEventListener("click", () => {
        galleryIndex = index;
        renderGallery();
    });

    galleryDots.appendChild(dot);
});
```

}

function moveGallery(direction) {
if (filteredProducts.length === 0) {
return;
}

```
galleryIndex += direction;

if (galleryIndex < 0) {
    galleryIndex = filteredProducts.length - 1;
} else if (galleryIndex >= filteredProducts.length) {
    galleryIndex = 0;
}

renderGallery();
```

}

function filterProducts() {
const searchTerm = productSearch.value.trim().toLowerCase();
const selectedCategory = categoryFilter.value;

```
filteredProducts = products.filter((product) => {
    const matchesSearch =
        product.name.toLowerCase().includes(searchTerm) ||
        product.description.toLowerCase().includes(searchTerm);

    const matchesCategory =
        selectedCategory === "all" ||
        product.category.toLowerCase() === selectedCategory;

    return matchesSearch && matchesCategory;
});

galleryIndex = 0;
renderProducts();
```

}

function getSelectedProduct() {
const productId = Number(checkoutProduct.value);
return products.find((product) => product.id === productId);
}

function updateRunningTotal() {
const product = getSelectedProduct();
const quantity = Number(quantityInput.value);

```
if (!product || !Number.isInteger(quantity) || quantity < 1 || quantity > 20) {
    selectedPrice.textContent = "KSh 0";
    runningTotal.textContent = "KSh 0";
    return;
}

selectedPrice.textContent = formatCurrency(product.price);
runningTotal.textContent = formatCurrency(product.price * quantity);
```

}

function showError(input, errorElement, message) {
input.setAttribute("aria-invalid", "true");
errorElement.textContent = message;
errorElement.classList.add("is-visible");
}

function clearError(input, errorElement) {
input.removeAttribute("aria-invalid");
errorElement.textContent = "";
errorElement.classList.remove("is-visible");
}

function validateCheckoutForm() {
let isValid = true;

```
const nameError = document.querySelector("#customer-name-error");
const emailError = document.querySelector("#customer-email-error");
const productError = document.querySelector("#checkout-product-error");
const quantityError = document.querySelector("#quantity-error");

clearError(customerName, nameError);
clearError(customerEmail, emailError);
clearError(checkoutProduct, productError);
clearError(quantityInput, quantityError);

if (customerName.value.trim() === "") {
    showError(
        customerName,
        nameError,
        "Full name is required."
    );
    isValid = false;
} else if (customerName.value.trim().length < 3) {
    showError(
        customerName,
        nameError,
        "Full name must contain at least 3 characters."
    );
    isValid = false;
}

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

if (customerEmail.value.trim() === "") {
    showError(
        customerEmail,
        emailError,
        "Email address is required."
    );
    isValid = false;
} else if (!emailPattern.test(customerEmail.value.trim())) {
    showError(
        customerEmail,
        emailError,
        "Email must contain an @ symbol and a valid domain."
    );
    isValid = false;
}

if (checkoutProduct.value === "") {
    showError(
        checkoutProduct,
        productError,
        "Please select a product."
    );
    isValid = false;
}

const quantity = Number(quantityInput.value);

if (quantityInput.value.trim() === "") {
    showError(
        quantityInput,
        quantityError,
        "Quantity is required."
    );
    isValid = false;
} else if (!Number.isInteger(quantity)) {
    showError(
        quantityInput,
        quantityError,
        "Quantity must be a whole number."
    );
    isValid = false;
} else if (quantity <= 0) {
    showError(
        quantityInput,
        quantityError,
        "Quantity must be greater than zero."
    );
    isValid = false;
} else if (quantity > 20) {
    showError(
        quantityInput,
        quantityError,
        "Quantity cannot be more than 20."
    );
    isValid = false;
}

return isValid;
```

}

checkoutForm.addEventListener("submit", (event) => {
event.preventDefault();

```
formStatus.classList.remove("success-animation");
formStatus.textContent = "";

const isValid = validateCheckoutForm();

if (!isValid) {
    formStatus.textContent =
        "Please correct the highlighted fields before placing your order.";
    formStatus.classList.add("form-error");
    return;
}

const product = getSelectedProduct();
const quantity = Number(quantityInput.value);
const total = product.price * quantity;

formStatus.classList.remove("form-error");
formStatus.textContent =
    `Order submitted successfully! ${quantity} × ${product.name} = ${formatCurrency(total)}.`;
formStatus.classList.add("success-animation");
```

});

productSearch.addEventListener("input", filterProducts);
categoryFilter.addEventListener("change", filterProducts);

galleryPrevious.addEventListener("click", () => {
moveGallery(-1);
});

galleryNext.addEventListener("click", () => {
moveGallery(1);
});

checkoutProduct.addEventListener("change", updateRunningTotal);
quantityInput.addEventListener("input", updateRunningTotal);

if (menuToggle && mainNavigation) {
menuToggle.addEventListener("click", () => {
const isOpen = menuToggle.getAttribute("aria-expanded") === "true";

```
    menuToggle.setAttribute("aria-expanded", String(!isOpen));
    mainNavigation.classList.toggle("is-open");
});
```

}

populateCategories();
populateCheckoutProducts();
renderProducts();
updateRunningTotal();
