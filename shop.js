// shop.js

import products from './data.js';

// Инициализация корзины
let cart = [];

// Функция для сохранения корзины в localStorage
function saveCartToLocalStorage() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Функция для загрузки корзины из localStorage при загрузке страницы
function loadCartFromLocalStorage() {
    const savedCart = localStorage.getItem('cart');
    cart = savedCart ? JSON.parse(savedCart) : [];
    updateCart();
}

// Функция для создания кнопки "Удалить" в корзине
function createRemoveButton(productId) {
    const removeButton = document.createElement('button');
    removeButton.textContent = 'Удалить';
    removeButton.addEventListener('click', () => removeFromCart(productId));
    return removeButton;
}

// Функция для добавления товара в корзину
function addToCart(productId) {
    const product = products.find(item => item.id === productId);
    if (product) {
        cart.push(product);
        updateCart();
        // Возвращаем кнопку "Удалить" на странице магазина
        const productCard = document.getElementById(`productCard_${productId}`);
        if (productCard) {
            const removeButton = createRemoveButton(productId);
            productCard.appendChild(removeButton);
        }
    }
}

// Функция для удаления товара из корзины
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCart();
    // Удаляем кнопку "Удалить" на странице магазина
    const productCard = document.getElementById(`productCard_${productId}`);
    if (productCard) {
        const removeButton = productCard.querySelector('button');
        if (removeButton) {
            removeButton.remove();
        }
    }
}

// Функция для обновления отображения корзины
function updateCart() {
    // Очищаем текущее отображение корзины
    const cartItemsContainer = document.getElementById('cartItems');
    const totalAmountSpan = document.getElementById('totalAmount');
    cartItemsContainer.innerHTML = '';

    // Заполняем таблицу товарами из корзины
    cart.forEach(item => {
        const row = document.createElement('tr');
        const removeButton = createRemoveButton(item.id);

        row.innerHTML = `
            <td>${item.name}</td>
            <td>$${item.price.toFixed(2)}</td>
        `;

        const cell = document.createElement('td');
        cell.appendChild(removeButton);
        row.appendChild(cell);

        cartItemsContainer.appendChild(row);
    });

    // Вычисляем общую сумму заказа
    const totalAmount = cart.reduce((sum, item) => sum + item.price, 0);
    totalAmountSpan.textContent = totalAmount.toFixed(2);

    // Сохраняем корзину в localStorage после каждого изменения
    saveCartToLocalStorage();
}

// Функция для перехода на страницу чека
function goToCheckout() {
    // Сохраняем корзину в localStorage перед переходом
    saveCartToLocalStorage();
    // Переходим на страницу чека
    window.location.href = 'checkout.html';
}

// Инициализация отображения товаров при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
    const productListContainer = document.getElementById('productList');

    products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.classList.add('product');

        const addToCartButton = document.createElement('button');
        addToCartButton.classList.add('add-to-cart');
        addToCartButton.textContent = 'Добавить в корзину';
        addToCartButton.addEventListener('click', () => addToCart(product.id));

        productCard.innerHTML = `
            <h3>${product.name}</h3>
            <p>${product.description}</p>
            <p>Цена: $${product.price.toFixed(2)}</p>
        `;

        productCard.appendChild(addToCartButton);
        productListContainer.appendChild(productCard);
    });

    // Инициализируем кнопку "Оформить заказ"
    const checkoutButton = document.getElementById('checkoutButton');
    if (checkoutButton) {
        checkoutButton.addEventListener('click', goToCheckout);
    }

    // Инициализируем корзину из localStorage
    loadCartFromLocalStorage();
    // Добавляем вызов updateCart() после инициализации товаров
    updateCart();
});
