const products = {
    processors: [
        { name: "Intel i5 Processor", image: "./images/products/intel-i5.webp", price: 200 },
        { name: "Intel i7 Processor", image: "./images/products/intel-i7.webp", price: 300 },
        { name: "Intel i9 Processor", image: "./images/products/intel-i9.webp", price: 250 },
        { name: "AMD Ryzen 5", image: "./images/products/rysen-5.webp", price: 300 },
        { name: "AMD Ryzen 7", image: "./images/products/rysen-7.webp", price: 250 },
        { name: "AMD Ryzen 9", image: "./images/products/rysen-9.webp", price: 350 }
    ],
    graphicsCards: [
        { name: "ZOTAC GAMING RTX 3050 ECO 8GB", image: "./images/products/RTX3050.webp", price: 80000 },
        { name: "ASUS TUF Gaming RTX 5080 16GB GDDR7", image: "./images/products/RTX3050.webp", price: 699000 },
        { name: "ZOTAC GAMING RTX 4060 8GB Twin Edge OC BLACK / WHITE", image: "./images/products/RTX4060.webp", price: 119000 },
        { name: "ASUS Dual Radeon RX 7600 V2 8GB GDDR6", image: "./images/products/radRX7600.webp", price: 129000 },
        { name: "ASUS ROG RTX 5090 Astral 32GB GDDR7", image: "./images/products/RTX5090.webp", price: 1499000 },
        { name: "MSI RTX 4080 SUPER GAMING SLIM 16GB", image: "./images/products/RTX4080.webp", price: 529000 }
    ],
    motherboards: [
        { name: "MSI B450", image: "images/msi-b450.jpg", price: 150 },
        { name: "ASUS Prime X570", image: "images/asus-x570.jpg", price: 250 },
        { name: "MSI B450", image: "images/msi-b450.jpg", price: 150 },
        { name: "ASUS Prime X570", image: "images/asus-x570.jpg", price: 250 },
        { name: "MSI B450", image: "images/msi-b450.jpg", price: 150 },
        { name: "ASUS Prime X570", image: "images/asus-x570.jpg", price: 250 }
    ],
    ram: [
        { name: "Corsair 16GB DDR4", image: "images/corsair-16gb.jpg", price: 100 },
        { name: "Corsair 16GB DDR4", image: "images/corsair-16gb.jpg", price: 100 },
        { name: "Corsair 16GB DDR4", image: "images/corsair-16gb.jpg", price: 100 },
        { name: "G.Skill 32GB DDR4", image: "images/gskill-32gb.jpg", price: 180 }
    ],
    storage: [
        { name: "Samsung 1TB SSD", image: "images/samsung-ssd.jpg", price: 120 },
        { name: "Samsung 1TB SSD", image: "images/samsung-ssd.jpg", price: 120 },
        { name: "Samsung 1TB SSD", image: "images/samsung-ssd.jpg", price: 120 },
        { name: "Samsung 1TB SSD", image: "images/samsung-ssd.jpg", price: 120 },
        { name: "Seagate 2TB HDD", image: "images/seagate-hdd.jpg", price: 90 }
    ]
};
document.addEventListener("DOMContentLoaded", function () {
    loadProducts();
    updateCartCount(); // Update cart count when the page loads
});
function loadProducts() {
    for (const category in products) {
        const sectionId = `${category}Grid`;  // Matches the ID in index.html
        const productGrid = document.getElementById(sectionId);

        products[category].forEach(product => {
            const productCard = document.createElement("div");
            productCard.classList.add("product__card");

            productCard.innerHTML = `
                <img src="${product.image}" alt="${product.name}">
                <h3>${product.name}</h3>
                <p>High performance for gaming & work</p>
                <div class="shop__buttons">
                    <div class="shop__buttons__Container">
                        <div class="price__box">
                            <span class="price">${product.price} LKR</span>
                        </div>            
                        <button class="shop__button" onclick="addToCart('${product.name}', ${product.price}, '${product.image}')">Add to Cart</button>
                    </div>
                </div>
            `;

            productGrid.appendChild(productCard);
        });
    }
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
    document.getElementById("cart__count").innerText = cart.length;
}

