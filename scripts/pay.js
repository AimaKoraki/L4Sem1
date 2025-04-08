// Select the Pay button
const payButton = document.getElementById('payBtn');

// Add Event Listener
payButton.addEventListener('click', function(event) {
    event.preventDefault(); // prevent form from submitting immediately
    alert("Thank you for your payment!");
});
