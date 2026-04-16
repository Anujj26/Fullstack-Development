let cart = [];
let total = 0;

function addToCart(item, price) {
    cart.push(item);
    total += price;

    document.getElementById("cart-count").innerText = cart.length;
    document.getElementById("total").innerText = total;

    let li = document.createElement("li");
    li.textContent = item + " - ₹" + price;
    document.getElementById("cart-items").appendChild(li);
}

function toggleCart() {
    let cartPanel = document.getElementById("cart");
    cartPanel.style.display =
        cartPanel.style.display === "block" ? "none" : "block";
}

function openCheckout() {
    document.getElementById("checkoutModal").style.display = "flex";
    document.getElementById("checkoutTotal").innerText = total;
}

function closeCheckout() {
    document.getElementById("checkoutModal").style.display = "none";
}

function confirmOrder() {
    alert("🎉 Order Confirmed!");
    cart = [];
    total = 0;
    document.getElementById("cart-items").innerHTML = "";
    document.getElementById("cart-count").innerText = 0;
    document.getElementById("total").innerText = 0;
    closeCheckout();
}

/* AUTO SLIDER */
let images = [
    "images/banner1.jpg",
    "images/banner2.jpg",
    "images/banner3.jpg"
];


let index = 0;
setInterval(() => {
    index = (index + 1) % images.length;
    document.getElementById("slideImage").src = images[index];
}, 3000);
