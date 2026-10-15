/* Site behaviour. Content lives in data.js — you shouldn't need to edit this file. */

const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];
const esc = (s = '') => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);

const SECTION_NAMES = { client: 'Client work', personal: 'Personal work' };
const SECTION_PAGES = { client: 'works.html', personal: 'personal-work.html' };
const projectUrl = (p) => `project.html?p=${encodeURIComponent(p.slug)}`;
const find = (slug) => PROJECTS.find((p) => p.slug === slug);

const CHEVRON = '<svg viewBox="0 0 12 8" aria-hidden="true" focusable="false"><path d="M1 1.5 6 6.5 11 1.5" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>';
// A single azulejo tile, used as the logo mark
const MARK = '<svg class="mark" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><rect x=".5" y=".5" width="23" height="23" fill="none" stroke="currentColor"/><path d="M12 4.5 14 10l5.5 2-5.5 2-2 5.5-2-5.5L4.5 12 10 10z" fill="currentColor"/><circle cx="12" cy="12" r="1.6" fill="#faf7f0"/><path d="M.5 5.5a5 5 0 0 0 5-5M18.5.5a5 5 0 0 0 5 5M23.5 18.5a5 5 0 0 0-5 5M5.5 23.5a5 5 0 0 0-5-5" fill="none" stroke="currentColor"/></svg>';

/* =====================================================================
   Header & footer
   ===================================================================== */
function buildChrome() {
  const page = document.body.dataset.page;
  const sub = document.body.dataset.section;
  const cur = (p) => (p === page ? ' aria-current="page"' : '');
  const curSub = (s) => (page === 'works' && s === sub ? ' aria-current="page"' : '');

  const skip = document.createElement('a');
  skip.className = 'skip-link';
  skip.href = '#main';
  skip.textContent = 'Skip to main content';

  const header = document.createElement('header');
  header.className = 'site-header';
  header.innerHTML = `
    <a class="wordmark" href="index.html" aria-label="${esc(SITE.name)}, home">${MARK}<span aria-hidden="true">${esc(SITE.name)}</span></a>
    <button class="menu-btn" type="button" aria-expanded="false" aria-controls="site-nav">
      <span class="menu-icon" aria-hidden="true"><i></i><i></i><i></i></span><span class="menu-label">Menu</span>
    </button>
    <nav class="nav" id="site-nav" aria-label="Main">
      <ul>
        <li class="has-sub">
          <a class="nav-link" href="works.html"${cur('works')}>Work</a>
          <button class="sub-toggle" type="button" aria-expanded="false" aria-controls="works-menu" aria-label="Show work sections">${CHEVRON}</button>
          <ul class="sub" id="works-menu">
            <li><a href="works.html"${curSub('client')}><span class="t">Client work</span><span class="d">Branding, posters and characters</span></a></li>
            <li><a href="personal-work.html"${curSub('personal')}><span class="t">Personal work</span><span class="d">Gouache and digital painting</span></a></li>
          </ul>
        </li>
        <li><a class="nav-link" href="paintings.html"${cur('paintings')}>Paintings</a></li>
        <li><a class="nav-link" href="about.html"${cur('about')}>About</a></li>
        <li><a class="nav-link" href="art-shop.html"${cur('shop')}>Shop</a></li>
        <li class="nav-cta"><a class="btn" href="contact.html"${cur('contact')}>Contact</a></li>
      </ul>
    </nav>`;
  document.body.prepend(skip, header);
  setupMenus(header);

  const socials = SITE.socials.map((s) => `<li><a href="${esc(s.url)}" target="_blank" rel="noopener">${esc(s.name)}<span class="sr-only"> (opens in a new tab)</span></a></li>`).join('');
  const footer = document.createElement('footer');
  footer.className = 'site-footer on-ink';
  footer.innerHTML = `
    <div class="footer-band" aria-hidden="true"></div>
    <div class="wrap">
      <div class="footer-main">
        <div>
          <h2 class="display">Let’s make something <em>together.</em></h2>
          <a class="big-mail link" href="mailto:${esc(SITE.email)}">${esc(SITE.email)}</a>
        </div>
        <div class="footer-col">
          <p class="label">Work</p>
          <ul><li><a href="works.html">Client work</a></li><li><a href="personal-work.html">Personal work</a></li><li><a href="paintings.html">Paintings</a></li></ul>
        </div>
        <div class="footer-col">
          <p class="label">Studio</p>
          <ul><li><a href="about.html">About</a></li><li><a href="art-shop.html">Shop</a></li><li><a href="contact.html">Contact</a></li>${socials}</ul>
        </div>
      </div>
      <div class="footer-bottom">
        <p>© ${new Date().getFullYear()} ${esc(SITE.name)}</p>
        <p>${esc(SITE.hometown)} — Dublin</p>
      </div>
    </div>`;
  document.body.append(footer);
}

function setupMenus(header) {
  const menuBtn = $('.menu-btn', header);
  const nav = $('.nav', header);
  const label = $('.menu-label', menuBtn);
  const setMenu = (open) => {
    nav.classList.toggle('open', open);
    menuBtn.setAttribute('aria-expanded', open);
    label.textContent = open ? 'Close' : 'Menu';
    document.body.style.overflow = open ? 'hidden' : '';
  };
  menuBtn.addEventListener('click', () => setMenu(!nav.classList.contains('open')));

  const item = $('.has-sub', header);
  const toggle = $('.sub-toggle', item);
  const hoverable = window.matchMedia('(hover: hover) and (min-width: 861px)');
  let timer;
  const setSub = (open) => { item.classList.toggle('open', open); toggle.setAttribute('aria-expanded', open); };
  toggle.addEventListener('click', (e) => {
    if (e.detail > 0 && hoverable.matches) return setSub(true); // hover already opened it
    setSub(!item.classList.contains('open'));
  });
  item.addEventListener('mouseenter', () => { if (hoverable.matches) { clearTimeout(timer); setSub(true); } });
  item.addEventListener('mouseleave', () => { if (hoverable.matches) timer = setTimeout(() => setSub(false), 200); });
  item.addEventListener('focusout', (e) => { if (!item.contains(e.relatedTarget)) setSub(false); });
  document.addEventListener('click', (e) => { if (!item.contains(e.target)) setSub(false); });
  document.addEventListener('keydown', (e) => {
    if (e.key !== 'Escape') return;
    if (item.classList.contains('open')) { setSub(false); toggle.focus(); }
    else if (nav.classList.contains('open')) { setMenu(false); menuBtn.focus(); }
  });
}

/* =====================================================================
   Images
   ===================================================================== */
// Every image in images/web has a lighter 1000px copy in images/web/thumbs.
// The browser picks the thumbnail when it's sharp enough for the space and the screen,
// and only downloads the full-size file when it's actually needed.
const thumbOf = (src) => src.replace('images/web/', 'images/web/thumbs/');
function responsive(img, src, width) {
  if (src.startsWith('images/web/')) {
    img.sizes = `${Math.max(1, Math.ceil(width))}px`;
    img.srcset = `${thumbOf(src)} 1000w, ${src} 1800w`;
    // No thumbnail yet? Fall back to the full-size file instead of hiding the image.
    img.onerror = () => { img.onerror = null; img.removeAttribute('srcset'); img.removeAttribute('sizes'); img.src = src; };
  }
  img.src = src;
}
function loadImages(root = document) {
  $$('img[data-src]', root).forEach((img) => {
    responsive(img, img.dataset.src, img.parentElement.getBoundingClientRect().width || 1000);
    img.removeAttribute('data-src');
  });
}

/* =====================================================================
   Work card: every piece shown whole, on the same quiet mat
   ===================================================================== */
function card(p) {
  const meta = p.section === 'client' ? p.client : (p.medium === 'Gouache' ? 'Gouache on paper' : 'Digital painting');
  return `
    <a class="card" href="${projectUrl(p)}" data-medium="${esc(p.medium || '')}">
      <div class="mat"><img data-src="${esc(p.images[0].src)}" alt="" loading="lazy" decoding="async"></div>
      <div class="card-info">
        <div><h3>${esc(p.title)}</h3><p class="meta">${esc(meta)}</p></div>
        ${p.year ? `<span class="year">${esc(p.year)}</span>` : ''}
      </div>
    </a>`;
}

/* =====================================================================
   Home
   ===================================================================== */
const SELECTED = ['mascots', 'freshers-week', 'panda', 'gouache-cats', 'gouache-lemons', 'gouache-cable-car'];

function buildHome() {
  if (document.body.dataset.page !== 'home') return;
  const art = $('.hero-card');
  const pt = PAINTINGS[0];
  if (art && pt) {
    art.innerHTML = `<a href="paintings.html#painting-1">
      <img src="${esc(pt.src)}" alt="${esc(pt.alt || pt.title)}" width="1466" height="1800" fetchpriority="high">
      <figcaption><i>${esc(pt.title)}</i><span>${esc(pt.medium)}</span></figcaption></a>`;
  }
  const grid = $('.selected-grid');
  if (grid) grid.innerHTML = SELECTED.map(find).filter(Boolean).map(card).join('');
}

/* =====================================================================
   Works list pages
   ===================================================================== */
function buildWorks() {
  const grid = $('.works-grid');
  if (!grid) return;
  const section = document.body.dataset.section;
  const list = PROJECTS.filter((p) => p.section === section);
  grid.innerHTML = list.map(card).join('');

  $$('[data-count]').forEach((el) => { el.textContent = PROJECTS.filter((p) => p.section === el.dataset.count).length; });

  const filters = $('.filters');
  if (!filters) return;
  const status = $('.filter-status');
  const opts = [['', 'All'], ['Gouache', 'Gouache'], ['Digital', 'Digital']];
  filters.insertAdjacentHTML('beforeend', opts.map(([v, label]) => {
    const n = v ? list.filter((p) => p.medium === v).length : list.length;
    return `<button type="button" class="filter" data-medium="${v}" aria-pressed="${v === ''}">${label} <span class="n">${n}</span></button>`;
  }).join(''));
  $$('.filter', filters).forEach((btn) => btn.addEventListener('click', () => {
    const v = btn.dataset.medium;
    $$('.filter', filters).forEach((b) => b.setAttribute('aria-pressed', b === btn));
    let shown = 0;
    $$('.card', grid).forEach((c) => { const on = !v || c.dataset.medium === v; c.hidden = !on; shown += on; });
    if (status) status.textContent = `Showing ${shown} ${shown === 1 ? 'piece' : 'pieces'}.`;
  }));
}

/* =====================================================================
   Project page
   ===================================================================== */
function buildProject() {
  if (document.body.dataset.page !== 'project') return;
  const main = $('#main');
  const p = find(new URLSearchParams(location.search).get('p'));

  if (!p) {
    document.title = `Project not found | ${SITE.name}`;
    main.innerHTML = `<section class="wrap page-head"><p class="label">Error 404</p><h1 class="display">This canvas is <em>blank.</em></h1>
      <p class="lede">I couldn’t find that project. It may have moved.</p>
      <p style="margin-top:32px;display:flex;gap:12px;flex-wrap:wrap"><a class="btn" href="works.html">Client work</a><a class="btn ghost" href="personal-work.html">Personal work</a></p></section>`;
    return;
  }

  document.body.dataset.section = p.section;
  document.title = `${p.title} | ${SITE.name}`;
  $('meta[name="description"]')?.setAttribute('content', `${p.title}: ${p.summary}`);

  const siblings = PROJECTS.filter((x) => x.section === p.section);
  const idx = siblings.indexOf(p);
  const prev = siblings[(idx - 1 + siblings.length) % siblings.length];
  const next = siblings[(idx + 1) % siblings.length];
  const facts = [
    ['Client', p.client],
    ['Year', p.year],
    ['Discipline', p.disciplines.join(', ')],
    ['Medium', p.section === 'client' ? 'Graphic design' : (p.medium === 'Gouache' ? 'Gouache on paper' : 'Digital painting')],
  ].filter(([, v]) => v);

  const imgs = p.images;
  const plates = imgs.map((im, i) => `<figure class="plate">
      <button type="button" data-i="${i}" aria-label="Open image ${i + 1} of ${imgs.length} full screen"><img data-src="${esc(im.src)}" alt="${esc(im.alt)}" loading="${i < 2 ? 'eager' : 'lazy'}" decoding="async"></button>
    </figure>`).join('');

  main.innerHTML = `
    <div class="wrap">
      <header class="project-head">
        <nav class="crumbs" aria-label="Breadcrumb"><a href="${SECTION_PAGES[p.section]}">${SECTION_NAMES[p.section]}</a><span aria-hidden="true">/</span><span aria-current="page">${esc(p.title)}</span></nav>
        <h1 class="display">${esc(p.title)}</h1>
        <p class="lede">${esc(p.summary)}</p>
      </header>
      <dl class="facts">${facts.map(([k, v]) => `<div><dt class="label">${k}</dt><dd>${esc(v)}</dd></div>`).join('')}</dl>
      <section class="project-body" aria-label="About this project">
        <p class="label">About the project</p>
        <div class="prose">${p.description.map((d) => `<p>${esc(d)}</p>`).join('')}
          ${p.netsoc ? `<div class="roles"><p>${esc(NETSOC_JOURNEY.intro)}</p><ol aria-label="My roles at Netsoc">${NETSOC_JOURNEY.stops.map((s) => `<li>${esc(s)}</li>`).join('')}</ol></div>` : ''}
        </div>
      </section>
      <section class="plates${imgs.length > 1 ? ' two' : ''}" aria-label="Images">${plates}</section>
      <nav class="pager" aria-label="More projects">
        <a href="${projectUrl(prev)}"><span class="label">Previous</span><b>${esc(prev.title)}</b></a>
        <a href="${projectUrl(next)}"><span class="label">Next</span><b>${esc(next.title)}</b></a>
      </nav>
    </div>`;
  setupLightbox(imgs, '.plate button');
}

function setupLightbox(imgs, selector) {
  const dlg = document.createElement('dialog');
  dlg.className = 'lightbox';
  dlg.setAttribute('aria-label', 'Image viewer');
  dlg.innerHTML = `
    <div class="lb-top"><span class="lb-count" aria-live="polite"></span><button class="lb-btn lb-close" type="button" aria-label="Close image viewer">✕</button></div>
    <div class="lb-stage">
      <button class="lb-btn lb-prev" type="button" aria-label="Previous image">←</button>
      <img alt="">
      <button class="lb-btn lb-next" type="button" aria-label="Next image">→</button>
    </div>
    <p class="lb-caption"></p>`;
  document.body.append(dlg);
  const img = $('img', dlg);
  let i = 0;
  const show = (n) => {
    i = (n + imgs.length) % imgs.length;
    img.src = imgs[i].src; img.alt = imgs[i].alt;
    $('.lb-caption', dlg).textContent = imgs[i].alt;
    $('.lb-count', dlg).textContent = `${i + 1} / ${imgs.length}`;
    $('.lb-prev', dlg).hidden = $('.lb-next', dlg).hidden = imgs.length < 2;
  };
  $$(selector).forEach((b) => b.addEventListener('click', () => { show(+b.dataset.i); dlg.showModal(); }));
  $('.lb-close', dlg).addEventListener('click', () => dlg.close());
  $('.lb-prev', dlg).addEventListener('click', () => show(i - 1));
  $('.lb-next', dlg).addEventListener('click', () => show(i + 1));
  dlg.addEventListener('click', (e) => { if (e.target === dlg || e.target.classList.contains('lb-stage')) dlg.close(); });
  dlg.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') show(i - 1);
    if (e.key === 'ArrowRight') show(i + 1);
  });
}

/* =====================================================================
   Paintings
   ===================================================================== */
function buildPaintings() {
  const wall = $('.paintings');
  if (!wall) return;
  wall.innerHTML = PAINTINGS.map((pt, i) => `
    <figure class="painting" id="painting-${i + 1}">
      <button type="button" data-i="${i}" aria-label="View ${esc(pt.title)} full screen">
        <span class="frame"><img data-src="${esc(pt.src)}" alt="${esc(pt.alt || pt.title)}" loading="lazy" decoding="async"></span>
      </button>
      <figcaption>
        <b>${esc(pt.title)}</b>
        <span class="label">${esc([pt.medium, pt.size, pt.year].filter(Boolean).join(' · '))}</span>
        ${pt.note ? `<p>${esc(pt.note)}</p>` : ''}
      </figcaption>
    </figure>`).join('');
  setupLightbox(PAINTINGS.map((pt) => ({ src: pt.src, alt: pt.alt || pt.title })), '.painting button');
}

/* =====================================================================
   About — favourite things
   ===================================================================== */
function buildFavourites() {
  const list = $('.favourites');
  if (!list) return;
  list.innerHTML = FAVOURITES.map((f) => `
    <li class="fav">
      <img src="${esc(f.img)}" alt="" loading="lazy" decoding="async" width="640" height="640">
      <span class="label">${esc(f.label)}</span>
      <h3>${esc(f.name)}</h3>
      <p>${esc(f.story)}</p>
    </li>`).join('');
}

/* =====================================================================
   Contact
   ===================================================================== */
function buildContact() {
  $$('[data-email]').forEach((el) => { el.textContent = SITE.email; el.href = `mailto:${SITE.email}`; });
  $$('[data-shop-mail]').forEach((el) => { el.href = `mailto:${SITE.email}?subject=${encodeURIComponent('Tell me when the shop opens')}`; });

  const form = $('.form');
  if (!form) return;
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const d = new FormData(form);
    const subject = `${d.get('topic') || 'Hello'} — from ${d.get('name')}`;
    const body = `${d.get('message')}\n\n— ${d.get('name')} (${d.get('email')})`;
    window.location.href = `mailto:${SITE.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    $('.form-status', form).innerHTML = `Your email app should open with the message ready. Nothing opened? Write to <a class="link" href="mailto:${esc(SITE.email)}">${esc(SITE.email)}</a>.`;
  });
}

/* ===================================================================== */
document.addEventListener('DOMContentLoaded', () => {
  buildChrome();
  buildHome();
  buildWorks();
  buildProject();
  buildPaintings();
  buildFavourites();
  buildContact();
  loadImages();
});
