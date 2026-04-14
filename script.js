/* THREZO E-commerce SPA using localStorage for products, cart, and orders */
const APP = document.getElementById('app');
const CART_COUNT = document.getElementById('cartCount');
const NAV_LINKS = document.getElementById('navLinks');
const MENU_TOGGLE = document.getElementById('menuToggle');

const WHATSAPP_NUMBER = '919000000000';
const STORAGE_KEYS = {
  products: 'threzo_products',
  cart: 'threzo_cart',
  orders: 'threzo_orders'
};

const sampleProducts = [
  {
    id: 'p1',
    name: 'Noir Crest Embroidered Hoodie',
    price: 2499,
    image:
      'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=1200&q=80',
    description: 'Heavyweight black hoodie with tonal crest embroidery and premium brushed fleece lining.'
  },
  {
    id: 'p2',
    name: 'Ivory Script Oversized Tee',
    price: 1499,
    image:
      'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&w=1200&q=80',
    description: 'Soft cotton oversized t-shirt with chest script embroidery for minimal everyday styling.'
  },
  {
    id: 'p3',
    name: 'Signature Thread Cargo Shirt',
    price: 2199,
    image:
      'https://images.unsplash.com/photo-1594938328870-9623159c8c99?auto=format&fit=crop&w=1200&q=80',
    description: 'Relaxed fit utility shirt featuring geometric embroidery on flap pockets and sleeve.'
  },
  {
    id: 'p4',
    name: 'Midnight Monogram Sweatshirt',
    price: 2299,
    image:
      'https://images.unsplash.com/photo-1618354691792-d1d42acfd860?auto=format&fit=crop&w=1200&q=80',
    description: 'Premium loopback sweatshirt with raised THREZO monogram embroidery.'
  },
  {
    id: 'p5',
    name: 'Heritage Embroidered Denim Jacket',
    price: 3299,
    image:
      'https://images.unsplash.com/photo-1495105787522-5334e3ffa0ef?auto=format&fit=crop&w=1200&q=80',
    description: 'Washed denim jacket with detailed floral linework stitched on back panel.'
  },
  {
    id: 'p6',
    name: 'Satin Stitch Co-ord Set',
    price: 3699,
    image:
      'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1200&q=80',
    description: 'Street-luxe co-ord with clean silhouette and satin stitch accents.'
  },
  {
    id: 'p7',
    name: 'Obsidian Embroidered Joggers',
    price: 1899,
    image:
      'https://images.unsplash.com/photo-1562158070-57a95637a9b5?auto=format&fit=crop&w=1200&q=80',
    description: 'Tapered joggers with side seam logo embroidery and premium ribbed cuffs.'
  },
  {
    id: 'p8',
    name: 'Celestial Back-Stitch Bomber',
    price: 3999,
    image:
      'https://images.unsplash.com/photo-1556906781-9a412961c28c?auto=format&fit=crop&w=1200&q=80',
    description: 'Statement bomber jacket with cosmic-inspired back embroidery and matte hardware.'
  }
];

function getData(key, fallback = []) {
  const raw = localStorage.getItem(key);
  return raw ? JSON.parse(raw) : fallback;
}

function setData(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

function money(value) {
  return `₹${value.toLocaleString('en-IN')}`;
}

function ensureProducts() {
  const products = getData(STORAGE_KEYS.products);
  if (!products.length) setData(STORAGE_KEYS.products, sampleProducts);
}

function getProducts() {
  return getData(STORAGE_KEYS.products, sampleProducts);
}

function getCart() {
  return getData(STORAGE_KEYS.cart, []);
}

function saveCart(cart) {
  setData(STORAGE_KEYS.cart, cart);
  updateCartCount();
}

function updateCartCount() {
  const count = getCart().reduce((sum, item) => sum + item.quantity, 0);
  CART_COUNT.textContent = count;
}

function addToCart(productId) {
  const cart = getCart();
  const found = cart.find((item) => item.id === productId);
  if (found) found.quantity += 1;
  else cart.push({ id: productId, quantity: 1 });
  saveCart(cart);
  alert('Added to cart');
}

function removeFromCart(productId) {
  const cart = getCart().filter((item) => item.id !== productId);
  saveCart(cart);
  renderRoute();
}

function updateQty(productId, quantity) {
  const cart = getCart().map((item) =>
    item.id === productId ? { ...item, quantity: Math.max(1, Number(quantity) || 1) } : item
  );
  saveCart(cart);
  renderRoute();
}

function buildWhatsAppLink({ name = 'Customer', cartItems, total }) {
  const lines = [
    'Hi THREZO, I want to place an order:',
    ...cartItems.map((item) => `- ${item.name} x${item.quantity} = ${money(item.price * item.quantity)}`),
    `Total: ${money(total)}`,
    `Customer: ${name}`
  ];
  const text = encodeURIComponent(lines.join('\n'));
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${text}`;
}

function productCard(product) {
  return `
    <article class="product-card">
      <img src="${product.image}" alt="${product.name}" loading="lazy"/>
      <div class="product-body">
        <h3>${product.name}</h3>
        <p class="price">${money(product.price)}</p>
        <div style="display:flex; gap:.5rem; flex-wrap:wrap;">
          <a class="btn btn-outline" href="#product-${product.id}">View</a>
          <button class="btn" onclick="addToCart('${product.id}')">Add to Cart</button>
        </div>
      </div>
    </article>
  `;
}

function renderHome() {
  const products = getProducts().slice(0, 4);
  APP.innerHTML = `
    <section class="hero section">
      <div class="container">
        <h1>THREZO</h1>
        <p>Stitched to Stand Out — premium embroidered clothing designed for your bold everyday aesthetic.</p>
        <a href="#shop" class="btn">Shop Collection</a>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <div class="heading">
          <h2>Featured Embroidery Drops</h2>
          <p>Clean silhouettes. Detailed stitches. Elevated streetwear essentials.</p>
        </div>
        <div class="grid products-grid">
          ${products.map(productCard).join('')}
        </div>
      </div>
    </section>
  `;
}

function renderShop() {
  const products = getProducts();
  APP.innerHTML = `
    <section class="section">
      <div class="container">
        <div class="heading">
          <h2>Shop THREZO</h2>
          <p>Discover premium embroidered pieces tailored for Gen Z and young adults.</p>
        </div>
        <div class="grid products-grid">
          ${products.map(productCard).join('')}
        </div>
      </div>
    </section>
  `;
}

function renderProductDetail(productId) {
  const product = getProducts().find((p) => p.id === productId);
  if (!product) {
    APP.innerHTML = `<section class="section"><div class="container"><p>Product not found.</p></div></section>`;
    return;
  }

  APP.innerHTML = `
    <section class="section">
      <div class="container">
        <div class="product-detail">
          <img src="${product.image}" alt="${product.name}" />
          <div>
            <p class="note">Premium embroidery craftsmanship by THREZO.</p>
            <h2>${product.name}</h2>
            <p class="price">${money(product.price)}</p>
            <p>${product.description}</p>
            <br/>
            <button class="btn" onclick="addToCart('${product.id}')">Add to Cart</button>
            <a class="btn btn-outline" href="#shop">Back to Shop</a>
          </div>
        </div>
      </div>
    </section>
  `;
}

function getCartItemsExpanded() {
  const products = getProducts();
  return getCart().map((item) => {
    const product = products.find((p) => p.id === item.id);
    return { ...product, quantity: item.quantity, subtotal: product.price * item.quantity };
  });
}

function renderCart() {
  const cartItems = getCartItemsExpanded();
  const total = cartItems.reduce((sum, item) => sum + item.subtotal, 0);

  APP.innerHTML = `
    <section class="section">
      <div class="container">
        <div class="heading"><h2>Your Cart</h2></div>
        <div class="card">
          ${
            cartItems.length
              ? cartItems
                  .map(
                    (item) => `
                <div class="cart-item">
                  <img src="${item.image}" alt="${item.name}"/>
                  <div>
                    <h3>${item.name}</h3>
                    <p class="price">${money(item.price)}</p>
                    <label>
                      Qty:
                      <input
                        class="input"
                        style="max-width:100px; margin-top:.3rem;"
                        type="number"
                        min="1"
                        value="${item.quantity}"
                        onchange="updateQty('${item.id}', this.value)"
                      />
                    </label>
                  </div>
                  <div>
                    <p>${money(item.subtotal)}</p>
                    <button class="btn btn-outline" onclick="removeFromCart('${item.id}')">Remove</button>
                  </div>
                </div>
              `
                  )
                  .join('')
              : '<p>Your cart is empty.</p>'
          }
          <hr style="margin:1rem 0; border:none; border-top:1px solid var(--border);"/>
          <h3>Total: ${money(total)}</h3>
          <br/>
          <div style="display:flex; gap:.7rem; flex-wrap:wrap;">
            <a href="#checkout" class="btn">Proceed to Checkout</a>
            <a class="btn btn-whatsapp" target="_blank" href="${buildWhatsAppLink({
              cartItems,
              total
            })}">Order via WhatsApp</a>
          </div>
        </div>
      </div>
    </section>
  `;
}

function renderCheckout() {
  const cartItems = getCartItemsExpanded();
  const total = cartItems.reduce((sum, item) => sum + item.subtotal, 0);
  APP.innerHTML = `
    <section class="section">
      <div class="container">
        <div class="heading"><h2>Checkout</h2></div>
        <div class="grid admin-grid">
          <form class="card" id="checkoutForm">
            <h3>Customer Details</h3>
            <input class="input" required name="name" placeholder="Full Name" />
            <input class="input" required name="phone" placeholder="Phone Number" />
            <textarea required name="address" placeholder="Address"></textarea>
            <button class="btn" type="submit">Place Order</button>
            <a class="btn btn-whatsapp" target="_blank" id="waCheckout" href="#">Order via WhatsApp</a>
            <div id="checkoutMessage"></div>
          </form>

          <div class="card">
            <h3>Order Summary</h3>
            ${
              cartItems.length
                ? `<ul>${cartItems
                    .map((item) => `<li>${item.name} x${item.quantity} - ${money(item.subtotal)}</li>`)
                    .join('')}</ul><hr style="margin:1rem 0; border:none; border-top:1px solid var(--border);"/>`
                : '<p>No items in cart.</p>'
            }
            <p><strong>Total: ${money(total)}</strong></p>
          </div>
        </div>
      </div>
    </section>
  `;

  const form = document.getElementById('checkoutForm');
  const msg = document.getElementById('checkoutMessage');
  const wa = document.getElementById('waCheckout');

  wa.href = buildWhatsAppLink({ cartItems, total });

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (!cartItems.length) {
      msg.innerHTML = '<p class="note">Add products before placing an order.</p>';
      return;
    }

    const formData = new FormData(form);
    const order = {
      id: `ORD-${Date.now()}`,
      date: new Date().toISOString(),
      customer: {
        name: formData.get('name'),
        phone: formData.get('phone'),
        address: formData.get('address')
      },
      items: cartItems,
      total
    };

    const orders = getData(STORAGE_KEYS.orders, []);
    orders.push(order);
    setData(STORAGE_KEYS.orders, orders);

    msg.innerHTML = `
      <div class="success">
        <p><strong>Order placed successfully</strong></p>
        <p>Order ID: ${order.id}</p>
        <p>Name: ${order.customer.name}</p>
        <p>Total: ${money(order.total)}</p>
      </div>
    `;

    saveCart([]);
    form.reset();
  });
}

function renderAdmin() {
  const products = getProducts();

  APP.innerHTML = `
    <section class="section">
      <div class="container">
        <div class="heading"><h2>Admin Panel</h2><p>Manage THREZO catalog (localStorage simulated database).</p></div>
        <div class="grid admin-grid">
          <form class="card" id="adminForm">
            <h3>Add Product</h3>
            <input class="input" required name="name" placeholder="Product Name" />
            <input class="input" required name="price" type="number" min="1" placeholder="Price" />
            <input class="input" required name="image" placeholder="Image URL" />
            <textarea required name="description" placeholder="Description"></textarea>
            <button class="btn" type="submit">Add Product</button>
            <div id="adminMsg"></div>
          </form>

          <div class="card">
            <h3>All Products (${products.length})</h3>
            <div>
              ${products
                .map(
                  (p) => `
                  <div style="display:flex; justify-content:space-between; gap:.7rem; padding:.7rem 0; border-bottom:1px solid var(--border);">
                    <div>
                      <strong>${p.name}</strong>
                      <p>${money(p.price)}</p>
                    </div>
                    <button class="btn btn-outline" onclick="deleteProduct('${p.id}')">Delete</button>
                  </div>
                `
                )
                .join('')}
            </div>
          </div>
        </div>
      </div>
    </section>
  `;

  document.getElementById('adminForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const form = e.target;
    const data = new FormData(form);

    const next = {
      id: `p${Date.now()}`,
      name: data.get('name').trim(),
      price: Number(data.get('price')),
      image: data.get('image').trim(),
      description: data.get('description').trim()
    };

    const all = getProducts();
    all.push(next);
    setData(STORAGE_KEYS.products, all);

    document.getElementById('adminMsg').innerHTML = '<p class="success">Product added.</p>';
    form.reset();
    renderAdmin();
  });
}

function deleteProduct(id) {
  const updated = getProducts().filter((p) => p.id !== id);
  setData(STORAGE_KEYS.products, updated);

  const cartClean = getCart().filter((item) => item.id !== id);
  saveCart(cartClean);
  renderAdmin();
}

function renderRoute() {
  const hash = window.location.hash || '#home';

  if (hash.startsWith('#product-')) {
    renderProductDetail(hash.replace('#product-', ''));
    return;
  }

  switch (hash) {
    case '#home':
      renderHome();
      break;
    case '#shop':
      renderShop();
      break;
    case '#cart':
      renderCart();
      break;
    case '#checkout':
      renderCheckout();
      break;
    case '#admin':
      renderAdmin();
      break;
    default:
      renderHome();
  }
}

MENU_TOGGLE.addEventListener('click', () => {
  NAV_LINKS.classList.toggle('active');
});

NAV_LINKS.addEventListener('click', (e) => {
  if (e.target.tagName === 'A') NAV_LINKS.classList.remove('active');
});

window.addEventListener('hashchange', renderRoute);

ensureProducts();
updateCartCount();
renderRoute();

window.addToCart = addToCart;
window.removeFromCart = removeFromCart;
window.updateQty = updateQty;
window.deleteProduct = deleteProduct;
