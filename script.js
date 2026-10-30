const cookieButton = document.getElementById('cookie-button');
const cookieCount = document.getElementById('cookie-count');
const cookiesPerSecond = document.getElementById('cookies-per-second');

let cookies = 0;
let perClick = 1;
let cps = 0;

const upgrades = [
  { name: 'Mischmaschine', cost: 15, value: 1 },
  { name: 'Backofen', cost: 100, value: 8 },
  { name: 'Keksbäcker', cost: 500, value: 40 },
  { name: 'Supermarkt', cost: 2000, value: 200 },
];

function formatNumber(value) {
  return new Intl.NumberFormat('de-DE', { maximumFractionDigits: 0 }).format(value);
}

function updateStats() {
  cookieCount.textContent = `${formatNumber(cookies)} Kekse`;
  cookiesPerSecond.textContent = formatNumber(cps);
}

function addCookies(amount) {
  cookies += amount;
  updateStats();
}

cookieButton.addEventListener('click', () => {
  addCookies(perClick);
  cookieButton.classList.remove('click-anim');
  void cookieButton.offsetWidth;
  cookieButton.classList.add('click-anim');
  setTimeout(() => cookieButton.classList.remove('click-anim'), 120);
});

setInterval(() => {
  addCookies(cps);
}, 1000);

const shopCard = document.querySelector('.shop-card');

function renderShop() {
  shopCard.querySelectorAll('.shop-item').forEach((node) => node.remove());

  upgrades.forEach((upgrade) => {
    const item = document.createElement('div');
    item.className = 'shop-item';
    item.innerHTML = `
      <div class="shop-icon">🔧</div>
      <div class="shop-info">
        <div class="shop-name">${upgrade.name}</div>
        <div class="shop-price">Kosten: ${formatNumber(upgrade.cost)} Kekse</div>
      </div>
    `;

    item.addEventListener('click', () => {
      if (cookies >= upgrade.cost) {
        cookies -= upgrade.cost;
        cps += upgrade.value;
        updateStats();
        item.querySelector('.shop-price').textContent = 'Gekauft';
        item.style.pointerEvents = 'none';
        item.style.opacity = '0.75';
      }
    });

    shopCard.appendChild(item);
  });
}

renderShop();
updateStats();
