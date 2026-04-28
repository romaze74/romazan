js/app.js

/* ========== DATA ========== */
const products = [
  { name: 'Тормозные колодки',   price: 15000, img: 'img/brake-pads.jpg' },
  { name: 'Аккумулятор',         price: 42000, img: 'https://avatars.mds.yandex.net/i?id=8231ec4fb7db0111866acc53dc9098209c22ca5f-9271150-images-thumbs&n=13' },
  { name: 'Масляный фильтр',     price:  3500, img: 'https://avatars.mds.yandex.net/i?id=2509796fa8e53eff7c6d10ea1f36e7f123f14951-9215608-images-thumbs&n=13' },
  { name: 'Свечи зажигания',     price:  6000, img: 'https://thumbs.dreamstime.com/b/fyra-isolerade-proppsparkwhite-25198535.jpg' },
  { name: 'Амортизатор',         price: 22000, img: 'https://static.tildacdn.com/tild6238-3534-4334-b739-313838383634/_.jpg' },
  { name: 'Фара передняя',       price: 28000, img: 'https://ir.ozone.ru/s3/multimedia-1-g/8150137612.jpg' },
  { name: 'Воздушный фильтр',    price:  4200, img: 'https://avatars.mds.yandex.net/i?id=2d72f6d9a3b636a85eb89df93facc41803ed95ad-5352587-images-thumbs&n=13' },
  { name: 'Ремень ГРМ',          price: 12500, img: 'https://avatars.mds.yandex.net/get-mpic/5253116/img_id3680789257909635024.jpeg/orig' },
  { name: 'Радиатор охлаждения', price: 32000, img: 'https://st33.stpulscen.ru/images/product/597/577/787_original.jpg' },
  { name: 'Топливный фильтр',    price:  4800, img: 'https://avatars.mds.yandex.net/get-mpic/15176965/2a000001967a47466e1ea8b00ded055ef22b/orig' },
  { name: 'Стартер',             price: 18000, img: 'https://crm.podzamenu.ru/product/image/495601?wm=&warranty=&border=&backgroud=&is_sale=&is_stock=' },
  { name: 'Генератор',           price: 25000, img: 'https://w7.pngwing.com/pngs/810/656/png-transparent-alternators-and-starter-motors-robert-bosch-gmbh-ampere-others-angle-electrical-wires-cable-car.png' },
  { name: 'Подшипник ступицы',   price:  9000, img: 'https://avatars.mds.yandex.net/get-mpic/5234464/img_id502272623833992160.jpeg/orig' },
  { name: 'Клапан EGR',          price:  7000, img: 'https://a.d-cd.net/tlTC_UXzXTgqf9yD7g2SKAY9r48-960.jpg' },
  { name: 'Шаровая опора',       price:  5500, img: 'https://avatars.mds.yandex.net/i?id=3a1938ae72aee1d14c3dc7d1c5c3be691476d887-5226766-images-thumbs&n=13' },
  { name: 'Сальник коленвала',   price:  6500, img: 'https://avatars.mds.yandex.net/get-mpic/4948493/2a0000018b0052a4318366c96a3dedb55ae7/orig' },
  { name: 'Цилиндр тормозной',  price: 11000, img: 'https://images.nizhparts.ru/images/catalog/50009404.jpg?1637301464' },
  { name: 'Рычаг подвески',      price:  7500, img: 'https://avatars.mds.yandex.net/i?id=3ccb36190295e26499eb8fc58470a9dd_l-4076581-images-thumbs&n=13' },
  { name: 'Топливный насос',     price: 13500, img: 'https://main-cdn.sbermegamarket.ru/big1/hlr-system/1748262/100023811791b0.jpg' },
  { name: 'Пружина подвески',    price:  6000, img: 'https://avatars.mds.yandex.net/i?id=91b1e0c984f2fdb204f3df345a9f124dd0b51bdd-3826599-images-thumbs&n=13' },
  { name: 'Кожух ремня ГРМ',    price:  4200, img: 'https://avatars.mds.yandex.net/get-mpic/6340948/2a000001928b43c4d5ad4a3f05ada1e4e330/orig' },
  { name: 'Лямбда-зонд',         price:  8900, img: 'https://avatars.mds.yandex.net/get-mpic/14331733/2a00000198249a09baa7398efa1b870dd53b/orig' }
];

/* ========== STATE ========== */
let cart    = [];
let current = null;

/* ========== PAGES ========== */
function showPage(page) {
  ['home', 'catalog', 'contacts'].forEach(id => {
    document.getElementById(id).classList.add('hidden');
  });
  document.getElementById(page).classList.remove('hidden');
  document.getElementById('homeHeader').style.display = (page === 'home') ? 'flex' : 'none';
  if (page === 'catalog') renderProducts();
  closeCart();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

/* ========== PRODUCTS ========== */
function renderProducts() {
  const box      = document.getElementById('products');
  const query    = document.getElementById('search').value.toLowerCase();
  const maxPrice = parseFloat(document.getElementById('maxPrice').value) || Infinity;

  const filtered = products.filter(p =>
    p.name.toLowerCase().includes(query) && p.price <= maxPrice
  );

  if (filtered.length === 0) {
    box.innerHTML = '<p style="grid-column:1/-1;text-align:center;color:#888;padding:40px">Товары не найдены</p>';
    return;
  }

  box.innerHTML = filtered.map(p => `
    <div class="card">
      <img src="${p.img}" alt="${p.name}" loading="lazy" onerror="this.src='img/no-image.png'">
      <h3>${p.name}</h3>
      <p class="price">${p.price.toLocaleString('ru-RU')} ₸</p>
      <button onclick="openModal(${products.indexOf(p)})">Купить</button>
    </div>
  `).join('');
}

/* ========== MODAL ========== */
function openModal(idx) {
  current = idx;
  const p = products[idx];
  document.getElementById('modalTitle').textContent = p.name;
  document.getElementById('modalPrice').textContent = p.price.toLocaleString('ru-RU') + ' ₸';
  document.getElementById('modalImg').src = p.img;
  document.getElementById('modal').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  document.getElementById('modal').classList.remove('open');
  document.body.style.overflow = '';
  current = null;
}

/* ========== CART ========== */
function addToCart() {
  if (current === null) return;
  const item = products[current];
  cart.push({ ...item });
  renderCart();
  closeModal();
  showToast(`✅ «${item.name}» добавлен в корзину`);
}

function removeFromCart(idx) {
  cart.splice(idx, 1);
  renderCart();
}

function renderCart() {
  const itemsEl = document.getElementById('cartItems');
  const totalEl = document.getElementById('cartTotal');
  const countEl = document.getElementById('cartCount');

  countEl.style.display = cart.length ? 'inline' : 'none';
  countEl.textContent   = cart.length;

  if (cart.length === 0) {
    itemsEl.innerHTML   = '<p class="cart-empty">🛒 Корзина пуста</p>';
    totalEl.textContent = '';
    return;
  }

  itemsEl.innerHTML = cart.map((c, i) => `
    <div class="cart-item">
      <span class="cart-item-name">${c.name}</span>
      <span class="cart-item-price">${c.price.toLocaleString('ru-RU')} ₸</span>
      <button class="cart-item-remove" onclick="removeFromCart(${i})" title="Удалить">×</button>
    </div>
  `).join('');

  const total = cart.reduce((sum, c) => sum + c.price, 0);
  totalEl.textContent = 'Итого: ' + total.toLocaleString('ru-RU') + ' ₸';
}

function toggleCart() {
  const cartEl    = document.getElementById('cart');
  const overlayEl = document.getElementById('cartOverlay');
  if (cartEl.classList.contains('open')) {
    closeCart();
  } else {
    cartEl.classList.add('open');
    overlayEl.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
}

function closeCart() {
  document.getElementById('cart').classList.remove('open');
  document.getElementById('cartOverlay').classList.remove('open');
  document.body.style.overflow = '';
}

/* ========== WHATSAPP & PAY ========== */
function orderWhatsApp() {
  if (cart.length === 0) {
    showToast('⚠️ Корзина пуста');
    return;
  }
  const text  = cart.map(c => `${c.name} — ${c.price.toLocaleString('ru-RU')} ₸`).join('%0A');
  const total = cart.reduce((s, c) => s + c.price, 0);
  window.open(`https://wa.me/77771234567?text=Заказ:%0A${text}%0A%0AИтого: ${total.toLocaleString('ru-RU')} ₸`);
}

function payOnline() {
  alert('Онлайн-оплата подключается через Kaspi / Stripe (нужен сервер)');
}

/* ========== TOAST ========== */
let toastTimer;
function showToast(msg) {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => t.classList.remove('show'), 2500);
}

/* ========== INIT ========== */
document.addEventListener('DOMContentLoaded', () => {

  // Закрытие модалки по тапу на фон
  document.getElementById('modal').addEventListener('click', function(e) {
    if (e.target === this) closeModal();
  });

  // Закрытие корзины по тапу на оверлей
  document.getElementById('cartOverlay').addEventListener('click', closeCart);

  // Свайп вниз для закрытия корзины
  const cartEl = document.getElementById('cart');
  let startY   = 0;
  let isDragging = false;

  cartEl.addEventListener('touchstart', function(e) {
    startY     = e.touches[0].clientY;
    isDragging = true;
  }, { passive: true });

  cartEl.addEventListener('touchmove', function(e) {
    if (!isDragging) return;
    const delta = e.touches[0].clientY - startY;
    if (delta > 0) {
      cartEl.style.transform = `translateY(${delta}px)`;
    }
  }, { passive: true });

  cartEl.addEventListener('touchend', function(e) {
    if (!isDragging) return;
    isDragging = false;
    const delta = e.changedTouches[0].clientY - startY;
    if (delta > 100) {
      // Свайп вниз больше 100px — закрываем
      cartEl.style.transform = '';
      closeCart();
    } else {
      // Возвращаем на место
      cartEl.style.transform = '';
    }
  }, { passive: true });

  // Начальный рендер корзины
  renderCart();
});


