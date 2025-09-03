document.getElementById('registerForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    if (name && email && password) {
        alert('Registration functionality would be implemented here.\n\nName: ' + name + '\nEmail: ' + email);
    } else {
        alert('Please fill in all fields.');
    }
});