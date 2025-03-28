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
        .catch(error => console.error("Error loading JSON:", error));
});

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
                            <span class="price">$${product.price.toFixed(2)}</span>
                        </div>            
                        <button class="shop__button" onclick="addToCart('${product.name}', ${product.price}, '${product.image}')">Add to Cart</button>
                    </div>
                </div>`;

            grid.appendChild(productCard);
        });

        container.appendChild(section);
    });
}


function addToCart(itemName, itemPrice, itemImage) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.push({ name: itemName, price: itemPrice, image: itemImage });
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartCount();
    alert(`${itemName} added to cart!`);
}

function updateCartCount() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let cartCountElement = document.getElementById("cart__count");

    if (cartCountElement) {
        cartCountElement.innerText = cart.length;
    }
}
