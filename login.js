// login.js

const users = JSON.parse(localStorage.getItem('users')) || [];

function addUser(name, email, password) {
    users.push({ name, email, password });
    localStorage.setItem('users', JSON.stringify(users));
}
addUser('John', 'john@example.com', 'password123');

function login(email, password) {
    const user = users.find(u => u.email === email && u.password === password);
    return user;
}

document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('[tag="regLogForm"]');
    const notification = document.getElementById('notification');

    if (form) {
        form.addEventListener('submit', (event) => {
            event.preventDefault();

            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;

            if (form.id === 'registrationForm') {
                // Если это форма регистрации
                const name = document.getElementById('name').value;
                addUser(name, email, password);
                notification.textContent = 'Вы зарегистрировались!';
            } else {
                // В противном случае, это форма входа
                const user = login(email, password);
                if (user) {
                    notification.textContent = 'Вы вошли!';
                } else {
                    notification.textContent = 'Такого пользователя нет';
                }
            }
        });
    }
});


