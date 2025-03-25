const products = {
    featured: [
        { name: "PlayStation 5", image: "./images/PS5.webp", price: 269000 },
        { name: "Xbox Series X", image: "./images/Xbox.webp", price: 269000 },
        { name: "Nintendo Switch", image: "./images/Nintendo.webp", price: 269000 }
    ],
    Xbox: [
        { name: "Xbox Series S - 1TB (White)", image: "./images/consoles/XboxSeriesS-1TB(White).webp", price: 80000 },
        { name: "Xbox Series X - 1TB Digital Edition (White)", image: "./images/consoles/XboxSeriesX-1TBGalaxyBSE.webp", price: 699000 },
        { name: "Xbox Series X - 2TB Galaxy Black Special Edition", image: "./images/consoles/XboxSeriesX_2TB_GBEdition.webp", price: 119000 }
    ],
    Nintendo: [
        { name: "Nintendo Switch OLED ", image: "./images/consoles/Switch-OLED.webp", price: 80000 },
        { name: "Nintendo Switch Lite", image: "./images/consoles/Nintendo-Switch-lite-3.webp", price: 699000 },
        { name: "Nintendo Switch", image: "./images/Nintendo.webp", price: 119000 }
    ],
    PlayStation: [
        { name: "PlayStation 5", image: "./images/PS5.webp", price: 80000 },
        { name: "PlayStation 4", image: "./images/consoles/pS4.webp", price: 699000 },
        { name: "PlayStation 3", image: "./images/consoles/ps3_60gb_pak__37675.webp", price: 119000 }    ],
};
document.addEventListener("DOMContentLoaded", function () {
    loadProducts();
    updateCartCount(); 
});
function loadProducts() {
    for (const category in products) {
        const sectionId = `${category}Grid`;  
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

