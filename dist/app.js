const siteHeader = document.querySelector('#site-header');
const currentPage = location.pathname.split('/').pop() || 'index.html';

if (siteHeader) {
  const current = page => currentPage === page ? ' aria-current="page"' : '';
  siteHeader.innerHTML = `
    <nav class="nav shell" aria-label="主要導覽">
      <a class="brand" href="index.html" aria-label="Robust 羅伯斯特首頁">
        <img src="assets/brands/robust.png?v=20261024-5" alt="Robust 羅伯斯特">
      </a>
      <div class="nav-links" id="navigation">
        <a href="journey.html"${current('journey.html')}>公司介紹</a>
        <a href="traffic.html"${current('traffic.html')}>智慧交通分析</a>
        <a href="index.html#contact">聯絡我們</a>
      </div>
      <a class="button primary nav-cta" href="index.html#contact">洽詢專案<span aria-hidden="true">↗</span></a>
      <button class="menu-toggle" aria-label="展開選單" aria-expanded="false" aria-controls="navigation">☰</button>
    </nav>`;
}

const menu = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#navigation');
function setMenu(open) {
  menu?.setAttribute('aria-expanded', String(open));
  menu?.setAttribute('aria-label', open ? '收合選單' : '展開選單');
  navigation?.classList.toggle('open', open);
}
menu?.addEventListener('click', () => setMenu(menu.getAttribute('aria-expanded') !== 'true'));
document.querySelectorAll('.nav-links a').forEach(link => link.addEventListener('click', () => setMenu(false)));
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && menu?.getAttribute('aria-expanded') === 'true') {
    setMenu(false);
    menu.focus();
  }
});
document.querySelectorAll('#current-year').forEach(el => el.textContent = new Date().getFullYear());
