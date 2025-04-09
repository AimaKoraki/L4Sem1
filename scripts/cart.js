document.addEventListener("DOMContentLoaded", () => {
    loadCart();
    updateCartCount();
});

document.getElementById("saveFavourite").addEventListener("click", saveFavouriteCart);
document.getElementById("applyFavourite").addEventListener("click", applyFavouriteCart);
const btnClear = document.getElementById("clearCart");
btnClear.addEventListener("click", clearCart);

function loadCart() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let cartTable = document.getElementById("cartItems");
    cartTable.innerHTML = "";

    cart.forEach((item, index) => {
        let row = `
        <tr>
            <td><img src="${item.image}" class="cart__img"></td>
            <td>${item.name}</td>
            <td>${item.price} LKR</td>
            <td>
                <button onclick="decreaseQuantity(${index})" class="quantityBtn">-</button>
                ${item.quantity}
                <button onclick="increaseQuantity(${index})" class="quantityBtn">+</button>
            </td>
            <td><button onclick="removeFromCart(${index})" class="CB__Btutton">Remove</button></td>
        </tr>`;
        cartTable.innerHTML += row;
    });

    calculateCartTotal();
    toggleFavouriteButtons();
}

function increaseQuantity(index) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart[index].quantity += 1;
    localStorage.setItem("cart", JSON.stringify(cart));
    loadCart();
    updateCartCount();
}

function decreaseQuantity(index) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    if (cart[index].quantity > 1) {
        cart[index].quantity -= 1;
    } else {
        cart.splice(index, 1); // Remove if quantity = 1
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    loadCart();
    updateCartCount();
}

function removeFromCart(index) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cart));
    loadCart();
    updateCartCount();
}

function clearCart() {
    localStorage.removeItem("cart");
    loadCart();
    updateCartCount();
}

function calculateCartTotal() {
    let cartItems = JSON.parse(localStorage.getItem("cart")) || [];
    let subtotal = 0;
    cartItems.forEach(item => {
        subtotal += item.price * item.quantity;
    });
    let deliveryFee = 5;
    let total = subtotal + deliveryFee;

    document.getElementById("subtotalAmount").innerText = `$${subtotal.toFixed(2)}`;
    document.getElementById("deliveryFee").innerText = `$${deliveryFee.toFixed(2)}`;
    document.getElementById("totalAmount").innerText = `$${total.toFixed(2)}`;
}

function updateCartCount() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    document.getElementById("cartCount").innerText = cart.reduce((acc, item) => acc + item.quantity, 0);
}
function toggleFavouriteButtons() {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const btnSaveFav = document.getElementById("saveFavourite");
    const btnApplyFav = document.getElementById("applyFavourite");
    const btnProceed = document.getElementById("proceedToPayment"); // Make sure this ID matches your button

    // Disable Save Favourite if cart is empty
    btnSaveFav.disabled = cart.length === 0;

    // Disable Apply Favourite if no saved favourite
    const favOrder = localStorage.getItem("favouriteOrder");
    btnApplyFav.disabled = !favOrder || favOrder.length === 0;

    // Disable Proceed to Payment if cart is empty
    btnProceed.disabled = cart.length === 0;
}

function saveFavouriteCart() {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    if (cart.length === 0) {
        alert("Your cart is empty. Add items before saving.");
        return;
    }
    localStorage.setItem("favouriteOrder", JSON.stringify(cart));
    alert("Favourite order saved!");
    toggleFavouriteButtons();
}

function applyFavouriteCart() {
    const favOrder = JSON.parse(localStorage.getItem("favouriteOrder"));
    if (!favOrder || favOrder.length === 0) {
        alert("No favourite order found.");
        return;
    }
    localStorage.setItem("cart", JSON.stringify(favOrder));
    loadCart();
    updateCartCount();
    alert("Favourite order applied!");
}
