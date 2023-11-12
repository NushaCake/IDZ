// validations.js

// Функция для проверки валидности имени
function validateName() {
    const nameInput = document.getElementById('name');
    const namePattern = /^[A-Za-zА-Яа-яЁё\s]+$/;

    if (!namePattern.test(nameInput.value)) {
        alert('Имя не должно содержать цифры.');
        return false;
    }

    return true;
}

// Функция для проверки валидности почты
function validateEmail() {
    const emailInput = document.getElementById('email');
    // Добавьте здесь дополнительные проверки для формата почты, если необходимо

    return true;
}

// Функция для проверки валидности пароля
function validatePassword() {
    const passwordInput = document.getElementById('password');
    const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]+$/;

    if (passwordInput.value.length < 8 || !passwordPattern.test(passwordInput.value)) {
        alert('Пароль должен содержать минимум 8 символов, включая как минимум одну букву и одну цифру.');
        return false;
    }

    return true;
}

// Функция для проверки валидности номера телефона
function validatePhoneNumber() {
    const phoneInput = document.getElementById('phone');
    const phonePattern = /^\d{10}$/;

    if (!phonePattern.test(phoneInput.value)) {
        alert('Некорректный номер телефона. Должно быть 10 цифр.');
        return false;
    }

    return true;
}

// Функция для проверки валидности адреса
function validateAddress() {
    const addressInput = document.getElementById('address');

    if (addressInput.value.length < 10) {
        alert('Слишком короткий адрес. Введите адрес, содержащий минимум 10 символов.');
        return false;
    }

    return true;
}

// Функция для проверки валидности номера карты
function validateCardNumber() {
    const cardInput = document.getElementById('card');
    const cardPattern = /^\d{16}$/;

    if (!cardPattern.test(cardInput.value)) {
        alert('Некорректный номер карты. Должно быть 16 цифр.');
        return false;
    }

    return true;
}

// Функция для общей валидации формы
function validateForm() {
    return (
        validateName() &&
        validateEmail() &&
        validatePassword() &&
        validatePhoneNumber() &&
        validateAddress() &&
        validateCardNumber()
    );
}
