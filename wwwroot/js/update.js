document.getElementById('updateOrderForm').addEventListener('submit', async function (e) {
    e.preventDefault();

    const orderId = document.getElementById('orderId').value;
    const orderStatus = document.getElementById('orderStatus').value;

    try {
        const response = await fetch(`http://localhost:5011/api/UpdateOrders/${orderId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(orderStatus)
        });

        const result = await response.json();

        if (response.ok) {
            Swal.fire({
                icon: 'success',
                title: 'Order Updated',
                text: result.message
            });
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: result.message || 'An error occurred while updating the order.'
            });
        }
    } catch (error) {
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Failed to update order.'
        });
    }
});
