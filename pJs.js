let cart = [];

// Add selected item to cart
function addToCart(itemName, itemPrice) {
    cart.push({ name: itemName, price: itemPrice });
    alert(`${itemName} added to cart!`);
}

// Show Order Summary
function showSummary() {
    document.getElementById("productSelection").style.display = "none";
    document.getElementById("orderSummary").style.display = "block";

    let cartTable = document.getElementById("cartItems");
    cartTable.innerHTML = "";

    let total = 0;
    cart.forEach(item => {
        let row = `<tr><td>${item.name}</td><td>$${item.price}</td></tr>`;
        cartTable.innerHTML += row;
        total += item.price;
    });

    document.getElementById("totalPrice").innerText = total;
}

// Show Payment Section
function showPayment() {
    document.getElementById("orderSummary").style.display = "none";
    document.getElementById("paymentDetails").style.display = "block";
}

// Submit Order & Validate Form
function submitOrder() {
    let name = document.getElementById("name").value;
    let address = document.getElementById("address").value;
    let cardNumber = document.getElementById("cardNumber").value;

    if (name === "" || address === "" || cardNumber === "") {
        alert("Please fill in all fields.");
    } else {
        alert(`Thank you for your purchase, ${name}! Your order will be delivered soon.`);
    }
}
