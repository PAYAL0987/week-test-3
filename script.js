const products = [
    { id: 1, name: 'Product-1', price: 100, quantity: 0 },
    { id: 2, name: 'Product-2', price: 200, quantity: 0 },
    { id: 3, name: 'Product-3', price: 300, quantity: 0 }
];

let cart = [];

const productContainer = document.getElementById('product-list');
const cartContainer = document.getElementById('cart-list');
const totalPriceElement = document.getElementById('total-price');

function renderProducts() {
    productContainer.innerHTML = '';
    products.forEach(product => {
        const productDiv = document.createElement('div');
        productDiv.classList.add('product');
        productDiv.innerHTML = `
            <span>${product.name}</span>
            <span>${product.price}</span>
            <div class="quantity-controls">
                <button onclick="decreaseQuantity(${product.id})">-</button>
                <span>${product.quantity}</span>
                <button onclick="increaseQuantity(${product.id})">+</button>
            </div>
        `;
        productContainer.appendChild(productDiv);
    });
}

function renderCart() {
    cartContainer.innerHTML = '';
    let total = 0;
    cart.forEach(item => {
        total += item.price * item.quantity;
        const cartItem = document.createElement('div');
        cartItem.classList.add('cart-item');
        cartItem.innerHTML = `
            <span>${item.name}</span>
            <span>${item.quantity} × ${item.price}</span>
        `;
        cartContainer.appendChild(cartItem);
    });
    totalPriceElement.textContent = total;
}

function increaseQuantity(id) {
    const product = products.find(p => p.id === id);
    product.quantity += 1;
    const cartItem = cart.find(item => item.id === id);
    if (cartItem) {
        cartItem.quantity += 1;
    } else {
        cart.push({ ...product });
    }
    renderProducts();
    renderCart();
}

function decreaseQuantity(id) {
    const product = products.find(p => p.id === id);
    if (product.quantity > 0) {
        product.quantity -= 1;
        const cartItem = cart.find(item => item.id === id);
        if (cartItem) {
            cartItem.quantity -= 1;
            if (cartItem.quantity === 0) {
                cart = cart.filter(item => item.id !== id);
            }
        }
        renderProducts();
        renderCart();
    }
}

renderProducts();