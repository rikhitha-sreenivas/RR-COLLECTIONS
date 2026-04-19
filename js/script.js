// 2. Select the Grid Element
const productGrid = document.getElementById('product-grid');

// 3. Function to Display Bikes
function displayBikes() {
    bikes.forEach(bike => {
        // Create a card div
        const card = document.createElement('div');
        card.classList.add('bike-card');

        // Fill it with HTML
        card.innerHTML = `
            <img src="${bike.image}" alt="${bike.name}">
            <div class="bike-info">
                <h3>${bike.name}</h3>
                <p>${bike.desc}</p>
                <p class="price">₹${bike.price.toLocaleString('en-IN')}</p>
                <button onclick="addToCart(${bike.id})" class="add-btn">Add to Cart</button>
            </div>
        `;

        // Append to the grid
        productGrid.appendChild(card);
    });
}

// 4. Cart Logic (Basic version)
let cart = [];

function addToCart(id) {
    const selectedBike = bikes.find(b => b.id === id);
    cart.push(selectedBike);
    
    // Update the UI
    document.getElementById('cart-count').innerText = cart.length;
    alert(`${selectedBike.name} added to your garage!`);
}

function addToCart(id) {
    // 1. Find the bike
    const selectedBike = bikes.find(b => b.id === id);
    
    // 2. Get current cart from storage OR start empty array
    let currentCart = JSON.parse(localStorage.getItem('myCart')) || [];
    
    // 3. Push the new bike into the array
    currentCart.push(selectedBike);
    
    // 4. Save the UPDATED array back to storage
    localStorage.setItem('myCart', JSON.stringify(currentCart));
    
    // 5. Update the UI count
    document.getElementById('cart-count').innerText = currentCart.length;
    
    alert(`${selectedBike.name} added to your garage!`);
}

// Initialize
displayBikes();
// Add this to your script.js or a <script> tag in index.html
const bikePanel = document.getElementById('bike-panel');
const carPanel = document.getElementById('car-panel');

bikePanel.addEventListener('mouseenter', () => {
    console.log("Welcome to the Garage.");
    // Optional: play the 'thump' sound softly when hovering
});

carPanel.addEventListener('mouseenter', () => {
    console.log("Welcome to the Showroom.");
});

