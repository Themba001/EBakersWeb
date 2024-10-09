document.addEventListener('DOMContentLoaded', () => {
    const cartTable = document.getElementById('cartTable').getElementsByTagName('tbody')[0];
    const cartTotal = document.getElementById('cartTotal');

    // Retrieve the cart items from localStorage or fall back to an empty array
    const cartItems = JSON.parse(localStorage.getItem('cakeOrder')) || [];

    console.log("Cart Items Retrieved:", cartItems);

    function updateCart() {
        cartTable.innerHTML = ''; // Clear the table rows
        let total = 0;

        if (cartItems.length === 0) {
            const row = cartTable.insertRow();
            const emptyCell = row.insertCell(0);
            emptyCell.colSpan = 5;
            emptyCell.textContent = 'No items in your cart';
        } else {
            cartItems.forEach((item, index) => {
                const row = cartTable.insertRow();
                row.insertCell(0).textContent = item.cakeType || 'Unknown';
                row.insertCell(1).textContent = `R${item.price.toFixed(2)}`;
                row.insertCell(2).textContent = item.quantity || 1;
                row.insertCell(3).textContent = `R${(item.price * (item.quantity || 1)).toFixed(2)}`;
                const removeCell = row.insertCell(4);
                removeCell.innerHTML = `<button onclick="removeItem(${index})">Remove</button>`;

                total += item.price * (item.quantity || 1); // Add cake price to total
            });
        }

        // Add the fixed delivery fee if cart is not empty
        const deliveryFee = cartItems.length > 0 ? 50 : 0;
        total += deliveryFee;

        // Update the cart total
        cartTotal.textContent = `R${total.toFixed(2)}`;
    }

    // Remove item from cart
    window.removeItem = (index) => {
        console.log("Removing item at index:", index);

        cartItems.splice(index, 1); // Remove the item from the array
        localStorage.setItem('cakeOrder', JSON.stringify(cartItems)); // Update localStorage
        console.log("Cart Items After Removal:", cartItems);
        updateCart(); // Refresh the cart
    };

    updateCart(); // Initialize cart on page load

    // SweetAlert for Proceed to Checkout button
    window.proceedToCheckout = () => {
        if (cartItems.length === 0) {
            Swal.fire({
                icon: 'warning',
                title: 'Cart is empty',
                text: 'Please add some items to your cart before proceeding to checkout.',
            });
        } else {
            Swal.fire({
                title: 'Proceed to Checkout?',
                text: `Your total is ${cartTotal.textContent}. Are you sure you want to proceed?`,
                icon: 'question',
                showCancelButton: true,
                confirmButtonText: 'Yes, Proceed',
                cancelButtonText: 'Cancel'
            }).then((result) => {
                if (result.isConfirmed) {
                    // Send order to backend
                    window.location.href = 'checkout.html';
                }
            });
        }
    };
});
