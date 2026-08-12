// Banco de dados dos produtos (substitua as imagens pelos links reais do GitHub)
const products = [
    { id: 1, type: 'card', name: 'Photo Card Jimin - Proof', price: 45.00, img: 'https://unsplash.com' },
    { id: 2, type: 'card', name: 'Photo Card Jungkook - Butter', price: 49.90, img: 'https://unsplash.com' },
    { id: 3, type: 'card', name: 'Photo Card RM - Indigo', price: 39.90, img: 'https://unsplash.com' },
    { id: 4, type: 'food', name: 'Tteokbokki Instantâneo (Copo)', price: 32.00, img: 'https://unsplash.com' },
    { id: 5, type: 'food', name: 'Lamen Coreano Shin Ramyun', price: 15.50, img: 'https://unsplash.com' },
    { id: 6, type: 'food', name: 'Bebida Coreana Chilsung Cider', price: 12.00, img: 'https://unsplash.com' }
];

let cart = [];

// Renderizar produtos nas seções corretas
function renderProducts() {
    const cardGrid = document.getElementById('bts-cards');
    const foodGrid = document.getElementById('k-food');

    products.forEach(p => {
        const html = `
            <div class="card">
                <img src="${p.img}" alt="${p.name}">
                <div class="card-info">
                    <div class="card-title">${p.name}</div>
                    <div class="card-price">R$ ${p.price.toFixed(2)}</div>
                    <button class="add-btn" onclick="addToCart(${p.id})">Adicionar ao Carrinho</button>
                </div>
            </div>
        `;
        if(p.type === 'card') cardGrid.innerHTML += html;
        if(p.type === 'food') foodGrid.innerHTML += html;
    });
}

function addToCart(id) {
    const product = products.find(p => p.id === id);
    cart.push(product);
    updateCart();
}

function updateCart() {
    document.getElementById('cart-count').innerText = cart.length;
    
    const cartItemsDiv = document.getElementById('cart-items');
    cartItemsDiv.innerHTML = '';
    
    let total = 0;
    cart.forEach((item, index) => {
        total += item.price;
        cartItemsDiv.innerHTML += `
            <div class="cart-item">
                <span>${item.name}</span>
                <strong>R$ ${item.price.toFixed(2)}</strong>
            </div>
        `;
    });
    
    document.getElementById('cart-total-val').innerText = total.toFixed(2);
}

function toggleCart() {
    const modal = document.getElementById('cart-modal');
    modal.style.display = modal.style.display === 'block' ? 'none' : 'block';
}

// Envia o pedido formatado para o WhatsApp da sua loja
function checkout() {
    if(cart.length === 0) return alert('Seu carrinho está vazio!');
    
    let number = "5500999999999"; // Digite aqui o seu número de telefone com DDD
    let message = "Olá! Gostaria de fazer o seguinte pedido na K-Vibe Store:\n\n";
    
    cart.forEach(item => {
        message += `- ${item.name} (R$ ${item.price.toFixed(2)})\n`;
    });
    
    const total = cart.reduce((acc, item) => acc + item.price, 0);
    message += `\n*Total:* R$ ${total.toFixed(2)}`;
    
    window.open(`https://wa.me{number}?text=${encodeURIComponent(message)}`, '_blank');
}

// Inicializar site
renderProducts();
