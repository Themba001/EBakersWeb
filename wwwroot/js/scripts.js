// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Cart Operations
const cart = JSON.parse(localStorage.getItem('cart')) || [];
const cartTable = document.querySelector('.cart-table tbody');
const totalPriceElement = document.querySelector('.total-price');

function updateCart() {
    cartTable.innerHTML = ''; // Clear current cart content
    let total = 0;
    cart.forEach((item, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${item.name}</td>
            <td>${item.price}</td>
            <td>${item.quantity}</td>
            <td><button onclick="removeFromCart(${index})">Remove</button></td>
        `;
        cartTable.appendChild(row);
        total += item.price * item.quantity;
    });
    totalPriceElement.textContent = `Total Price: R${total.toFixed(2)}`;
}

function addToCart(item) {
    const existingItem = cart.find(cartItem => cartItem.name === item.name);
    if (existingItem) {
        existingItem.quantity += item.quantity;
    } else {
        cart.push(item);
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCart();
}

function removeFromCart(index) {
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCart();
}

// Handle Order Submission
const orderForm = document.getElementById('orderForm');
if (orderForm) {
    orderForm.addEventListener('submit', function (e) {
        e.preventDefault();
        const formData = new FormData(orderForm);
        const orderSummary = document.getElementById('orderSummary');
        const orderNumber = `ORD-${Date.now()}`;
        orderSummary.innerHTML = `
            <h2>Order Summary</h2>
            <p>Order Number: <strong>${orderNumber}</strong></p>
            <p>Delivery Type: ${formData.get('delivery')}</p>
            <p>Address: ${formData.get('address') || 'N/A'}</p>
            <p>Total Price: R${totalPriceElement.textContent.split('R')[1]}</p>
            <p>Send proof of payment to our contact details and use the order number as a reference.</p>
        `;
        orderForm.reset();
        localStorage.removeItem('cart');
    });
}

// Admin Functions
const adminApproveButton = document.getElementById('approveOrder');
const adminCancelButton = document.getElementById('cancelOrder');
const adminUpdateButton = document.getElementById('updateOrder');

if (adminApproveButton) {
    adminApproveButton.addEventListener('click', function () {
        const orderNumber = prompt('Enter Order Number to Approve:');
        if (orderNumber) {
            // Replace this with real API call or database update
            alert(`Order ${orderNumber} approved.`);
        }
    });
}

if (adminCancelButton) {
    adminCancelButton.addEventListener('click', function () {
        const orderNumber = prompt('Enter Order Number to Cancel:');
        if (orderNumber) {
            // Replace this with real API call or database update
            alert(`Order ${orderNumber} cancelled.`);
        }
    });
}

if (adminUpdateButton) {
    adminUpdateButton.addEventListener('click', function () {
        const orderNumber = prompt('Enter Order Number to Update:');
        if (orderNumber) {
            // Replace this with real API call or database update
            alert(`Order ${orderNumber} updated.`);
        }
    });
}
