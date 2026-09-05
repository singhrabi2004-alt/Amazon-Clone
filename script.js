// =====================================================
// AMAZON CLONE - COMPLETE JAVASCRIPT
// SEARCH + CART + CHECKOUT + DEMO PAYMENT
// =====================================================


// =====================================================
// PRODUCTS
// =====================================================

const products = [

    {
        id: 1,
        name: "Wireless Headphones",
        category: "Electronics",
        price: 2499,
        discount: 35,
        image: "🎧",
        description: "High-quality wireless headphones with clear sound and comfortable design."
    },

    {
        id: 2,
        name: "Smartphone",
        category: "Electronics",
        price: 19999,
        discount: 20,
        image: "📱",
        description: "Modern smartphone with powerful performance and excellent display."
    },

    {
        id: 3,
        name: "Smart Watch",
        category: "Electronics",
        price: 3999,
        discount: 25,
        image: "⌚",
        description: "Smart watch with fitness tracking and everyday smart features."
    },

    {
        id: 4,
        name: "Gaming Controller",
        category: "Gaming",
        price: 2999,
        discount: 30,
        image: "🎮",
        description: "Comfortable gaming controller designed for an immersive gaming experience."
    },

    {
        id: 5,
        name: "Running Shoes",
        category: "Fashion",
        price: 1799,
        discount: 40,
        image: "👟",
        description: "Lightweight running shoes suitable for sports, running and everyday use."
    },

    {
        id: 6,
        name: "Laptop",
        category: "Electronics",
        price: 54999,
        discount: 15,
        image: "💻",
        description: "Powerful laptop suitable for work, study and entertainment."
    },

    {
        id: 7,
        name: "Digital Camera",
        category: "Electronics",
        price: 29999,
        discount: 15,
        image: "📷",
        description: "Digital camera for capturing high-quality photos and videos."
    },

    {
        id: 8,
        name: "T-Shirt",
        category: "Fashion",
        price: 799,
        discount: 30,
        image: "👕",
        description: "Comfortable casual t-shirt made for everyday use."
    },

    {
        id: 9,
        name: "Coffee Maker",
        category: "Home & Kitchen",
        price: 3499,
        discount: 20,
        image: "☕",
        description: "Easy-to-use coffee maker for preparing delicious coffee at home."
    },

    {
        id: 10,
        name: "Backpack",
        category: "Fashion",
        price: 1299,
        discount: 25,
        image: "🎒",
        description: "Durable backpack with spacious compartments for everyday use."
    }

];


// =====================================================
// LOCAL STORAGE HELPERS
// =====================================================

function getCart() {

    try {

        return JSON.parse(
            localStorage.getItem("cart")
        ) || [];

    } catch (error) {

        console.error("Cart error:", error);

        return [];

    }

}


function saveCart(cart) {

    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );

}


// =====================================================
// CART COUNT
// =====================================================

function updateCartCount() {

    const cartCount =
        document.querySelector(".cart-count");

    if (!cartCount) return;

    const cart = getCart();

    const totalQuantity =
        cart.reduce(
            (total, item) =>
                total + (Number(item.quantity) || 1),
            0
        );

    cartCount.textContent = totalQuantity;

}


// =====================================================
// PRODUCT CARD
// =====================================================

function createProductCard(product) {

    const card =
        document.createElement("div");

    card.className = "card";

    card.innerHTML = `

        <h2>
            ${product.name}
        </h2>

        <div class="product-image">
            ${product.image}
        </div>

        <p>
            ${product.description}
        </p>

        <strong>
            ₹${Number(product.price).toLocaleString("en-IN")}
        </strong>

        <span class="discount">
            ${product.discount}% off
        </span>

        <br><br>

        <a href="product.html?id=${product.id}">
            View Product
        </a>

    `;

    return card;

}


// =====================================================
// PRODUCT LIST + SEARCH
// =====================================================

function setupProductPage() {

    const productList =
        document.getElementById("product-list");

    if (!productList) return;


    const searchInput =
        document.querySelector(
            ".search-box input"
        );

    const searchButton =
        document.querySelector(
            ".search-box button"
        );

    const categorySelect =
        document.querySelector(
            ".search-box select"
        );


    function displayProducts(list) {

        productList.innerHTML = "";


        if (list.length === 0) {

            productList.innerHTML = `

                <div class="no-products">

                    <h2>
                        No products found
                    </h2>

                    <p>
                        Try another search.
                    </p>

                </div>

            `;

            return;
        }


        list.forEach(product => {

            productList.appendChild(
                createProductCard(product)
            );

        });

    }


    function searchProducts() {

        const searchText =
            searchInput
                ? searchInput.value
                    .trim()
                    .toLowerCase()
                : "";


        const category =
            categorySelect
                ? categorySelect.value
                : "All";


        const filtered =
            products.filter(product => {

                const name =
                    product.name
                        .toLowerCase();

                const productCategory =
                    product.category
                        .toLowerCase();

                const description =
                    product.description
                        .toLowerCase();


                const matchesSearch =
                    searchText === "" ||

                    name.includes(searchText) ||

                    productCategory.includes(searchText) ||

                    description.includes(searchText);


                const matchesCategory =
                    category === "All" ||

                    product.category === category;


                return (
                    matchesSearch &&
                    matchesCategory
                );

            });


        displayProducts(filtered);

    }


    // Initial products

    displayProducts(products);


    // Search button

    if (searchButton) {

        searchButton.addEventListener(
            "click",
            function(event) {

                event.preventDefault();

                searchProducts();

            }
        );

    }


    // Search while typing

    if (searchInput) {

        searchInput.addEventListener(
            "input",
            searchProducts
        );


        searchInput.addEventListener(
            "keydown",
            function(event) {

                if (event.key === "Enter") {

                    event.preventDefault();

                    searchProducts();

                }

            }
        );

    }


    // Category filter

    if (categorySelect) {

        categorySelect.addEventListener(
            "change",
            searchProducts
        );

    }

}


// =====================================================
// PRODUCT DETAILS PAGE
// =====================================================

function setupProductDetails() {

    const productId =
        new URLSearchParams(
            window.location.search
        ).get("id");


    if (!productId) return;


    const selectedProduct =
        products.find(
            product =>
                String(product.id) ===
                String(productId)
        );


    if (!selectedProduct) return;


    const productImage =
        document.getElementById(
            "product-image"
        );

    const productName =
        document.getElementById(
            "product-name"
        );

    const productCategory =
        document.getElementById(
            "product-category"
        );

    const productDescription =
        document.getElementById(
            "product-description"
        );

    const productPrice =
        document.getElementById(
            "product-price"
        );

    const productDiscount =
        document.getElementById(
            "product-discount"
        );


    if (productImage) {

        productImage.textContent =
            selectedProduct.image;

    }


    if (productName) {

        productName.textContent =
            selectedProduct.name;

    }


    if (productCategory) {

        productCategory.textContent =
            selectedProduct.category;

    }


    if (productDescription) {

        productDescription.textContent =
            selectedProduct.description;

    }


    if (productPrice) {

        productPrice.textContent =
            `₹${Number(
                selectedProduct.price
            ).toLocaleString("en-IN")}`;

    }


    if (productDiscount) {

        productDiscount.textContent =
            `${selectedProduct.discount}% off`;

    }


    // Add to cart

    const addButton =
        document.getElementById(
            "add-to-cart"
        );


    if (addButton) {

        addButton.addEventListener(
            "click",
            function() {

                const cart = getCart();


                const existing =
                    cart.find(
                        item =>
                            Number(item.id) ===
                            Number(selectedProduct.id)
                    );


                if (existing) {

                    existing.quantity =
                        (Number(existing.quantity) || 1) + 1;

                } else {

                    cart.push({

                        ...selectedProduct,

                        quantity: 1

                    });

                }


                saveCart(cart);

                updateCartCount();


                alert(
                    `${selectedProduct.name} added to cart!`
                );

            }
        );

    }

}


// =====================================================
// CART PAGE
// =====================================================

function setupCartPage() {

    const cartContainer =
        document.getElementById(
            "cart-container"
        );


    if (!cartContainer) return;


    function displayCart() {

        const cart = getCart();


        cartContainer.innerHTML = "";


        let total = 0;


        if (cart.length === 0) {

            cartContainer.innerHTML = `

                <div class="no-products">

                    <h2>
                        Your cart is empty.
                    </h2>

                    <p>
                        Add some products first.
                    </p>

                    <a href="index.html">
                        Continue Shopping
                    </a>

                </div>

            `;


            const totalElement =
                document.getElementById(
                    "cart-total"
                );


            if (totalElement) {

                totalElement.textContent =
                    "₹0";

            }


            return;

        }


        cart.forEach(
            (product, index) => {

                const quantity =
                    Number(product.quantity) || 1;

                const price =
                    Number(product.price) || 0;


                total +=
                    price * quantity;


                const item =
                    document.createElement(
                        "div"
                    );


                item.className =
                    "cart-item";


                item.innerHTML = `

                    <div class="cart-item-image">
                        ${product.image}
                    </div>

                    <div class="cart-item-info">

                        <h2>
                            ${product.name}
                        </h2>

                        <p>
                            ${product.category}
                        </p>

                        <strong>
                            ₹${price.toLocaleString("en-IN")}
                        </strong>

                        <div class="quantity">

                            <button
                                class="minus-btn"
                                data-index="${index}"
                            >
                                −
                            </button>

                            <span>
                                ${quantity}
                            </span>

                            <button
                                class="plus-btn"
                                data-index="${index}"
                            >
                                +
                            </button>

                        </div>

                        <button
                            class="remove-btn"
                            data-index="${index}"
                        >
                            🗑️ Remove
                        </button>

                    </div>

                `;


                cartContainer.appendChild(item);

            }
        );


        const totalElement =
            document.getElementById(
                "cart-total"
            );


        if (totalElement) {

            totalElement.textContent =
                `₹${total.toLocaleString("en-IN")}`;

        }


        // PLUS

        cartContainer
            .querySelectorAll(".plus-btn")
            .forEach(button => {

                button.addEventListener(
                    "click",
                    function() {

                        const cart = getCart();

                        const index =
                            Number(
                                button.dataset.index
                            );


                        if (!cart[index]) return;


                        cart[index].quantity =
                            (Number(
                                cart[index].quantity
                            ) || 1) + 1;


                        saveCart(cart);

                        displayCart();

                        updateCartCount();

                    }
                );

            });


        // MINUS

        cartContainer
            .querySelectorAll(".minus-btn")
            .forEach(button => {

                button.addEventListener(
                    "click",
                    function() {

                        const cart = getCart();

                        const index =
                            Number(
                                button.dataset.index
                            );


                        if (!cart[index]) return;


                        const quantity =
                            Number(
                                cart[index].quantity
                            ) || 1;


                        if (quantity > 1) {

                            cart[index].quantity =
                                quantity - 1;

                        }


                        saveCart(cart);

                        displayCart();

                        updateCartCount();

                    }
                );

            });


        // REMOVE

        cartContainer
            .querySelectorAll(".remove-btn")
            .forEach(button => {

                button.addEventListener(
                    "click",
                    function() {

                        const cart = getCart();

                        const index =
                            Number(
                                button.dataset.index
                            );


                        if (!cart[index]) return;


                        const name =
                            cart[index].name;


                        cart.splice(index, 1);


                        saveCart(cart);

                        displayCart();

                        updateCartCount();


                        alert(
                            `${name} removed from cart.`
                        );

                    }
                );

            });

    }


    displayCart();

}


// =====================================================
// CHECKOUT PAGE
// =====================================================

function setupCheckoutPage() {

    const checkoutItems =
        document.getElementById(
            "checkout-items"
        );


    if (!checkoutItems) return;


    const itemsTotal =
        document.getElementById(
            "items-total"
        );


    const orderTotal =
        document.getElementById(
            "order-total"
        );


    const payButton =
        document.getElementById(
            "pay-button"
        );


    const cardDetails =
        document.getElementById(
            "card-details"
        );


    const upiDetails =
        document.getElementById(
            "upi-details"
        );


    // =================================================
    // DISPLAY CHECKOUT
    // =================================================

    function displayCheckout() {

        const cart = getCart();


        checkoutItems.innerHTML = "";


        let total = 0;


        if (cart.length === 0) {

            checkoutItems.innerHTML = `

                <p>
                    Your cart is empty.
                </p>

            `;


            if (itemsTotal) {

                itemsTotal.textContent =
                    "₹0";

            }


            if (orderTotal) {

                orderTotal.textContent =
                    "₹0";

            }


            if (payButton) {

                payButton.disabled = true;

            }


            return;

        }


        cart.forEach(product => {

            const quantity =
                Number(product.quantity) || 1;


            const price =
                Number(product.price) || 0;


            const productTotal =
                price * quantity;


            total += productTotal;


            const item =
                document.createElement(
                    "div"
                );


            item.className =
                "checkout-item";


            item.innerHTML = `

                <div>

                    <strong>
                        ${product.image}
                        ${product.name}
                    </strong>

                    <p>
                        Quantity: ${quantity}
                    </p>

                </div>

                <strong>
                    ₹${productTotal.toLocaleString("en-IN")}
                </strong>

            `;


            checkoutItems.appendChild(item);

        });


        if (itemsTotal) {

            itemsTotal.textContent =
                `₹${total.toLocaleString("en-IN")}`;

        }


        if (orderTotal) {

            orderTotal.textContent =
                `₹${total.toLocaleString("en-IN")}`;

        }


        if (payButton) {

            payButton.disabled = false;

        }

    }


    displayCheckout();


    // =================================================
    // PAYMENT METHOD
    // =================================================

    const paymentOptions =
        document.querySelectorAll(
            'input[name="payment"]'
        );


    function updatePaymentFields() {

        const selected =
            document.querySelector(
                'input[name="payment"]:checked'
            );


        // Hide everything first

        if (cardDetails) {

            cardDetails.style.display =
                "none";

        }


        if (upiDetails) {

            upiDetails.style.display =
                "none";

        }


        if (!selected) return;


        // CARD

        if (selected.value === "card") {

            if (cardDetails) {

                cardDetails.style.display =
                    "block";

            }

        }


        // UPI

        if (selected.value === "upi") {

            if (upiDetails) {

                upiDetails.style.display =
                    "block";

            }

        }


        // COD

        if (selected.value === "cod") {

            // Both remain hidden

        }

    }


    paymentOptions.forEach(
        option => {

            option.addEventListener(
                "change",
                updatePaymentFields
            );

        }
    );


    updatePaymentFields();


    // =================================================
    // DEMO PAYMENT
    // =================================================

    if (payButton) {

        payButton.addEventListener(
            "click",
            function(event) {

                event.preventDefault();


                const cart = getCart();


                // CART CHECK

                if (cart.length === 0) {

                    alert(
                        "Your cart is empty."
                    );

                    return;

                }


                // ADDRESS

                const nameInput =
                    document.getElementById(
                        "full-name"
                    );


                const phoneInput =
                    document.getElementById(
                        "phone"
                    );


                const addressInput =
                    document.getElementById(
                        "address"
                    );


                const cityInput =
                    document.getElementById(
                        "city"
                    );


                const pincodeInput =
                    document.getElementById(
                        "pincode"
                    );


                const name =
                    nameInput
                        ? nameInput.value.trim()
                        : "";


                const phone =
                    phoneInput
                        ? phoneInput.value.trim()
                        : "";


                const address =
                    addressInput
                        ? addressInput.value.trim()
                        : "";


                const city =
                    cityInput
                        ? cityInput.value.trim()
                        : "";


                const pincode =
                    pincodeInput
                        ? pincodeInput.value.trim()
                        : "";


                if (
                    !name ||
                    !phone ||
                    !address ||
                    !city ||
                    !pincode
                ) {

                    alert(
                        "Please enter your complete delivery address."
                    );

                    return;

                }


                // PAYMENT

                const selectedPayment =
                    document.querySelector(
                        'input[name="payment"]:checked'
                    );


                if (!selectedPayment) {

                    alert(
                        "Please select a payment method."
                    );

                    return;

                }


                const paymentMethod =
                    selectedPayment.value;


                // =================================================
                // CARD VALIDATION
                // =================================================

                if (
                    paymentMethod === "card"
                ) {

                    const cardInput =
                        document.getElementById(
                            "card-number"
                        );


                    const expiryInput =
                        document.getElementById(
                            "expiry"
                        );


                    const cvvInput =
                        document.getElementById(
                            "cvv"
                        );


                    const cardNumber =
                        cardInput
                            ? cardInput.value
                                .replace(/\s/g, "")
                            : "";


                    const expiry =
                        expiryInput
                            ? expiryInput.value.trim()
                            : "";


                    const cvv =
                        cvvInput
                            ? cvvInput.value.trim()
                            : "";


                    if (
                        !/^\d{16}$/.test(cardNumber)
                    ) {

                        alert(
                            "Enter a valid 16-digit demo card number."
                        );

                        return;

                    }


                    if (
                        !/^\d{2}\/\d{2}$/.test(expiry)
                    ) {

                        alert(
                            "Enter expiry as MM/YY."
                        );

                        return;

                    }


                    if (
                        !/^\d{3}$/.test(cvv)
                    ) {

                        alert(
                            "Enter a valid 3-digit CVV."
                        );

                        return;

                    }

                }


                // =================================================
                // UPI VALIDATION
                // =================================================

                if (
                    paymentMethod === "upi"
                ) {

                    const upiInput =
                        document.getElementById(
                            "upi-id"
                        );


                    const upi =
                        upiInput
                            ? upiInput.value.trim()
                            : "";


                    if (
                        !/^[^@\s]+@[^@\s]+$/.test(upi)
                    ) {

                        alert(
                            "Enter a valid demo UPI ID, for example example@upi."
                        );

                        return;

                    }

                }


                // =================================================
                // COD
                // =================================================

                if (
                    paymentMethod === "cod"
                ) {

                    // No extra payment details required.

                }


                // =================================================
                // TOTAL
                // =================================================

                let total = 0;


                cart.forEach(product => {

                    const quantity =
                        Number(product.quantity) || 1;


                    const price =
                        Number(product.price) || 0;


                    total +=
                        quantity * price;

                });


                // =================================================
                // ORDER NUMBER
                // =================================================

                const orderNumber =
                    Math.floor(
                        100000 +
                        Math.random() * 900000
                    );


                // =================================================
                // SAVE ORDER
                // =================================================

                const order = {

                    orderNumber:
                        orderNumber,

                    customerName:
                        name,

                    phone:
                        phone,

                    address:
                        address,

                    city:
                        city,

                    pincode:
                        pincode,

                    paymentMethod:
                        paymentMethod,

                    total:
                        total,

                    date:
                        new Date().toLocaleString(
                            "en-IN"
                        )

                };


                localStorage.setItem(
                    "lastOrder",
                    JSON.stringify(order)
                );


                // CLEAR CART

                localStorage.removeItem(
                    "cart"
                );


                // SUCCESS

                window.location.href =
                    "success.html";

            }
        );

    }

}


// =====================================================
// BACK TO TOP
// =====================================================

function setupBackToTop() {

    const backTop =
        document.querySelector(
            ".back-top"
        );


    if (!backTop) return;


    backTop.addEventListener(
        "click",
        function() {

            window.scrollTo({

                top: 0,

                behavior: "smooth"

            });

        }
    );

}


// =====================================================
// SHOP NOW BUTTON
// =====================================================

function setupShopButton() {

    const button =
        document.querySelector(
            ".shop-btn"
        );


    if (!button) return;


    button.addEventListener(
        "click",
        function() {

            const productList =
                document.getElementById(
                    "product-list"
                );


            if (productList) {

                productList.scrollIntoView({

                    behavior: "smooth"

                });

            }

        }
    );

}


// =====================================================
// START EVERYTHING
// =====================================================

document.addEventListener(
    "DOMContentLoaded",
    function() {

        setupProductPage();

        setupProductDetails();

        setupCartPage();

        setupCheckoutPage();

        setupBackToTop();

        setupShopButton();

        updateCartCount();

    }
);
