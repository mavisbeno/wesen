// Configuration des produits
const products = [
    {
        id: 1,
        name: "Huile Nutritive Intense",
        price: 24.99,
        category: "huiles",
        image: "https://images.pexels.com/photos/4408447/pexels-photo-4408447.jpeg",
        description: "Huile riche en vitamines pour nourrir et revitaliser vos cheveux afro"
    },
    {
        id: 2,
        name: "Sérum Réparateur",
        price: 29.99,
        category: "serums",
        image: "https://images.unsplash.com/photo-1643123158622-cd757dce7cfa?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1ODB8MHwxfHNlYXJjaHwxfHxoYWlyJTIwb2lsc3xlbnwwfHx8fDE3NTA1MjA0NTR8MA&ixlib=rb-4.1.0&q=85",
        description: "Traitement intensif pour réparer les cheveux abîmés et cassants"
    },
    {
        id: 3,
        name: "Masque Hydratant Profond",
        price: 19.99,
        category: "masques",
        image: "https://images.pexels.com/photos/8467960/pexels-photo-8467960.jpeg",
        description: "Masque ultra-hydratant pour des cheveux doux et brillants"
    },
    {
        id: 4,
        name: "Crème de Coiffage",
        price: 22.99,
        category: "styling",
        image: "https://images.pexels.com/photos/4408447/pexels-photo-4408447.jpeg",
        description: "Crème définition pour sublimer vos boucles naturelles"
    },
    {
        id: 5,
        name: "Huile de Coco Bio",
        price: 18.99,
        category: "huiles",
        image: "https://images.unsplash.com/photo-1643123158622-cd757dce7cfa?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1ODB8MHwxfHNlYXJjaHwxfHxoYWlyJTIwb2lsc3xlbnwwfHx8fDE3NTA1MjA0NTR8MA&ixlib=rb-4.1.0&q=85",
        description: "Huile pure de coco pour hydrater et protéger vos cheveux"
    },
    {
        id: 6,
        name: "Masque Réparateur Intense",
        price: 26.99,
        category: "masques",
        image: "https://images.pexels.com/photos/8467960/pexels-photo-8467960.jpeg",
        description: "Masque professionnel pour cheveux très abîmés"
    }
];

// État global de l'application
let cart = JSON.parse(localStorage.getItem('wesen-cart')) || [];
let activeCategory = 'all';

// Éléments du DOM
const cartBtn = document.getElementById('cart-btn');
const cartCount = document.getElementById('cart-count');
const cartSidebar = document.getElementById('cart-sidebar');
const cartOverlay = document.getElementById('cart-overlay');
const closeCartBtn = document.getElementById('close-cart');
const cartItems = document.getElementById('cart-items');
const cartEmpty = document.getElementById('cart-empty');
const cartFooter = document.getElementById('cart-footer');
const cartTotal = document.getElementById('cart-total');
const productsGrid = document.getElementById('products-grid');
const filterBtns = document.querySelectorAll('.filter-btn');
const heroCta = document.getElementById('hero-cta');
const faqItems = document.querySelectorAll('.faq-item');

// Initialisation de l'application
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    renderProducts();
    setupEventListeners();
    setupFAQ();
    setupScrollAnimations();
}

// Configuration des événements
function setupEventListeners() {
    // Boutons du panier
    cartOverlay.addEventListener('click', closeCart);
    closeCartBtn.addEventListener('click', closeCart);
    
    // Filtres de produits
    filterBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const category = e.target.getAttribute('data-category');
            filterProducts(category);
            setActiveFilter(e.target);
        });
    });
    
    // Bouton hero CTA
    heroCta.addEventListener('click', () => {
        document.getElementById('products').scrollIntoView({ 
            behavior: 'smooth' 
        });
    });
    
    // Fermeture du panier avec Escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && !cartSidebar.classList.contains('hidden')) {
            closeCart();
        }
    });
}

// Gestion des produits
function renderProducts() {
    productsGrid.innerHTML = '';
    
    const filteredProducts = activeCategory === 'all' 
        ? products 
        : products.filter(product => product.category === activeCategory);
    
    filteredProducts.forEach(product => {
        const productCard = createProductCard(product);
        productsGrid.appendChild(productCard);
    });
}

function createProductCard(product) {
    const col = document.createElement('div');
    // col-12 = pleine largeur sur mobile, col-md-6 = 2 cartes par ligne sur tablette/desktop
    col.className = 'col-12 col-md-6';
    
    const card = document.createElement('div');
    card.className = 'product-card card h-100 overflow-hidden';
    
    card.innerHTML = `
        <div class="overflow-hidden position-relative" style="height: 250px;">
            <img 
                src="${product.image}"
                alt="${product.name}"
                class="img-fluid h-100 w-100 object-fit-cover"
                loading="lazy"
                onerror="this.src='https://via.placeholder.com/400x300/f59e0b/ffffff?text=Produit+AnnyHair'"
            />
        </div>
        <div class="card-body">
            <h3 class="card-title fw-bold mb-2">${product.name}</h3>
            <p class="card-text text-muted mb-3">${product.description}</p>
            <div class="d-flex justify-content-between align-items-center">
                <span class="text-warning fw-bold fs-4">${product.price}€</span>
                <button 
                    class="add-to-cart-btn btn gradient-bg text-white rounded-pill px-4"
                    data-product-id="${product.id}"
                >
                    Commander
                </button>
            </div>
        </div>
    `;
    
    const addBtn = card.querySelector('.add-to-cart-btn');
    addBtn.addEventListener('click', () => addToCart(product));
    
    col.appendChild(card);
    return col;
}

function filterProducts(category) {
    activeCategory = category;
    renderProducts();
}

function setActiveFilter(activeBtn) {
    filterBtns.forEach(btn => btn.classList.remove('active'));
    activeBtn.classList.add('active');
}

// Gestion du panier
function addToCart(product) {
    const existingItem = cart.find(item => item.id === product.id);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }
    
    updateCartUI();
    saveCart();
    showToast(`${product.name} ajouté au panier`, 'success');
    openCart();
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCartUI();
    saveCart();
}

function updateQuantity(productId, newQuantity) {
    if (newQuantity === 0) {
        removeFromCart(productId);
    } else {
        const item = cart.find(item => item.id === productId);
        if (item) {
            item.quantity = newQuantity;
            updateCartUI();
            saveCart();
        }
    }
}


function renderCartItems() {
    cartItems.innerHTML = '';
    
    cart.forEach(item => {
        const cartItem = createCartItem(item);
        cartItems.appendChild(cartItem);
    });
}

function createCartItem(item) {
    const cartItem = document.createElement('div');
    cartItem.className = 'cart-item d-flex align-items-center gap-3 p-3 bg-light rounded mb-3';
    
    cartItem.innerHTML = `
        <img src="${item.image}" alt="${item.name}" class="rounded" style="width: 64px; height: 64px; object-fit: cover;">
        <div class="flex-grow-1">
            <h3 class="fw-semibold mb-1">${item.name}</h3>
            <p class="text-warning fw-bold mb-0">${item.price}€</p>
        </div>
        <div class="d-flex align-items-center gap-2">
            <button class="quantity-btn decrease-btn btn btn-outline-secondary rounded-circle p-0 d-flex align-items-center justify-content-center" style="width: 32px; height: 32px;" data-product-id="${item.id}">-</button>
            <span class="fw-semibold">${item.quantity}</span>
            <button class="quantity-btn increase-btn btn btn-outline-secondary rounded-circle p-0 d-flex align-items-center justify-content-center" style="width: 32px; height: 32px;" data-product-id="${item.id}">+</button>
        </div>
        <button class="remove-btn btn btn-link text-danger p-0" data-product-id="${item.id}">
            <i class="fas fa-trash"></i>
        </button>
    `;
    
    // Ajouter les événements...
    return cartItem;
}

function openCart() {
    document.getElementById('cart-sidebar').style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function closeCart() {
    document.getElementById('cart-sidebar').style.display = 'none';
    document.body.style.overflow = 'auto';
}

function saveCart() {
    localStorage.setItem('wesen-cart', JSON.stringify(cart));
}

// Gestion de la FAQ
function setupFAQ() {
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');
        const icon = item.querySelector('.faq-icon');
        
        question.addEventListener('click', () => {
            const isOpen = !answer.classList.contains('hidden');
            
            // Fermer toutes les autres FAQ
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.querySelector('.faq-answer').classList.add('hidden');
                    otherItem.querySelector('.faq-icon').classList.remove('rotate');
                }
            });
            
            // Basculer la FAQ actuelle
            if (isOpen) {
                answer.classList.add('hidden');
                icon.classList.remove('rotate');
            } else {
                answer.classList.remove('hidden');
                icon.classList.add('rotate');
            }
        });
    });
}

// Animations au scroll
function setupScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);
    
    // Observer les éléments avec la classe fade-in-on-scroll
    document.querySelectorAll('.fade-in-on-scroll').forEach(el => {
        observer.observe(el);
    });
}

// Système de notifications toast
function showToast(message, type = 'success') {
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.innerHTML = `
        <div class="flex items-center">
            <div class="flex-shrink-0">
                ${type === 'success' ? 
                    '<svg class="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path></svg>' :
                    '<svg class="w-5 h-5 text-red-400" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd"></path></svg>'
                }
            </div>
            <div class="ml-3">
                <p class="text-sm font-medium text-gray-900">${message}</p>
            </div>
        </div>
    `;
    
    document.body.appendChild(toast);
    
    // Afficher le toast
    requestAnimationFrame(() => {
        toast.classList.add('show');
    });
    
    // Supprimer le toast après 3 secondes
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => {
            document.body.removeChild(toast);
        }, 300);
    }, 3000);
}

// Gestion des erreurs d'images
function handleImageError(img) {
    img.src = 'https://via.placeholder.com/400x300/f59e0b/ffffff?text=wesen';
    img.alt = 'Image non disponible';
}

// Optimisation des performances
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Fonction utilitaire pour formater les prix
function formatPrice(price) {
    return new Intl.NumberFormat('fr-FR', {
        style: 'currency',
        currency: 'EUR'
    }).format(price);
}

// Gestion du responsive
function handleResize() {
    // Fermer le panier sur mobile si la fenêtre est redimensionnée
    if (window.innerWidth > 768 && !cartSidebar.classList.contains('hidden')) {
        closeCart();
    }
}

window.addEventListener('resize', debounce(handleResize, 250));

// Gestion des erreurs globales
window.addEventListener('error', (e) => {
    console.error('Erreur JavaScript:', e.error);
    showToast('Une erreur s\'est produite. Veuillez rafraîchir la page.', 'error');
});

// Export des fonctions principales pour les tests
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        addToCart,
        removeFromCart,
        updateQuantity,
        formatPrice,
        products
    };
}