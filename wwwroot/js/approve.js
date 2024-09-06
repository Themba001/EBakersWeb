// Handle approve order form submission
document.getElementById('approveOrderForm').addEventListener('submit', function (event) {
    event.preventDefault();
    const orderId = document.getElementById('approveOrderId').value;
    alert(`Order ID ${orderId} has been approved.`);
});
