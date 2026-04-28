js/app.js

var products = [
  { name: 'Тормозные колодки',   price: 15000, img: 'https://avatars.mds.yandex.net/i?id=8231ec4fb7db0111866acc53dc9098209c22ca5f-9271150-images-thumbs&n=13' },
  { name: 'Аккумулятор',         price: 42000, img: 'https://avatars.mds.yandex.net/i?id=8231ec4fb7db0111866acc53dc9098209c22ca5f-9271150-images-thumbs&n=13' },
  { name: 'Масляный фильтр',     price:  3500, img: 'https://avatars.mds.yandex.net/i?id=2509796fa8e53eff7c6d10ea1f36e7f123f14951-9215608-images-thumbs&n=13' },
  { name: 'Свечи зажигания',     price:  6000, img: 'https://thumbs.dreamstime.com/b/fyra-isolerade-proppsparkwhite-25198535.jpg' },
  { name: 'Амортизатор',         price: 22000, img: 'https://static.tildacdn.com/tild6238-3534-4334-b739-313838383634/_.jpg' },
  { name: 'Фара передняя',       price: 28000, img: 'https://ir.ozone.ru/s3/multimedia-1-g/8150137612.jpg' },
  { name: 'Воздушный фильтр',    price:  4200, img: 'https://avatars.mds.yandex.net/i?id=2d72f6d9a3b636a85eb89df93facc41803ed95ad-5352587-images-thumbs&n=13' },
  { name: 'Ремень ГРМ',          price: 12500, img: 'https://avatars.mds.yandex.net/get-mpic/5253116/img_id3680789257909635024.jpeg/orig' },
  { name: 'Радиатор охлаждения', price: 32000, img: 'https://st33.stpulscen.ru/images/product/597/577/787_original.jpg' },
  { name: 'Топливный фильтр',    price:  4800, img: 'https://avatars.mds.yandex.net/get-mpic/15176965/2a000001967a47466e1ea8b00ded055ef22b/orig' },
  { name: 'Стартер',             price: 18000, img: 'https://crm.podzamenu.ru/product/image/495601' },
  { name: 'Генератор',           price: 25000, img: 'https://w7.pngwing.com/pngs/810/656/png-transparent-alternators-and-starter-motors-robert-bosch-gmbh-ampere-others-angle-electrical-wires-cable-car.png' },
  { name: 'Подшипник ступицы',   price:  9000, img: 'https://avatars.mds.yandex.net/get-mpic/5234464/img_id502272623833992160.jpeg/orig' },
  { name: 'Клапан EGR',          price:  7000, img: 'https://a.d-cd.net/tlTC_UXzXTgqf9yD7g2SKAY9r48-960.jpg' },
  { name: 'Шаровая опора',       price:  5500, img: 'https://avatars.mds.yandex.net/i?id=3a1938ae72aee1d14c3dc7d1c5c3be691476d887-5226766-images-thumbs&n=13' },
  { name: 'Сальник коленвала',   price:  6500, img: 'https://avatars.mds.yandex.net/get-mpic/4948493/2a0000018b0052a4318366c96a3dedb55ae7/orig' },
  { name: 'Цилиндр тормозной',  price: 11000, img: 'https://images.nizhparts.ru/images/catalog/50009404.jpg' },
  { name: 'Рычаг подвески',      price:  7500, img: 'https://avatars.mds.yandex.net/i?id=3ccb36190295e26499eb8fc58470a9dd_l-4076581-images-thumbs&n=13' },
  { name: 'Топливный насос',     price: 13500, img: 'https://main-cdn.sbermegamarket.ru/big1/hlr-system/1748262/100023811791b0.jpg' },
  { name: 'Пружина подвески',    price:  6000, img: 'https://avatars.mds.yandex.net/i?id=91b1e0c984f2fdb204f3df345a9f124dd0b51bdd-3826599-images-thumbs&n=13' },
  { name: 'Кожух ремня ГРМ',    price:  4200, img: 'https://avatars.mds.yandex.net/get-mpic/6340948/2a000001928b43c4d5ad4a3f05ada1e4e330/orig' },
  { name: 'Лямбда-зонд',         price:  8900, img: 'https://avatars.mds.yandex.net/get-mpic/14331733/2a00000198249a09baa7398efa1b870dd53b/orig' }
];

var cart = [];
var current = null;

/* ===== СТРАНИЦЫ ===== */
function showPage(page) {
  document.getElementById('home').classList.add('hidden');
  document.getElementById('catalog').classList.add('hidden');
  document.getElementById('contacts').classList.add('hidden');
  document.getElementById(page).classList.remove('hidden');
  var hdr = document.getElementById('homeHeader');
  hdr.style.display = (page === 'home') ? 'flex' : 'none';
  if (page === 'catalog') renderProducts();
  closeCart();
  window.scrollTo(0, 0);
}

/* ===== ТОВАРЫ ===== */
function renderProducts() {
  var box = document.getElementById('products');
  var query = document.getElementById('search').value.toLowerCase();
  var maxVal = document.getElementById('maxPrice').value;
  var maxPrice = maxVal ? parseFloat(maxVal) : Infinity;
  var html = '';
  var count = 0;
  for (var i = 0; i < products.length; i++) {
    var p = products[i];
    if (p.name.toLowerCase().indexOf(query) !== -1 && p.price <= maxPrice) {
      html += '<div class="card">'
        + '<img src="' + p.img + '" alt="' + p.name + '" loading="lazy" onerror="this.style.display=\'none\'">'
        + '<h3>' + p.name + '</h3>'
        + '<p class="price">' + p.price.toLocaleString('ru-RU') + ' ₸</p>'
        + '<button onclick="openModal(' + i + ')">Купить</button>'
        + '</div>';
      count++;
    }
  }
  if (count === 0) {
    html = '<p style="text-align:center;color:#888;padding:40px;grid-column:1/-1">Товары не найдены</p>';
  }
  box.innerHTML = html;
}

/* ===== МОДАЛКА ===== */
function openModal(idx) {
  current = idx;
  var p = products[idx];
  document.getElementById('modalImg').src = p.img;
  document.getElementById('modalTitle').innerText = p.name;
  document.getElementById('modalPrice').innerText = p.price.toLocaleString('ru-RU') + ' ₸';
  document.getElementById('modal').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  document.getElementById('modal').classList.remove('open');
  document.body.style.overflow = '';
  current = null;
}

/* ===== КОРЗИНА ===== */
function addToCart() {
  if (current === null) return;
  var item = products[current];
  cart.push({ name: item.name, price: item.price });
  renderCart();
  closeModal();
  showToast('✅ ' + item.name + ' добавлен в корзину');
}

function removeFromCart(idx) {
  cart.splice(idx, 1);
  renderCart();
}

function renderCart() {
  var itemsEl = document.getElementById('cartItems');
  var totalEl = document.getElementById('cartTotal');
  var countEl = document.getElementById('cartCount');
  if (cart.length === 0) {
    countEl.style.display = 'none';
    itemsEl.innerHTML = '<p class="cart-empty">🛒 Корзина пуста</p>';
    totalEl.innerText = '';
    return;
  }
  countEl.style.display = 'inline';
  countEl.innerText = cart.length;
  var html = '';
  var total = 0;
  for (var i = 0; i < cart.length; i++) {
    total += cart[i].price;
    html += '<div class="cart-item">'
      + '<span class="cart-item-name">' + cart[i].name + '</span>'
      + '<span class="cart-item-price">' + cart[i].price.toLocaleString('ru-RU') + ' ₸</span>'
      + '<button class="cart-item-remove" onclick="removeFromCart(' + i + ')">×</button>'
      + '</div>';
  }
  itemsEl.innerHTML = html;
  totalEl.innerText = 'Итого: ' + total.toLocaleString('ru-RU') + ' ₸';
}

function toggleCart() {
  var cartEl = document.getElementById('cart');
  var overlayEl = document.getElementById('cartOverlay');
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

/* ===== WHATSAPP ===== */
function orderWhatsApp() {
  if (cart.length === 0) { showToast('⚠️ Корзина пуста'); return; }
  var text = '';
  var total = 0;
  for (var i = 0; i < cart.length; i++) {
    text += cart[i].name + ' — ' + cart[i].price.toLocaleString('ru-RU') + ' ₸%0A';
    total += cart[i].price;
  }
  text += '%0AИтого: ' + total.toLocaleString('ru-RU') + ' ₸';
  window.open('https://wa.me/77771234567?text=Заказ:%0A' + text);
}

function payOnline() {
  alert('Онлайн-оплата подключается через Kaspi / Stripe (нужен сервер)');
}

/* ===== TOAST ===== */
var toastTimer;
function showToast(msg) {
  var t = document.getElementById('toast');
  t.innerText = msg;
  t.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(function() { t.classList.remove('show'); }, 2500);
}

/* ===== INIT ===== */
window.onload = function() {
  renderCart();

  document.getElementById('modal').addEventListener('click', function(e) {
    if (e.target === this) closeModal();
  });

  document.getElementById('cartOverlay').addEventListener('click', function() {
    closeCart();
  });

  var cartEl = document.getElementById('cart');
  var startY = 0;
  cartEl.addEventListener('touchstart', function(e) {
    startY = e.touches[0].clientY;
  }, { passive: true });
  cartEl.addEventListener('touchend', function(e) {
    if (e.changedTouches[0].clientY - startY > 80) closeCart();
  }, { passive: true });
};