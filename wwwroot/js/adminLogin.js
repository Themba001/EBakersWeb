document.getElementById('adminLoginForm').addEventListener('submit', function(event) {
    event.preventDefault();

    // Get the input values
    const username = document.getElementById('adminUsername').value;
    const password = document.getElementById('adminPassword').value;

    // Send the login data to the API
    fetch('https://localhost:7181/api/admin/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username: username,
            password: password
        })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            // Redirect or show success message
            window.location.href = 'index.html';

            
        } else {
            alert('Invalid username or password');
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
});
