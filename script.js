
const products = [
    {
        id: 1,
        name: "Claw Hammer",
        category: "Tools & Hardware",
        price: 14.99,
        icon: "🔨",
        description: "A dependable hammer for everyday projects."
    },
    {
        id: 2,
        name: "Cordless Drill",
        category: "Tools & Hardware",
        price: 59.99,
        icon: "🛠️",
        description: "A versatile drill for home repairs."
    },
    {
        id: 3,
        name: "Lumber Boards",
        category: "Lumber & Building",
        price: 8.49,
        icon: "🪵",
        description: "Boards for building and DIY projects."
    },
    {
        id: 4,
        name: "Interior Paint",
        category: "Paint & Supplies",
        price: 29.99,
        icon: "🎨",
        description: "Refresh a room with a new coat of paint."
    },
    {
        id: 5,
        name: "Garden Shovel",
        category: "Outdoor & Garden",
        price: 19.99,
        icon: "🌱",
        description: "A handy tool for outdoor projects."
    },
    {
        id: 6,
        name: "Work Gloves",
        category: "Tools & Hardware",
        price: 9.99,
        icon: "🧤",
        description: "Gloves for general home and garden work."
    }
];

let cart = [];

const productGrid = document.getElementById("product-grid");
const cartItems = document.getElementById("cart-items");
const cartTotal = document.getElementById("cart-total");
const checkoutButton = document.getElementById("checkout-button");

// Format prices consistently.
function formatPrice(price) {
    return "$" + price.toFixed(2);
}

// Display featured products.
function displayProducts() {
    if (!productGrid) return;

    productGrid.innerHTML = products.map(product => `
        <article class="product-card">
            <div class="product-image" aria-hidden="true">
                ${product.icon}
            </div>
            <div class="product-info">
                <p class="product-category">${product.category}</p>
                <h3>${product.name}</h3>
                <p class="product-description">
                    ${product.description}
                </p>
                <p class="product-price">${formatPrice(product.price)}</p>
                <button
                    class="add-to-cart"
                    data-product-id="${product.id}"
                    type="button"
                >
                    Add to Cart
                </button>
            </div>
        </article>
    `).join("");
}

// Add a product to the cart.
function addToCart(productId) {
    const product = products.find(item => item.id === productId);
    if (!product) return;

    const existingItem = cart.find(item => item.id === productId);

    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({ ...product, quantity: 1 });
    }

    displayCart();
}

// Remove one product entry from the cart.
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    displayCart();
}

// Display cart contents and total.
function displayCart() {
    if (!cartItems || !cartTotal) return;

    if (cart.length === 0) {
        cartItems.innerHTML = "<p>Your cart is empty.</p>";
    } else {
        cartItems.innerHTML = cart.map(item => `
            <div class="cart-item">
                <div>
                    <strong>${item.name}</strong>
                    <p>
                        ${item.quantity} × ${formatPrice(item.price)}
                    </p>
                </div>
                <button
                    type="button"
                    class="remove-from-cart"
                    data-remove-id="${item.id}"
                    aria-label="Remove ${item.name} from cart"
                >
                    Remove
                </button>
            </div>
        `).join("");
    }

    const total = cart.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    );

    cartTotal.textContent = formatPrice(total);

    if (checkoutButton) {
        checkoutButton.disabled = true;
    }
}

// Handle product and cart buttons.
document.addEventListener("click", event => {
    const addButton = event.target.closest("[data-product-id]");
    const removeButton = event.target.closest("[data-remove-id]");

    if (addButton) {
        addToCart(Number(addButton.dataset.productId));
    }

    if (removeButton) {
        removeFromCart(Number(removeButton.dataset.removeId));
    }
});

// Mobile navigation menu.
const menuToggle = document.getElementById("menu-toggle");
const mainNavigation = document.querySelector(".main-navigation");

if (menuToggle && mainNavigation) {
    menuToggle.addEventListener("click", () => {
        const isOpen = mainNavigation.classList.toggle("open");

        menuToggle.setAttribute("aria-expanded", String(isOpen));
    });

    mainNavigation.addEventListener("click", event => {
        if (event.target.closest("a")) {
            mainNavigation.classList.remove("open");
            menuToggle.setAttribute("aria-expanded", "false");
        }
    });
}

// Start the store.
displayProducts();
displayCart();
