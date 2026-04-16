const juiceItems = [
  { id: 1, name: "Mango Juice", price: 90, category: "juice fruit", tag: "Summer Best", image: "https://images.unsplash.com/photo-1623065422902-30a2d299bbe4?auto=format&fit=crop&w=900&q=80" },
  { id: 2, name: "Orange Juice", price: 80, category: "juice citrus", tag: "Vitamin C", image: "https://images.unsplash.com/photo-1600271886742-f049cd5bba3f?auto=format&fit=crop&w=900&q=80" },
  { id: 3, name: "Apple Juice", price: 85, category: "juice fruit", tag: "Classic", image: "https://images.unsplash.com/photo-1577234286642-fc512a5f8f11?auto=format&fit=crop&w=900&q=80" },
  { id: 4, name: "Watermelon Juice", price: 75, category: "juice fruit", tag: "Cooling", image: "https://images.unsplash.com/photo-1563114773-84221bd62daa?auto=format&fit=crop&w=900&q=80" },
  { id: 5, name: "Pineapple Juice", price: 95, category: "juice fruit", tag: "Tangy", image: "https://images.unsplash.com/photo-1550258987-190a2d41a8ba?auto=format&fit=crop&w=900&q=80" },
  { id: 6, name: "Banana Shake", price: 110, category: "shake fruit", tag: "Creamy", image: "https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=900&q=80" },
  { id: 7, name: "Mixed Fruit", price: 120, category: "juice fruit", tag: "Power Pack", image: "https://images.unsplash.com/photo-1502741338009-cac2772e18bc?auto=format&fit=crop&w=900&q=80" },
  { id: 8, name: "Mosambi Juice", price: 85, category: "juice citrus", tag: "Fresh Citrus", image: "https://images.unsplash.com/photo-1622597467836-f3285f2131b8?auto=format&fit=crop&w=900&q=80" }
];

const menuGrid = document.getElementById("menuGrid");
const cartItemsContainer = document.getElementById("cartItems");
const emptyCartState = document.getElementById("emptyCart");
const cartCount = document.getElementById("cartCount");
const summaryItems = document.getElementById("summaryItems");
const summaryTotal = document.getElementById("summaryTotal");
const searchInput = document.getElementById("searchInput");
const filterButtons = document.querySelectorAll(".filter-chip");
const clearCartBtn = document.getElementById("clearCartBtn");
const toastElement = document.getElementById("cartToast");
const toastMessage = document.getElementById("toastMessage");
const cartToast = new bootstrap.Toast(toastElement, { delay: 1800 });

let activeFilter = "all";
let cart = JSON.parse(localStorage.getItem("shivamJuiceCart")) || [];

function formatCurrency(value) {
  return "Rs " + value.toFixed(0);
}

function saveCart() {
  localStorage.setItem("shivamJuiceCart", JSON.stringify(cart));
}

function showToast(message) {
  toastMessage.textContent = message;
  cartToast.show();
}

function renderMenu(items) {
  menuGrid.innerHTML = "";

  if (!items.length) {
    menuGrid.innerHTML = '<div class="col-12"><div class="empty-state"><i class="bi bi-search display-6 d-block mb-3"></i>No drinks matched your search. Try another keyword or filter.</div></div>';
    return;
  }

  items.forEach((item, index) => {
    const col = document.createElement("div");
    col.className = "col-sm-6 col-lg-4 col-xl-3";
    col.innerHTML = `
      <div class="menu-card fade-in" style="animation-delay:${index * 0.08}s;">
        <img src="${item.image}" alt="${item.name}">
        <div class="d-flex justify-content-between align-items-start mb-2 gap-2">
          <div>
            <span class="badge rounded-pill px-3 py-2 mb-2">${item.tag}</span>
            <h3 class="h5 fw-bold mb-1">${item.name}</h3>
          </div>
        </div>
        <p class="text-muted mb-3">Freshly prepared with premium fruit and served chilled.</p>
        <div class="d-flex justify-content-between align-items-center gap-3">
          <span class="price">${formatCurrency(item.price)}</span>
          <button class="btn btn-juice add-to-cart-btn" data-id="${item.id}">Add to Cart</button>
        </div>
      </div>
    `;
    menuGrid.appendChild(col);
  });
}

function getFilteredItems() {
  const term = searchInput.value.trim().toLowerCase();
  return juiceItems.filter((item) => {
    const matchesFilter = activeFilter === "all" || item.category.includes(activeFilter);
    const matchesSearch = item.name.toLowerCase().includes(term) || item.tag.toLowerCase().includes(term);
    return matchesFilter && matchesSearch;
  });
}

function updateSummary() {
  const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  cartCount.textContent = itemCount;
  summaryItems.textContent = itemCount;
  summaryTotal.textContent = formatCurrency(total);
}

function renderCart() {
  cartItemsContainer.innerHTML = "";

  if (!cart.length) {
    emptyCartState.style.display = "block";
    updateSummary();
    saveCart();
    return;
  }

  emptyCartState.style.display = "none";

  cart.forEach((item) => {
    const cartRow = document.createElement("div");
    cartRow.className = "cart-item";
    cartRow.innerHTML = `
      <img src="${item.image}" alt="${item.name}">
      <div>
        <div class="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-2 mb-2">
          <div>
            <h3 class="h5 fw-bold mb-1">${item.name}</h3>
            <p class="text-muted mb-0">${formatCurrency(item.price)} each</p>
          </div>
          <strong class="text-success fs-5">${formatCurrency(item.price * item.quantity)}</strong>
        </div>
        <div class="d-flex flex-wrap align-items-center gap-3 justify-content-center justify-content-md-start">
          <div class="quantity-box">
            <button class="quantity-btn" data-action="decrease" data-id="${item.id}">-</button>
            <span class="fw-bold">${item.quantity}</span>
            <button class="quantity-btn" data-action="increase" data-id="${item.id}">+</button>
          </div>
          <button class="btn btn-sm btn-outline-danger rounded-pill px-3" data-action="remove" data-id="${item.id}">Remove</button>
        </div>
      </div>
      <div class="text-end">
        <span class="badge text-bg-light px-3 py-2">Freshly made</span>
      </div>
    `;
    cartItemsContainer.appendChild(cartRow);
  });

  updateSummary();
  saveCart();
}

function addToCart(itemId) {
  const selectedItem = juiceItems.find((item) => item.id === Number(itemId));
  const existingItem = cart.find((item) => item.id === selectedItem.id);

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({ ...selectedItem, quantity: 1 });
  }

  renderCart();
  showToast(selectedItem.name + " added to cart");
}

function updateCartItem(itemId, action) {
  const itemIndex = cart.findIndex((item) => item.id === Number(itemId));
  if (itemIndex === -1) {
    return;
  }

  if (action === "increase") {
    cart[itemIndex].quantity += 1;
  } else if (action === "decrease") {
    cart[itemIndex].quantity -= 1;
    if (cart[itemIndex].quantity <= 0) {
      cart.splice(itemIndex, 1);
    }
  } else if (action === "remove") {
    cart.splice(itemIndex, 1);
  }

  renderCart();
}

function refreshMenu() {
  renderMenu(getFilteredItems());
}

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    filterButtons.forEach((btn) => btn.classList.remove("active"));
    button.classList.add("active");
    activeFilter = button.dataset.filter;
    refreshMenu();
  });
});

searchInput.addEventListener("input", refreshMenu);

menuGrid.addEventListener("click", (event) => {
  const addButton = event.target.closest(".add-to-cart-btn");
  if (addButton) {
    addToCart(addButton.dataset.id);
  }
});

cartItemsContainer.addEventListener("click", (event) => {
  const actionButton = event.target.closest("[data-action]");
  if (actionButton) {
    updateCartItem(actionButton.dataset.id, actionButton.dataset.action);
  }
});

clearCartBtn.addEventListener("click", () => {
  cart = [];
  renderCart();
  showToast("Cart cleared");
});

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function(event) {
    const targetId = this.getAttribute("href");
    if (targetId.length <= 1) {
      return;
    }

    const targetElement = document.querySelector(targetId);
    if (!targetElement) {
      return;
    }

    event.preventDefault();
    targetElement.scrollIntoView({ behavior: "smooth", block: "start" });
  });
});

renderMenu(juiceItems);
refreshMenu();
renderCart();
