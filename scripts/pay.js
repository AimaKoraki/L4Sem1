// Select the Pay button
const payButton = document.getElementById('payBtn');
const closePop = document.getElementById('closePopup');

// Add Event Listener
payButton.addEventListener("click", submitOrder);
closePop.addEventListener("click", closePopup);

function submitOrder(event) {
    event.preventDefault(); // Prevent form from submitting

    let Fname = document.getElementById("fName").value.trim();
    let Lname = document.getElementById("lName").value.trim();
    let address = document.getElementById("address").value.trim();
    let cardNumber = document.getElementById("cardNumber").value.trim();

    if (Fname === "" || address === "" || cardNumber === "" || Lname === "") {
        alert("Please fill in all fields.");
    } else {
        // Display Thank You Popup
        document.getElementById('thankYouMsg').innerText = `Thank you for your purchase, ${name}! Your order will be delivered soon.`;
        document.getElementById('popup').style.display = "flex";

        localStorage.removeItem("cart");

        // Clear fields
        document.getElementById("fName").value = "";
        document.getElementById("address").value = "";
        document.getElementById("cardNumber").value = "";
    }
}

function closePopup() {
    document.getElementById('popup').style.display = "none";
}
