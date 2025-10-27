// Загрузка товаров при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
    loadProducts();
});

// Загрузка товаров с API
async function loadProducts(category = 'all') {
    try {
        const response = await fetch('/api/products');
        const products = await response.json();
        
        displayProducts(products, category);
    } catch (error) {
        console.error('Ошибка загрузки товаров:', error);
        displayProducts([], category);
    }
}

// Отображение товаров
function displayProducts(products, category) {
    const grid = document.getElementById('products-grid');
    
    if (products.length === 0) {
        grid.innerHTML = '<p>Товары не найдены</p>';
        return;
    }
    
    const filteredProducts = category === 'all' 
        ? products 
        : products.filter(product => product.category === category);
    
    grid.innerHTML = filteredProducts.map(product => `
        <div class="product-card">
            <div class="product-image">${product.image}</div>
            <h4>${product.name}</h4>
            <div class="price">${product.price}</div>
            <div class="category">${product.category}</div>
            <p>${product.description}</p>
        </div>
    `).join('');
}

// Фильтрация по категории
function filterCategory(category) {
    loadProducts(category);
}

// Показать форму контактов
function showContactForm() {
    document.getElementById('contactModal').style.display = 'block';
}

// Закрыть форму контактов
function closeContactForm() {
    document.getElementById('contactModal').style.display = 'none';
}

// Закрыть модальное окно при клике вне его
window.onclick = function(event) {
    const modal = document.getElementById('contactModal');
    if (event.target === modal) {
        closeContactForm();
    }
}