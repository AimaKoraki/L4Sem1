
// -----------------This script is responsible for loading the product data from a JSON file and displaying it on the page. 
// --------------------------It also handles adding items to the cart and updating the cart count.
document.addEventListener("DOMContentLoaded", function () {
    updateCartCount(); 

    fetch("./products/products.json")
        .then(response => response.json())
        .then(data => {
            const currentPage = document.body.getAttribute("data-page"); // Identify which page is loaded

            if (currentPage === "consoles") {
                displayProducts(data.consoles);
            } else if (currentPage === "computerParts") {
                displayProducts(data.computerParts);
            } else if (currentPage === "gamingPeripherals") {
                displayProducts(data.gamingPeripherals);
            } else {
                console.error("Page not recognized!");
            }
        })
        .catch(error => console.error("Error loading JSON file", error));
});


// ------------------------Function to display products on the page ------------------------
// -------------This function takes an array of categories and their respective items, creates HTML elements for each product, and appends them to the container------------------------.
function displayProducts(categories) {
    const container = document.querySelector(".products-container");
    if (!container) {
        console.error("Error: products-container not found in HTML!");
        return;
    }
    container.innerHTML = "";

    categories.forEach(category => {
        const section = document.createElement("section");
        section.classList.add("product-section");

        section.innerHTML = `
            <h2>${category.category}</h2>
            <div class="product__grid"></div>
        `;

        const grid = section.querySelector(".product__grid");

        category.items.forEach(product => {
            const productCard = document.createElement("div");
            productCard.classList.add("product__card");

            productCard.innerHTML = `
                <img src="${product.image}" alt="${product.name}">
                <h3>${product.name}</h3>
                <p>Experience next-gen gaming</p>
                <div class="shop__buttons">
                    <div class="shop__buttons__Container">
                        <div class="price__box">
                            <span class="price">${product.price.toFixed(2)} LKR</span>
                        </div>            
                        <button class="shop__button" 
                            data-name="${product.name}" 
                            data-price="${product.price}" 
                            data-image="${product.image}">
                            Add to Cart
                        </button>
                    </div>
                </div>`;

            grid.appendChild(productCard);
        });

        container.appendChild(section);
    });

    // ------------------------Attach event listener to all "Add to Cart" buttons------------------------
    const addToCartButtons = container.querySelectorAll(".shop__button");
    addToCartButtons.forEach(button => {
        button.addEventListener("click", () => {
            const name = button.dataset.name;
            const price = parseFloat(button.dataset.price);
            const image = button.dataset.image;
            addToCart(name, price, image);
        });
    });
}




// ------------------------Function to add an item to the cart------------------------
// ------------------------This function takes the item name, price, and image as parameters, 
// ---------------checks if the item already exists in the cart, and updates the cart accordingly.------------------------
function addToCart(itemName, itemPrice, itemImage) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    // Check if item already exists in the cart
    let existingItem = cart.find(item => item.name === itemName);

    if (existingItem) {
        existingItem.quantity += 1; // Increase the quantity
    } else {
        cart.push({ name: itemName, price: itemPrice, image: itemImage, quantity: 1 });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartCount();
    alert(`${itemName} added to cart!`);
}


// ------------------------Function to load the cart items from localStorage and display them in the cart table ------------------------
function updateCartCount() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let totalItems = cart.reduce((sum, item) => sum + item.quantity, 0); // Sum up item quantities
    document.getElementById("cart__count").innerText = totalItems;
}

