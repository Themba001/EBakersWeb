document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('customizeForm').addEventListener('submit', function(e) {
        e.preventDefault();  // Prevent form from submitting traditionally
        
        // Capture form data
        const cakeType = document.getElementById('cakeType').value;
        const design = document.getElementById('design').value;
        const layers = document.getElementById('flavor').value;
        const icing = document.getElementById('icing').value;
        const icingColor = document.getElementById('color').value;
        const veganOption = document.getElementById('vegan').checked;

        const price = 150;
        const deliveryFee = 50;

        const orderDetails = {
            cakeType,
            design,
            layers,
            icing,
            icingColor,
            veganOption,
            price,
            deliveryFee,
            quantity: 1
        };

        // SweetAlert confirmation before submission
        Swal.fire({
            title: 'Confirm Your Order',
            html: `
                <p><strong>Cake Type:</strong> ${cakeType}</p>
                <p><strong>Design:</strong> ${design}</p>
                <p><strong>Layers:</strong> ${layers}</p>
                <p><strong>Icing Type:</strong> ${icing}</p>
                <p><strong>Icing Color:</strong> <span style="background-color:${icingColor}; padding: 2px 10px;"></span></p>
                <p><strong>Vegan Option:</strong> ${veganOption ? 'Yes' : 'No'}</p>
                <p><strong>Total Price:</strong> R${(price + deliveryFee).toFixed(2)}</p>
            `,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Confirm',
            cancelButtonText: 'Cancel'
        }).then((result) => {
            if (result.isConfirmed) {
                // Save the order to localStorage
                const cartItems = JSON.parse(localStorage.getItem('cakeOrder')) || [];
                cartItems.push(orderDetails);
                localStorage.setItem('cakeOrder', JSON.stringify(cartItems));

                // Redirect to cart page after successful confirmation
                Swal.fire({
                    title: 'Success!',
                    text: 'Your order has been added to the cart!',
                    icon: 'success',
                    confirmButtonText: 'Go to Cart'
                }).then(() => {
                    window.location.href = 'cart.html';
                });
            }
        });
    });
});
