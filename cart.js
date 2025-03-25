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
    let cartCountElem = document.getElementById("cartCount");
    if (cartCountElem) {
        cartCountElem.innerText = cart.length;
    }
}


document.getElementById("saveFavourite").addEventListener("click", function() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    localStorage.setItem("favouriteOrder", JSON.stringify(cart));
    alert("Order saved as favourite!");
});


document.getElementById("applyFavourite").addEventListener("click", function() {
    let favOrder = localStorage.getItem("favouriteOrder");
    if (favOrder) {
        let cart = JSON.parse(favOrder);
        localStorage.setItem("cart", JSON.stringify(cart));
        loadCart(); // Instead of updateCartTable()
    } else {
        alert("No favourite order found.");
    }
});
