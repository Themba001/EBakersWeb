document.getElementById("cancelOrderForm").addEventListener("submit", async function (e) {
    e.preventDefault();
    
    const orderId = document.getElementById("cancelOrderId").value;

    if (!orderId) {
        Swal.fire("Error", "Please enter a valid Order ID.", "error");
        return;
    }

    try {
        const response = await fetch(`http://localhost:5011/api/cancelorder/${orderId}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            }
        });

        const result = await response.json();

        if (response.ok) {
            Swal.fire("Success", result.message, "success");
        } else {
            Swal.fire("Error", result.message, "error");
        }
    } catch (error) {
        Swal.fire("Error", "Failed to cancel order. Please try again later.", "error");
    }
});
