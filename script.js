// Simple cart functionality using local storage for persistence
function addToCart(productName, productPrice) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    let product = cart.find(item => item.name === productName);
    
    if (product) {
        product.quantity++;
    } else {
        cart.push({ name: productName, price: productPrice, quantity: 1 });
    }
    
    localStorage.setItem('cart', JSON.stringify(cart));
    alert(`${productName} added to cart`);
}

// Simple cart functionality using local storage for persistence
function addToCart(productName, productPrice) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    let product = cart.find(item => item.name === productName);
    
    if (product) {
        product.quantity++;
    } else {
        cart.push({ name: productName, price: productPrice, quantity: 1 });
    }
    
    localStorage.setItem('cart', JSON.stringify(cart));
    alert(`${productName} added to cart`);
}

// Function to remove an item from the cart
function removeFromCart(productName) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart = cart.filter(item => item.name !== productName);
    localStorage.setItem('cart', JSON.stringify(cart));
    renderCart(); // Re-render the cart items after deletion
}

// Display cart items on the cart page
function renderCart() {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartItemsContainer = document.querySelector('.cart-items');
    const totalItemsElement = document.getElementById('totalItems');
    const totalCostElement = document.getElementById('totalCost');

    cartItemsContainer.innerHTML = ''; // Clear existing items
    let totalItems = 0;
    let totalCost = 0;

    cart.forEach(item => {
        totalItems += item.quantity;
        totalCost += item.price * item.quantity;

        const cartItemDiv = document.createElement('div');
        cartItemDiv.classList.add('cart-item');
        cartItemDiv.innerHTML = `
            <p>${item.name}</p>
            <p>₹${item.price.toFixed(2)}</p>
            <p>${item.quantity}</p>
            <p>₹${(item.price * item.quantity).toFixed(2)}</p>
            <button onclick="removeFromCart('${item.name}')">Delete</button>
        `;
        cartItemsContainer.appendChild(cartItemDiv);
    });

    totalItemsElement.textContent = totalItems;
    totalCostElement.textContent = totalCost.toFixed(2);
}

// Handle checkout process
document.getElementById('checkoutButton')?.addEventListener('click', function() {
    let totalItems = parseInt(document.getElementById('totalItems').textContent);
    if (totalItems > 0) {
        alert('Order placed successfully!');
        localStorage.removeItem('cart');
        location.reload();
    } else {
        alert('Your cart is empty!');
    }
});

// Initial render for cart page
if (document.querySelector('.cart-items')) {
    renderCart();
}

// Profile Page Handling and Editing
if (document.querySelector('#profileForm')) {
    let profile = JSON.parse(localStorage.getItem('profile')) || {};

    if (Object.keys(profile).length > 0) {
        // Populate the form with existing profile data
        document.getElementById('profileName').value = profile.name;
        document.getElementById('profileEmail').value = profile.email;
        document.getElementById('profileAddress').value = profile.address;
        document.getElementById('profileContact').value = profile.contact;
    } else {
        document.getElementById('profileMessage').textContent = 'No profile data found.';
    }

    // Handle form submission to update profile data
    document.getElementById('profileForm').addEventListener('submit', function(event) {
        event.preventDefault();

        // Update profile data in localStorage
        profile.name = document.getElementById('profileName').value;
        profile.email = document.getElementById('profileEmail').value;
        profile.address = document.getElementById('profileAddress').value;
        profile.contact = document.getElementById('profileContact').value;

        // Check if the password field is not empty, then update the password
        let newPassword = document.getElementById('profilePassword').value;
        if (newPassword) {
            profile.password = newPassword;
        }

        localStorage.setItem('profile', JSON.stringify(profile));
        document.getElementById('profileMessage').textContent = 'Profile updated successfully!';
    });
}

// Registration Form Handling
document.getElementById('registrationForm')?.addEventListener('submit', function(event) {
    event.preventDefault();
    
    let profile = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        password: document.getElementById('password').value,
        address: document.getElementById('address').value,
        contact: document.getElementById('contact').value
    };
    
    localStorage.setItem('profile', JSON.stringify(profile));
    alert('Registration successful! Please login.');
    window.location.href = 'login.html';
});

// Login Form Handling
document.getElementById('loginForm')?.addEventListener('submit', function(event) {
    event.preventDefault();

    let profile = JSON.parse(localStorage.getItem('profile'));
    let enteredId = document.getElementById('customerId').value;
    let enteredPassword = document.getElementById('loginPassword').value;

    if (profile && enteredId === profile.name && enteredPassword === profile.password) {
        alert('Login successful!');
        window.location.href = 'index.html';
    } else {
        alert('Invalid ID or password.');
    }
});
