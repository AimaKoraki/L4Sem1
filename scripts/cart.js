//loadinhg the cart
document.addEventListener("DOMContentLoaded", loadCart);

// Adding event listener to the clear cart button
const btnClear = document.getElementById("clearCart");
btnClear.addEventListener("click", clearCart);


// loading the cart items
function loadCart() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let cartTable = document.getElementById("cartItems");
    let totalPrice = 0;

    cartTable.innerHTML = ""; // Clear previous items

    cart.forEach((item, index) => {
        let row = `<tr>
            <td><img src="${item.image}" class="cart__img"></td>
            <td>${item.name}</td>
            <td>${item.price} LKR</td>
            <td><button onclick="removeFromCart(${index})" class="CB__Btutton">Remove</button></td>
        </tr>`;
        cartTable.innerHTML += row;
        totalPrice += item.price;
    });

    document.getElementById("totalPrice").innerText = totalPrice;
}


// Displaying the cart count on page load
function removeFromCart(index) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.splice(index, 1); // Remove item at index
    localStorage.setItem("cart", JSON.stringify(cart));
    loadCart(); // Refresh cart display
    updateCartCount(); // Update the cart counter
}


// Function to clear the cart
// and update the cart count
function clearCart() {
    localStorage.removeItem("cart");
    loadCart();
    updateCartCount();
}


// Function to update the cart count in the header        
function updateCartCount() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let cartCountElem = document.getElementById("cartCount");
    if (cartCountElem) {
        cartCountElem.innerText = cart.length;
    }
}


// Function to save the current order as a favourite
document.getElementById("saveFavourite").addEventListener("click", function() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    localStorage.setItem("favouriteOrder", JSON.stringify(cart));
    alert("Order saved as favourite!");
});



// Function to load the favourite order into the cart
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
