//------------------------ This script handles the payment form validation and submission. ------------------------
document.addEventListener("DOMContentLoaded", () => {
    // Connect Pay button
    document.getElementById("payBtn")?.addEventListener("click", submitOrder);

    // Connect Close button
    document.getElementById("closePopup")?.addEventListener("click", () => {
        const popup = document.getElementById("popup");
        if (popup) {
            popup.style.display = "none";
            popup.setAttribute("aria-hidden", "true");
        }
    });
});

//------------------------ Function to submit the order ------------------------
// ------------------------ This function validates the payment form fields and shows a thank you message if valid. It also clears the cart. ------------------------
function submitOrder(event) {
    event.preventDefault();

    const firstName = document.getElementById("fName")?.value.trim();
    const lastName = document.getElementById("lName")?.value.trim();
    const email = document.getElementById("useremail")?.value.trim();
    const nameOnCard = document.getElementById("nameOnCard")?.value.trim();
    const cardNumber = document.getElementById("cardNumber")?.value.trim();
    const cvc = document.getElementById("cvc")?.value.trim();
    const zip = document.getElementById("zip")?.value.trim();

    let errors = [];

    const nameRegex = /^[A-Za-z\s]+$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!nameRegex.test(firstName)) errors.push("First name must contain only letters.");
    if (!nameRegex.test(lastName)) errors.push("Last name must contain only letters.");
    if (!emailRegex.test(email)) errors.push("Please enter a valid email address.");
    if (!nameRegex.test(nameOnCard)) errors.push("Name on card must contain only letters.");
    if (!/^\d{16}$/.test(cardNumber)) errors.push("Card number must be exactly 16 digits.");
    if (!/^\d{3}$/.test(cvc)) errors.push("CVC must be exactly 3 digits.");
    if (!/^\d{5}$/.test(zip)) errors.push("ZIP code must be exactly 5 digits.");

    if (errors.length > 0) {
        alert(errors.join("\n"));
        return;
    }
    
    // ------------------------ If valid: show thank you message and clear cart ------------------------
    const name = firstName + " " + lastName;
    const thankYouMsg = document.getElementById('thankYouMsg');
    
    if (thankYouMsg) {
        const purchaseDate = new Date();
        const deliveryDate = new Date(purchaseDate);
        deliveryDate.setDate(purchaseDate.getDate() + 7);
    
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        const formattedDeliveryDate = deliveryDate.toLocaleDateString(undefined, options);
    
        thankYouMsg.innerText = `Thank you for your purchase, ${name}! Your order will be delivered by ${formattedDeliveryDate}.`;
    }
    
    const popup = document.getElementById('popup');
    if (popup) {
        popup.style.display = "flex";
        popup.setAttribute("aria-hidden", "false");
    }
    
    // ------------------------ Clear the cart ------------------------
    localStorage.removeItem("cart");
    updateCartCount?.(); // optional: update cart count in header if that function exists
    loadCart?.();        // optional: reload empty cart view if this exists
}
