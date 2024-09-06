document.addEventListener('DOMContentLoaded', () => {
    const cartTable = document.getElementById('cartTable').getElementsByTagName('tbody')[0];
    const cartTotal = document.getElementById('cartTotal');

    const cartItems = [
        { name: 'Chocolate Cake', price: 150.00, quantity: 2 },
        { name: 'Vanilla Cake', price: 120.00, quantity: 1 },
    ];

    function updateCart() {
        cartTable.innerHTML = '';

        let total = 0;

        cartItems.forEach((item, index) => {
            const row = cartTable.insertRow();
            row.insertCell(0).textContent = item.name;
            row.insertCell(1).textContent = `R${item.price.toFixed(2)}`;
            row.insertCell(2).textContent = item.quantity;
            row.insertCell(3).textContent = `R${(item.price * item.quantity).toFixed(2)}`;
            const removeCell = row.insertCell(4);
            removeCell.innerHTML = `<button onclick="removeItem(${index})">Remove</button>`;

            total += item.price * item.quantity + 50;
        });

        cartTotal.textContent = total.toFixed(2);
    }

    window.removeItem = (index) => {
        cartItems.splice(index, 1);
        updateCart();
    }

    updateCart();
});
