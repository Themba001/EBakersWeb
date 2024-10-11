document.addEventListener('DOMContentLoaded', function () {
    // Existing form submit logic
    document.getElementById('customizeForm').addEventListener('submit', function (e) {
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

    
    document.getElementById('colorHelp').addEventListener('click', function () {
        Swal.fire({
            title: 'Color Wheel Help',
            text: 'Use the color picker to select your desired icing color for the cake. Simply click on the color box to open the color wheel and choose your favorite shade.',
            icon: 'info',
            confirmButtonText: 'Got it!'
        });
    });

    
    document.getElementById('pictureHelp').addEventListener('click', function () {
        Swal.fire({
            title: 'Picture Upload Help',
            text: 'You can upload a reference picture for your cake design. Click on the "Choose File" button and select an image from your device (optional).',
            icon: 'info',
            confirmButtonText: 'Got it!'
        });
    });
});
