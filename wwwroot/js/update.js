// Handle update order form submission
document.getElementById('updateOrderForm').addEventListener('submit', function (event) {
    event.preventDefault();
    const orderId = document.getElementById('orderId').value;
    const orderStatus = document.getElementById('orderStatus').value;
    alert(`Order ID ${orderId} updated to ${orderStatus}`);
});
