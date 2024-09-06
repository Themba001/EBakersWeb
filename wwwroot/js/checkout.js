document.addEventListener('DOMContentLoaded', () => {
    const checkoutForm = document.getElementById('checkout');

    checkoutForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const name = document.getElementById('name').value;
        const address = document.getElementById('address').value;
        const paymentMethod = document.getElementById('paymentMethod').value;

        if (name && address && paymentMethod) {
            alert('Order placed successfully!');
            checkoutForm.reset();
        } else {
            alert('Please fill in all required fields.');
        }
    });
});
