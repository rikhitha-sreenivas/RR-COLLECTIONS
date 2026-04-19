// 1. Retrieve cart data from Local Storage
let cart = JSON.parse(localStorage.getItem('myCart')) || [];

const cartContainer = document.getElementById('cart-items');
const cartCount = document.getElementById('cart-count');

function displayCart() {
    cartContainer.innerHTML = ''; // Clear previous content
    cartCount.innerText = cart.length;

    if (cart.length === 0) {
        cartContainer.innerHTML = "<p>Your garage is empty. Go find your ride!</p>";
        updatePrices(0);
        return;
    }

    let subtotal = 0;

    cart.forEach((item, index) => {
        subtotal += item.price;
        
        const itemDiv = document.createElement('div');
        itemDiv.className = 'cart-item';
        itemDiv.innerHTML = `
            <div class="item-details">
                <h4>${item.name}</h4>
                <p>₹${item.price.toLocaleString('en-IN')}</p>
            </div>
            <button class="remove-btn" onclick="removeItem(${index})">Remove</button>
        `;
        cartContainer.appendChild(itemDiv);
    });

    updatePrices(subtotal);
}

function updatePrices(subtotal) {
    const tax = subtotal * 0.18;
    const total = subtotal + tax;

    document.getElementById('subtotal').innerText = `₹${subtotal.toLocaleString('en-IN')}`;
    document.getElementById('tax').innerText = `₹${tax.toLocaleString('en-IN')}`;
    document.getElementById('grand-total').innerText = `₹${total.toLocaleString('en-IN')}`;
}

function removeItem(index) {
    cart.splice(index, 1); // Remove item from array
    localStorage.setItem('myCart', JSON.stringify(cart)); // Update storage
    displayCart(); // Refresh UI
}

function checkout() {
    alert("Order placed! Prepare for the ride of your life.");
    localStorage.clear();
    window.location.href = "index.html";
}

// Initialize the page
displayCart();

function renderCart() {
    const cart = JSON.parse(localStorage.getItem('RE_GARAGE')) || [];
    const container = document.getElementById('cart-items');
    const countLabel = document.getElementById('cart-count');
    
    countLabel.innerText = cart.length;

    if (cart.length === 0) {
        document.getElementById('main-wrapper').innerHTML = `
            <div id="empty-msg">
                <h3>Your Garage is empty.</h3>
                <a href="bikes.html" style="color:var(--gold)">Browse Motorcycles</a>
            </div>`;
        return;
    }

    let subtotal = 0;
    container.innerHTML = '';

    cart.forEach((item, index) => {
        let price = 0;
        let priceDisplay = "";

        // Price Logic: If it's a bike (RE), use Lakhs. If it's Apsara (Car), use Crores.
        // We check the name of the item to decide the price
        const bikeNames = ["Classic", "Bullet", "Hunter", "Meteor", "Himalayan", "Interceptor", "Continental", "Super Meteor", "Shotgun", "Bear", "Scram", "GT-R650"];
        
        let isBike = bikeNames.some(bike => item.includes(bike));

        if (isBike) {
            price = 250000; // Default bike price ~2.5 Lakh
            if (item.includes('650')) price = 400000; 
            if (item.includes('Hunter')) price = 170000;
            priceDisplay = "₹" + (price / 100000).toFixed(2) + " Lakh";
        } else {
            price = 25000000; // Default car price 2.5 Crore
            priceDisplay = "₹" + (price / 10000000).toFixed(2) + " Cr";
        }

        subtotal += price;

        container.innerHTML += `
            <div class="cart-item">
                <div class="item-info">
                    <h4>${item}</h4>
                    <p style="color:#555; font-size:0.8rem;">${isBike ? 'Mechanical Masterpiece' : 'Luxury Acquisition'}</p>
                </div>
                <div class="item-price">
                    <span style="color:var(--gold); font-weight:600;">${priceDisplay}</span>
                    <br>
                    <button class="remove-btn" onclick="removeItem(${index})">Remove from Garage</button>
                </div>
            </div>
        `;
    });

    const tax = subtotal * 0.18;
    const total = subtotal + tax;

    // Formatting the summary display
    const formatCurrency = (num) => {
        return num >= 10000000 
            ? "₹" + (num / 10000000).toFixed(2) + " Cr" 
            : "₹" + (num / 100000).toFixed(2) + " Lakh";
    };

    document.getElementById('subtotal').innerText = formatCurrency(subtotal);
    document.getElementById('tax').innerText = formatCurrency(tax);
    document.getElementById('grand-total').innerText = formatCurrency(total);
}