document.getElementById('adminLoginForm').addEventListener('submit', function(event) {
    event.preventDefault();

    // Get the input values
    const username = document.getElementById('adminUsername').value;
    const password = document.getElementById('adminPassword').value;

    // Send the login data to the API
    fetch('http://localhost:5011/api/AdminLogin/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username: username,
            password: password
        })
    })
    .then(response => {
        if (!response.ok) {
            // Handle error response
            return response.json().then(data => {
                throw new Error(data.message || 'Network response was not ok');
            });
        }
        return response.json();
    })
    .then(data => {
        // Show success message using SweetAlert
        Swal.fire({
            icon: 'success',
            title: 'Login Successful',
            text: data.message
        }).then(() => {
            // Redirect after the alert is closed
            window.location.href = 'index.html';
        });
    })
    .catch(error => {
        // Show SweetAlert for error
        Swal.fire({
            icon: 'error',
            title: 'Login Failed',
            text: error.message || 'Invalid username or password'
        });
        console.error('Error:', error);
    });
});
