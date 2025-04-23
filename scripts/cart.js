//----------------This script handles the cart functionality, including adding, removing, and updating items in the cart.----------------------------------

document.addEventListener("DOMContentLoaded", () => {
    loadCart();
    updateCartCount();
});


// --------------------------------------------------- Event listeners for buttons --------------------------------------------------
document.getElementById("saveFavourite").addEventListener("click", saveFavouriteCart);
document.getElementById("applyFavourite").addEventListener("click", applyFavouriteCart);
const btnClear = document.getElementById("clearCart");
btnClear.addEventListener("click", clearCart);


//----------------------------------------Function to load the cart from local storage and display it in the table ----------------------------------------------
function loadCart() {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const cartTable = document.getElementById("cartItems");
    cartTable.innerHTML = "";

    cart.forEach((item, index) => {
        const row = `
        <tr>
            <td><img src="${item.image}" class="cart__img"></td>
            <td>${item.name}</td>
            <td>${item.price} LKR</td>
            <td>
                <button class="quantityBtn" data-action="decrease" data-index="${index}">-</button>
                <span class="item-qty" data-index="${index}">${item.quantity}</span>
                <button class="quantityBtn" data-action="increase" data-index="${index}">+</button>
            </td>

            <td><button class="CB__Btutton" data-action="remove" data-index="${index}">Remove</button></td>
        </tr>`;
        cartTable.innerHTML += row;
    });

    calculateCartTotal();
    toggleFavouriteButtons();
}


//-------------------------------------- Event listener for quantity buttons and remove button---------------------------------------
//-------------------This event listener is responsible for handling the quantity increase, decrease, and remove actions.-----------------------
document.getElementById("cartItems").addEventListener("click", (e) => {
    const button = e.target;
    const action = button.dataset.action;
    const index = parseInt(button.dataset.index);

    if (!action || isNaN(index)) return;

    switch (action) {
        case "increase":
            increaseQuantity(index);
            break;
        case "decrease":
            decreaseQuantity(index);
            break;
        case "remove":
            removeFromCart(index);
            break;
    }
});

//------------------------Functions to handle cart operations-------------------------
function increaseQuantity(index) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart[index].quantity += 1;
    localStorage.setItem("cart", JSON.stringify(cart));
    loadCart();
    updateCartCount();
}


//------------------- Decrease quantity or remove item if quantity is 1 ----------------------------------
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


//------------------------------------- Remove item from cart------------------------------------
function removeFromCart(index) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cart));
    loadCart();
    updateCartCount();
}


//----------------------------- Clear the entire cart --------------------
function clearCart() {
    localStorage.removeItem("cart");
    loadCart();
    updateCartCount();
}


//------------------------------------ Calculate the total price of the cart --------------------------
function calculateCartTotal() {
    let cartItems = JSON.parse(localStorage.getItem("cart")) || [];
    let subtotal = 0;
    cartItems.forEach(item => {
        subtotal += item.price * item.quantity;
    });
    let deliveryFee = 500;
    let total = subtotal + deliveryFee;

    document.getElementById("subtotalAmount").innerText = `${subtotal.toFixed(2)} LKR`;
    document.getElementById("deliveryFee").innerText = `${deliveryFee.toFixed(2)}LKR`;
    document.getElementById("totalAmount").innerText = `${total.toFixed(2)}LKR`;
}


//--------------------------- Update the cart count in the header ------------------------
//------------------------ This function updates the cart count displayed in the header of the page. ------------------------ 
function updateCartCount() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const cartCountEl = document.getElementById("cartCount");
    if (cartCountEl) {
        cartCountEl.innerText = cart.reduce((acc, item) => acc + item.quantity, 0);
    }
}

function toggleFavouriteButtons() {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const btnSaveFav = document.getElementById("saveFavourite");
    const btnApplyFav = document.getElementById("applyFavourite");
    const btnProceed = document.getElementById("proceedToPayment"); 

    btnProceed.addEventListener("click", () => {
        window.location.href = "payment.html";
    });

    // Disable Save Favourite if cart is empty
    btnSaveFav.disabled = cart.length === 0;

    // Disable Apply Favourite if no saved favourite
    const favOrder = localStorage.getItem("favouriteOrder");
    btnApplyFav.disabled = !favOrder || favOrder.length === 0;

    // Disable Proceed to Payment if cart is empty
    btnProceed.disabled = cart.length === 0;
    btnClear.disabled = cart.length === 0
}


//------------------------ Save the current cart as a favourite order ------------------------
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


// ------------------------ Apply the saved favourite order to the cart ------------------------
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
