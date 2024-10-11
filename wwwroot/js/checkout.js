document.getElementById('checkoutForm').addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent the form from submitting traditionally

    // Get form data
    const firstName = document.getElementById('firstName').value;
    const surname = document.getElementById('surname').value;
    const phone = document.getElementById('phone').value;
    const email = document.getElementById('email').value;
    const deliveryOption = document.getElementById('deliveryOption').value;
    const address = document.getElementById('address').value;

    // Simple validation (can add more specific checks if necessary)
    if (!validateEmail(email)) {
        Swal.fire({
            icon: 'error',
            title: 'Invalid Email',
            text: 'Please enter a valid email address.',
        });
        return;
    }

    // Retrieve cart total from localStorage
    const cartItems = JSON.parse(localStorage.getItem('cakeOrder')) || [];
    let totalAmount = cartItems.reduce((total, item) => total + (item.price * (item.quantity || 1)), 0);
    const deliveryFee = cartItems.length > 0 ? 50 : 0; // Add delivery fee if cart is not empty
    totalAmount += deliveryFee;

    // Prepare order data
    const orderData = {
        customerID: 1, 
        firstName,
        surname,
        phone,
        email,
        deliveryOption,
        address,
        total: totalAmount,
        orderNumber: generateOrderNumber(),
        cartItems
    };

    // Show loading feedback before making the API call
    Swal.fire({
        title: 'Processing your order...',
        text: 'Please wait while we process your order.',
        allowOutsideClick: false,
        didOpen: () => {
            Swal.showLoading();
        }
    });

    // Send order data to the backend
    sendOrderToBackend(orderData);

    // Send email to the customer and admin
    sendConfirmationEmail(orderData);
});

function generateOrderNumber() {
    return Math.floor(Math.random() * 1000000); // Simple random order number generator
}

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
}

function sendOrderToBackend(orderData) {
    fetch('http://localhost:5011/api/orders', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            CustomerID: orderData.customerID,
            CustomerName: orderData.firstName,
            CustomerSurname: orderData.surname,
            PhoneNumber: orderData.phone,
            EmailAddress: orderData.email,
            Homeaddress: orderData.address,
            TotalAmount: orderData.total, // Use the calculated total amount
            CartItems: orderData.cartItems // Use the retrieved cart items
        }),
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        return response.json();
    })
    .then(data => {
        console.log('Order stored:', data);
        // Close the loading alert and show a success message
        Swal.fire({
            icon: 'success',
            title: 'Order Processed',
            text: `Thank you, ${orderData.firstName} ${orderData.surname}. Your order is being processed. We will contact you at ${orderData.email} or ${orderData.phone}.`,
        });
    })
    .catch(error => {
        console.error('Error storing order:', error);
        // Close the loading alert and show an error message
        Swal.fire({
            icon: 'error',
            title: 'Order Failed',
            text: 'There was an error processing your order. Please try again.',
        });
    });
}

function sendConfirmationEmail(orderData) {
    const emailPayload = {
        to: orderData.email,  // Email to the customer
        adminEmail: 'artinadutjoammakoma@gmail.com',  // Email to the admin
        subject: 'Your E-Bakers Order Confirmation',
        body: `Dear ${orderData.firstName} ${orderData.surname},\n\nThank you for your order!\n\nOrder Number: ${orderData.orderNumber}\nTotal: R${orderData.total}\n\nWe will notify you once your order is ready for ${orderData.deliveryOption}.`
    };

    fetch('http://localhost:5011/api/sendEmail', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(emailPayload),
    })
    .then(response => response.json())
    .then(data => console.log('Email sent to customer and admin:', data))
    .catch(error => console.error('Error sending email:', error));
}
