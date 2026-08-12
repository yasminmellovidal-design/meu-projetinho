// Catálogo Expandido com Fotos Reais Ilustrativas (Substitua pelos links das suas imagens)
const products = [
    // --- PHOTO CARDS BTS ---
    { id: 1, type: 'card', name: 'Photo Card Jimin - Proof Edition (Oficial)', price: 45.00, img: 'https://unsplash.com' },
    { id: 2, type: 'card', name: 'Photo Card Jungkook - Butter Concept', price: 49.90, img: 'https://unsplash.com' },
    { id: 3, type: 'card', name: 'Photo Card RM - Indigo Solo Album', price: 39.90, img: 'https://unsplash.com' },
    { id: 4, type: 'card', name: 'Photo Card V (Taehyung) - Layover Special', price: 52.00, img: 'https://unsplash.com' },
    { id: 5, type: 'card', name: 'Photo Card Suga - D-Day Tour Limited', price: 55.00, img: 'https://unsplash.com' },
    { id: 6, type: 'card', name: 'Photo Card Jin - The Astronaut', price: 42.50, img: 'https://unsplash.com' },

    // --- CULINÁRIA K-FOOD ---
    { id: 7, type: 'food', name: 'Tteokbokki Instantâneo Apimentado (Yopokki)', price: 34.90, img: 'https://unsplash.com' },
    { id: 8, type: 'food', name: 'Lamen Shin Ramyun Super Apimentado', price: 16.00, img: 'https://unsplash.com' },
    { id: 9, type: 'food', name: 'Kimchi Tradicional Fermentado (Pote 300g)', price: 38.00, img: 'https://unsplash.com' },
    { id: 10, type: 'food', name: 'Salgadinho Coreano de Lula (Saeukkang)', price: 18.50, img: 'https://unsplash.com' },
    { id: 11, type: 'food', name: 'Bebida de Uva com Pedaços Sac Sac', price: 11.00, img: 'https://unsplash.com' },
    { id: 12, type: 'food', name: 'Refrigerante Chilsung Cider Limão', price: 12.00, img: 'https://unsplash.com' }
];

let cart = [];

function renderProducts() {
    const cardGrid = document.getElementById('bts-cards');
    const foodGrid = document.getElementById('k-food');

    // Limpa os containers antes de renderizar
    cardGrid.innerHTML = '';
    foodGrid.innerHTML = '';

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
    cart.forEach((item) => {
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

function checkout() {
    if(cart.length === 0) return alert('Seu carrinho está vazio!');
    
    let number = "5500999999999"; // Ajuste para o número de WhatsApp real do seu negócio
    let message = "🌟 *Novo Pedido - K-Vibe Store* 🌟\n\nOlá! Gostaria de comprar os seguintes itens:\n\n";
    
    cart.forEach(item => {
        message += `• ${item.name} - R$ ${item.price.toFixed(2)}\n`;
    });
    
    const total = cart.reduce((acc, item) => acc + item.price, 0);
    message += `\n💰 *Total do Pedido:* R$ ${total.toFixed(2)}`;
    
    window.open(`https://wa.me{number}?text=${encodeURIComponent(message)}`, '_blank');
}

// Inicializa a vitrine de produtos
renderProducts();
