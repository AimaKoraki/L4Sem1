document.addEventListener("DOMContentLoaded", loadCart);

function loadCart() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let cartTable = document.getElementById("cartItems");
    let totalPrice = 0;

    cartTable.innerHTML = ""; // Clear previous items

    cart.forEach((item, index) => {
        let row = `<tr>
            <td>${item.name}</td>
            <td>$${item.price}</td>
            <td><button onclick="removeFromCart(${index})">Remove</button></td>
        </tr>`;
        cartTable.innerHTML += row;
        totalPrice += item.price;
    });

    document.getElementById("totalPrice").innerText = totalPrice;
}

function removeFromCart(index) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.splice(index, 1); // Remove item at index
    localStorage.setItem("cart", JSON.stringify(cart));
    loadCart(); // Refresh cart display
    updateCartCount(); // Update the cart counter
}

function clearCart() {
    localStorage.removeItem("cart");
    loadCart();
    updateCartCount();
}

function updateCartCount() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    document.getElementById("cartCount").innerText = cart.length;
}
