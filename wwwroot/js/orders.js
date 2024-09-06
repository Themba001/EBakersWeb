// Sample orders data
const orders = [
    { id: '001', name: 'Alice', items: 'Chocolate Cake, Vanilla Cupcake', status: 'Pending' },
    { id: '002', name: 'Bob', items: 'Red Velvet Cake', status: 'Completed' }
];

// Function to display orders
function displayOrders() {
    const ordersTable = document.getElementById('ordersTable');

    ordersTable.innerHTML = orders.map(order => `
        <tr>
            <td>${order.id}</td>
            <td>${order.name}</td>
            <td>${order.items}</td>
            <td>${order.status}</td>
            <td>
                <a href="update-order.html?orderId=${order.id}">Update</a> | 
                <a href="cancel-order.html?orderId=${order.id}">Cancel</a>
            </td>
        </tr>
    `).join('');
}

window.onload = displayOrders;
