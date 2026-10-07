/* Site behaviour. Content lives in data.js — you shouldn't need to edit this file. */

const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const esc = (s = '') => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);

const SECTION_NAMES = { client: 'Client work', personal: 'Personal work' };
const SECTION_PAGES = { client: 'works.html', personal: 'personal-work.html' };
const projectUrl = (p) => `project.html?p=${encodeURIComponent(p.slug)}`;
const pigmentHex = (key) => (PIGMENTS[key] ? PIGMENTS[key].hex : '#1b1a17');

const CHEVRON = '<svg viewBox="0 0 12 8" aria-hidden="true" focusable="false"><path d="M1 1.5 6 6.5 11 1.5" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>';

/* =====================================================================
   Madrid: street-sign plaques, Spanish-deck suits, metro lines, skyline
   ===================================================================== */
const ICON = {
  oros: '<circle cx="16" cy="16" r="11"/><circle cx="16" cy="16" r="6"/><g stroke-width="2.4" stroke-linecap="round"><path d="M16 3v2M16 27v2M3 16h2M27 16h2M7 7l1.4 1.4M23.6 23.6 25 25M25 7l-1.4 1.4M8.4 23.6 7 25"/></g>',
  copas: '<path d="M8 5h16c0 8-3 12-8 12S8 13 8 5z"/><path d="M16 17v7M10 28h12M12 24h8"/>',
  bastos: '<path d="M11 28 21 4"/><path d="M19 9c3-1 5 1 4 4M14 18c-3 0-5-2-4-5M17 13l3 1M13 22l-3-1"/>',
  espadas: '<path d="M16 3v19M11 22h10M16 22v6M13 28h6"/><path d="M16 3l-2 4v13M16 3l2 4v13"/>',
  brush: '<path d="M7 25 20 12"/><path d="M20 12l4-6 2 2-6 4z"/><path d="M5 27c0-2 1-3 2-2s0 3-2 2z"/>',
  awning: '<path d="M4 12h24l-2-6H6z"/><path d="M4 12c0 2 4 2 4 0 0 2 4 2 4 0 0 2 4 2 4 0 0 2 4 2 4 0 0 2 4 2 4 0 0 2 4 2 4 0"/><path d="M7 14v13h18V14M13 27v-7h6v7"/>',
  bear: '<circle cx="22" cy="9" r="6"/><g fill="currentColor" stroke="none"><circle cx="20" cy="8" r="1.1"/><circle cx="24" cy="10" r="1.1"/><circle cx="22" cy="6" r="1.1"/></g><path d="M22 15v13"/><path d="M8 28v-7c0-5 3-8 6-8 2 0 3 1 3 3l3-2M12 28v-4M8 14c-1-1-1-3 1-3"/>',
  sun: '<circle cx="16" cy="16" r="6"/><g stroke-linecap="round"><path d="M16 3v4M16 25v4M3 16h4M25 16h4M7 7l3 3M22 22l3 3M25 7l-3 3M10 22l-3 3"/></g>',
};
const icon = (name, cls = '') => `<svg class="${cls}" viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round" aria-hidden="true" focusable="false">${ICON[name] || ''}</svg>`;

// Each page's Madrid street sign
const PLAQUES = {
  client:    { dist: '01', pre: 'Calle de los', name: 'Encargos', en: 'Commissions Street', icon: 'oros' },
  personal:  { dist: '01', pre: 'Calle del', name: 'Capricho', en: 'Whim Street', icon: 'copas' },
  paintings: { dist: '02', pre: 'Plaza de la', name: 'Pintura', en: 'Painting Square', icon: 'brush' },
  shop:      { dist: '03', pre: 'Mercado del', name: 'Arte', en: 'Art Market', icon: 'awning' },
  about:     { dist: '04', pre: 'Travesía de', name: 'Laura', en: 'Laura’s Lane', icon: 'bear' },
  contact:   { dist: '05', pre: 'Puerta del', name: 'Sol', en: 'Gate of the Sun, kilometre zero of Madrid', icon: 'sun' },
};
function plaque(key, number) {
  const p = PLAQUES[key];
  if (!p) return '';
  return `<div class="plaque" role="img" aria-label="Madrid street sign: ${esc(p.pre)} ${esc(p.name)}${number ? `, number ${number}` : ''} (${esc(p.en)})">
    <span class="plaque-art">${icon(p.icon)}</span>
    <span class="plaque-text" lang="es"><small>${esc(p.pre)}</small><b>${esc(p.name)}</b></span>
    <span class="plaque-dist">${number ? `Nº ${number}` : `Distr. ${p.dist}`}</span>
  </div>`;
}
function renderPlaques() {
  $$('[data-plaque]').forEach((el) => { el.outerHTML = plaque(el.dataset.plaque, el.dataset.number); });
}

// Metro-style lines (About page + Netsoc projects)
function metroLine({ label, colour, stops, current }) {
  return `<div class="line" style="--line:${colour}">
    <p class="line-name"><span class="line-badge" aria-hidden="true">${esc(label.badge)}</span>${esc(label.text)}</p>
    <ol class="stops">${stops.map((st, i) => `<li${i === current ? ' aria-current="step"' : ''}><span class="dot" aria-hidden="true"></span><b>${esc(st.name)}</b>${st.note ? `<span>${esc(st.note)}</span>` : ''}</li>`).join('')}</ol>
  </div>`;
}
const LINES = {
  route: () => metroLine({
    label: { badge: '1', text: 'Línea Laura · Madrid to Ireland' }, colour: '#1a73a8', current: 2,
    stops: [{ name: 'Madrid', note: 'Born and raised' }, { name: 'Sancti Petri, Cádiz', note: 'Every summer' }, { name: 'Ireland', note: 'Home now, since dreaming of it at 12' }],
  }),
  netsoc: () => metroLine({
    label: { badge: '2', text: 'Línea Netsoc · my roles' }, colour: PIGMENTS.personal.hex, current: NETSOC_JOURNEY.stops.length - 1,
    stops: NETSOC_JOURNEY.stops.map((name, i) => ({ name, note: ['First year of college', 'Designing the society’s posters', 'Leading the society’s graphics'][i] })),
  }),
};
function renderLines() {
  $$('[data-line]').forEach((el) => { el.innerHTML = LINES[el.dataset.line] ? LINES[el.dataset.line]() : ''; });
}

// The footer skyline: Madrid on the left, Dublin on the right, one river between them
const SKYLINE = `<svg class="skyline" viewBox="0 0 1400 300" preserveAspectRatio="xMidYMax meet" aria-hidden="true" focusable="false">
  <defs>
    <filter id="sky-wobble" x="-2%" y="-5%" width="104%" height="110%"><feTurbulence type="fractalNoise" baseFrequency=".035" numOctaves="2" seed="5"/><feDisplacementMap in="SourceGraphic" scale="2.6"/></filter>
    <pattern id="hatch" width="6" height="6" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><path d="M0 0v6" stroke="#f3efe6" stroke-opacity=".28" stroke-width="1"/></pattern>
    <pattern id="win" width="8" height="10" patternUnits="userSpaceOnUse"><rect x="1.5" y="2" width="4" height="5" fill="#f3efe6" fill-opacity=".3"/></pattern>
    <pattern id="poolbeg" width="20" height="26" patternUnits="userSpaceOnUse"><rect width="20" height="13" fill="#c2341f"/><rect y="13" width="20" height="13" fill="#f3efe6" fill-opacity=".85"/></pattern>
  </defs>
  <g filter="url(#sky-wobble)" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round" stroke-linecap="round">
    <!-- sky: setting sun, clouds, birds -->
    <circle cx="700" cy="168" r="50" fill="#d9a032" fill-opacity=".8" stroke="none"/>
    <path d="M630 150h40M716 140h60M650 176h30M736 186h50" stroke="#1b1a17" stroke-width="3" stroke-opacity=".5"/>
    <path d="M300 60c14-12 30-10 38 0 10-8 26-6 30 6M980 70c12-10 26-8 32 2 10-6 22-4 26 6" stroke-opacity=".45"/>
    <path d="M420 92q6-6 12 0q6-6 12 0M452 80q5-5 10 0q5-5 10 0M1110 60q6-6 12 0q6-6 12 0M1140 48q5-5 10 0q5-5 10 0M1180 72q6-6 12 0q6-6 12 0" stroke-width="1.4"/>

    <!-- distant hills: Guadarrama on the left, Dublin mountains on the right -->
    <path d="M0 214 60 186 118 200 190 164 262 196 330 176 420 204 520 186 600 212 660 206V250H0z" fill="#3e6b3a" fill-opacity=".22" stroke="none"/>
    <path d="M740 220q120-48 240-16t200-10 220 6V250H740z" fill="#3e6b3a" fill-opacity=".3" stroke="none"/>

    <!-- ===== MADRID ===== -->
    <!-- Cuatro Torres -->
    <rect x="22" y="74" width="24" height="176" fill="url(#win)"/><path d="M26 74v-10h16v10"/>
    <rect x="54" y="56" width="26" height="194" fill="url(#hatch)"/><path d="M54 56V34h26v22M60 34v22M74 34v22"/>
    <rect x="88" y="80" width="22" height="170" fill="url(#win)"/><path d="M88 80q11-18 22 0"/>
    <rect x="118" y="64" width="24" height="186" fill="#1d4f91" fill-opacity=".35"/><path d="M130 64V36"/><rect x="118" y="64" width="24" height="186" fill="url(#win)" stroke="none"/>
    <!-- Puerta de Europa (KIO towers) -->
    <path d="M160 250h30l30-150h-30z" fill="url(#hatch)"/><path d="M168 210h28M176 170h28M184 130h28"/>
    <path d="M272 250h-30l-30-150h30z" fill="url(#hatch)"/><path d="M264 210h-28M256 170h-28M248 130h-28"/>
    <!-- Palacio Real -->
    <rect x="280" y="190" width="124" height="60" fill="#a3402a" fill-opacity=".3"/>
    <path d="M276 190h132M280 184h124v6M326 176h32v8"/>
    <path d="M288 196v54M300 196v54M312 196v54M324 196v54M336 196v54M348 196v54M360 196v54M372 196v54M384 196v54M396 196v54" stroke-width="1"/>
    <path d="M284 180v-4M296 180v-4M308 180v-4M320 180v-4M364 180v-4M376 180v-4M388 180v-4M400 180v-4" stroke-width="2"/>
    <!-- Almudena cathedral -->
    <rect x="408" y="196" width="62" height="54" fill="#d9a032" fill-opacity=".22"/>
    <rect x="426" y="168" width="26" height="28" fill="url(#hatch)"/><path d="M422 168q17-44 34 0z" fill="#1d4f91" fill-opacity=".45"/><path d="M436 128h6v-12h-6zM439 116v-12M434 110h10"/>
    <path d="M408 196v-20h10v20M460 196v-20h10v20M413 176v-8M465 176v-8"/>
    <!-- Metrópolis -->
    <rect x="480" y="172" width="58" height="78" fill="url(#win)"/>
    <path d="M488 172v-22h42v22M494 150v22M504 150v22M514 150v22M524 150v22"/>
    <path d="M486 150q23-44 46 0z" fill="#d9a032" fill-opacity=".85"/>
    <path d="M509 106v-6M509 104l-10-8M509 104l10-8M509 100a3 3 0 1 0 0-6" stroke-width="1.8"/>
    <!-- Puerta de Alcalá -->
    <rect x="552" y="176" width="146" height="74" fill="#d9a032" fill-opacity=".28"/>
    <path d="M548 176h154M552 168h146v8M600 168l25-22 25 22"/>
    <circle cx='566' cy='148' r='3' fill='currentColor' fill-opacity='.6' stroke='none'/><circle cx='606' cy='148' r='3' fill='currentColor' fill-opacity='.6' stroke='none'/><circle cx='650' cy='148' r='3' fill='currentColor' fill-opacity='.6' stroke='none'/><circle cx='690' cy='148' r='3' fill='currentColor' fill-opacity='.6' stroke='none'/>
    <path d="M594 250v-34a10 10 0 0 1 20 0v34M615 250v-38a10 10 0 0 1 20 0v38M636 250v-34a10 10 0 0 1 20 0v34" fill="#1b1a17" fill-opacity=".55"/>
    <path d="M562 250v-36h14v36M674 250v-36h14v36" fill="#1b1a17" fill-opacity=".55"/>
    <path d="M556 182v68M586 182v68M664 182v68M694 182v68" stroke-width="1"/>
    <!-- El oso y el madroño -->
    <path d="M714 250v-34"/><circle cx="714" cy="200" r="20" fill="#3e6b3a" fill-opacity=".6"/>
    <g fill="#cf3a2c" stroke="none"><circle cx="706" cy="194" r="2.5"/><circle cx="720" cy="198" r="2.5"/><circle cx="712" cy="206" r="2.5"/><circle cx="724" cy="190" r="2.5"/></g>
    <path d="M690 250v-18c0-10 6-16 12-16 4 0 6 2 6 6l6-4M694 250v-6M702 250v-6" fill="#1b1a17" fill-opacity=".5"/>

    <!-- the river: Manzanares running into the Liffey -->
    <path d="M0 250h1400"/>
    <path d="M10 264q20-6 40 0t40 0 40 0M170 276q20-6 40 0t40 0M330 266q20-6 40 0t40 0 40 0M560 280q20-6 40 0t40 0M760 270q20-6 40 0t40 0 40 0M960 282q20-6 40 0t40 0M1100 268q20-6 40 0t40 0 40 0M1280 278q20-6 40 0t40 0" stroke="#8fb8de" stroke-opacity=".7"/>
    <path d="M920 292h40l-6 6h-28zM940 292v-14l12 10" stroke-width="1.4"/>

    <!-- ===== DUBLIN ===== -->
    <!-- Ha'penny Bridge -->
    <path d="M760 262q70-42 140 0M772 266q58-30 116 0" stroke-width="2"/>
    <path d='M772 252V265' stroke-width='1'/><path d='M781 244V257' stroke-width='1'/><path d='M790 238V250' stroke-width='1'/><path d='M799 232V245' stroke-width='1'/><path d='M808 228V241' stroke-width='1'/><path d='M817 226V238' stroke-width='1'/><path d='M826 225V237' stroke-width='1'/><path d='M835 225V237' stroke-width='1'/><path d='M844 226V238' stroke-width='1'/><path d='M853 229V241' stroke-width='1'/><path d='M862 233V245' stroke-width='1'/><path d='M871 238V251' stroke-width='1'/><path d='M880 245V257' stroke-width='1'/><path d='M889 253V266' stroke-width='1'/>
    <path d="M806 228q6-10 12 0M824 224q6-10 12 0M842 228q6-10 12 0" stroke-width="1.4"/><circle cx="812" cy="220" r="2" fill="#d9a032" stroke="none"/><circle cx="830" cy="216" r="2" fill="#d9a032" stroke="none"/><circle cx="848" cy="220" r="2" fill="#d9a032" stroke="none"/>
    <!-- Custom House -->
    <rect x="908" y="204" width="146" height="46" fill="#d9a032" fill-opacity=".18"/>
    <path d="M904 204h154M958 204l23-20 23 20M960 208v42M970 208v42M980 208v42M990 208v42M1000 208v42"/>
    <rect x="970" y="162" width="22" height="22" fill="url(#hatch)"/><path d="M968 162q13-28 26 0z" fill="#9cbf6b" fill-opacity=".75"/><path d="M981 134v-8M978 128h6"/>
    <rect x="914" y="214" width="40" height="30" fill="url(#win)" stroke="none"/><rect x="1008" y="214" width="40" height="30" fill="url(#win)" stroke="none"/>
    <!-- The Spire -->
    <path d="M1064 250l3-232 3 232z" fill="#f3efe6" fill-opacity=".6"/>
    <!-- Samuel Beckett Bridge (the harp) -->
    <path d="M1080 262h136"/>
    <path d="M1184 262q20-82-36-144" stroke-width="3"/>
    <path d='M1150 120L1092 262' stroke-opacity='.75' stroke-width='1'/><path d='M1156 136L1106 262' stroke-opacity='.75' stroke-width='1'/><path d='M1162 152L1120 262' stroke-opacity='.75' stroke-width='1'/><path d='M1168 168L1134 262' stroke-opacity='.75' stroke-width='1'/><path d='M1174 184L1148 262' stroke-opacity='.75' stroke-width='1'/><path d='M1180 200L1162 262' stroke-opacity='.75' stroke-width='1'/><path d='M1156 134L1205 262' stroke-opacity='.55' stroke-width='1'/><path d='M1160 148L1202 262' stroke-opacity='.55' stroke-width='1'/><path d='M1164 162L1199 262' stroke-opacity='.55' stroke-width='1'/><path d='M1168 176L1196 262' stroke-opacity='.55' stroke-width='1'/>
    <!-- Poolbeg chimneys -->
    <path d="M1228 250l3-188h10l3 188z" fill="url(#poolbeg)"/><path d="M1252 250l3-176h10l3 176z" fill="url(#poolbeg)"/>
    <path d="M1236 58q4-10 0-20M1260 70q4-10 0-20" stroke-opacity=".4"/>
    <!-- Georgian terrace -->
    <rect x='1282' y='162' width='28' height='88' fill='#a3402a' fill-opacity='.38'/><path d='M1282 162h28M1280 158h32v4h-32z'/><rect x='1294' y='146' width='5' height='12' fill='#a3402a' fill-opacity='.5'/><rect x='1286' y='172' width='8' height='14' fill='url(#win)'/><rect x='1298' y='172' width='8' height='14' fill='url(#win)'/><rect x='1286' y='196' width='8' height='14' fill='url(#win)'/><rect x='1298' y='196' width='8' height='14' fill='url(#win)'/><path d='M1290 230a6 6 0 0 1 12 0' /><rect x='1290' y='230' width='12' height='20' fill='#c2341f' stroke='none'/><path d='M1290 230v20h12v-20M1296 224v6M1292 226l4 4 4-4'/><rect x='1312' y='162' width='28' height='88' fill='#a3402a' fill-opacity='.38'/><path d='M1312 162h28M1310 158h32v4h-32z'/><rect x='1324' y='146' width='5' height='12' fill='#a3402a' fill-opacity='.5'/><rect x='1316' y='172' width='8' height='14' fill='url(#win)'/><rect x='1328' y='172' width='8' height='14' fill='url(#win)'/><rect x='1316' y='196' width='8' height='14' fill='url(#win)'/><rect x='1328' y='196' width='8' height='14' fill='url(#win)'/><path d='M1320 230a6 6 0 0 1 12 0' /><rect x='1320' y='230' width='12' height='20' fill='#1d4f91' stroke='none'/><path d='M1320 230v20h12v-20M1326 224v6M1322 226l4 4 4-4'/><rect x='1342' y='162' width='28' height='88' fill='#a3402a' fill-opacity='.38'/><path d='M1342 162h28M1340 158h32v4h-32z'/><rect x='1354' y='146' width='5' height='12' fill='#a3402a' fill-opacity='.5'/><rect x='1346' y='172' width='8' height='14' fill='url(#win)'/><rect x='1358' y='172' width='8' height='14' fill='url(#win)'/><rect x='1346' y='196' width='8' height='14' fill='url(#win)'/><rect x='1358' y='196' width='8' height='14' fill='url(#win)'/><path d='M1350 230a6 6 0 0 1 12 0' /><rect x='1350' y='230' width='12' height='20' fill='#d9a032' stroke='none'/><path d='M1350 230v20h12v-20M1356 224v6M1352 226l4 4 4-4'/><rect x='1372' y='162' width='28' height='88' fill='#a3402a' fill-opacity='.38'/><path d='M1372 162h28M1370 158h32v4h-32z'/><rect x='1384' y='146' width='5' height='12' fill='#a3402a' fill-opacity='.5'/><rect x='1376' y='172' width='8' height='14' fill='url(#win)'/><rect x='1388' y='172' width='8' height='14' fill='url(#win)'/><rect x='1376' y='196' width='8' height='14' fill='url(#win)'/><rect x='1388' y='196' width='8' height='14' fill='url(#win)'/><path d='M1380 230a6 6 0 0 1 12 0' /><rect x='1380' y='230' width='12' height='20' fill='#3e6b3a' stroke='none'/><path d='M1380 230v20h12v-20M1386 224v6M1382 226l4 4 4-4'/>

    <!-- signatures -->
    <text x="20" y="294" fill="currentColor" stroke="none" font-family="Caveat, cursive" font-size="22">Madrid</text>
    <text x="1318" y="294" fill="currentColor" stroke="none" font-family="Caveat, cursive" font-size="22">Dublin</text>
  </g>
</svg>`;

/* =====================================================================
   Header, navigation & footer
   ===================================================================== */
function buildChrome() {
  const page = document.body.dataset.page;
  const sub = document.body.dataset.section;
  const cur = (p) => (p === page ? ' aria-current="page"' : '');
  const curSub = (s) => (page === 'works' && s === sub ? ' aria-current="page"' : '');
  const [first, ...rest] = SITE.name.split(' ');

  const skip = document.createElement('a');
  skip.className = 'skip-link';
  skip.href = '#main';
  skip.textContent = 'Skip to main content';

  const header = document.createElement('header');
  header.className = 'site-header';
  header.innerHTML = `
    <a class="wordmark" href="index.html" aria-label="${esc(SITE.name)}, home">
      <span class="blob" aria-hidden="true"></span><span aria-hidden="true">${esc(first)} <em>${esc(rest.join(' '))}</em></span>
    </a>
    <button class="menu-btn" type="button" aria-expanded="false" aria-controls="site-nav">
      <span class="menu-icon" aria-hidden="true"><i></i><i></i><i></i></span><span class="menu-label">Menu</span>
    </button>
    <nav class="nav" id="site-nav" aria-label="Main">
      <ul>
        <li class="has-sub">
          <a class="nav-link" href="works.html"${cur('works')}><small aria-hidden="true">01</small>Works</a>
          <button class="sub-toggle" type="button" aria-expanded="false" aria-controls="works-menu" aria-label="Show works sections">${CHEVRON}</button>
          <ul class="sub" id="works-menu">
            <li><a href="works.html"${curSub('client')}><span class="sw" style="background:${PIGMENTS.client.hex}" aria-hidden="true"></span><span class="t">Client work</span><span class="d">Branding, posters &amp; characters</span></a></li>
            <li><a href="personal-work.html"${curSub('personal')}><span class="sw" style="background:${PIGMENTS.personal.hex}" aria-hidden="true"></span><span class="t">Personal work</span><span class="d">Digital paintings &amp; illustration</span></a></li>
          </ul>
        </li>
        <li><a class="nav-link" href="paintings.html"${cur('paintings')}><small aria-hidden="true">02</small>Paintings</a></li>
        <li><a class="nav-link" href="art-shop.html"${cur('shop')}><small aria-hidden="true">03</small>Art shop</a></li>
        <li><a class="nav-link" href="about.html"${cur('about')}><small aria-hidden="true">04</small>About</a></li>
        <li class="nav-cta"><a class="btn" href="contact.html"${cur('contact')}>Contact <span class="arrow" aria-hidden="true">→</span></a></li>
      </ul>
    </nav>`;
  document.body.prepend(skip, header);
  setupMenus(header);

  const onScroll = () => header.classList.toggle('scrolled', window.scrollY > 8);
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  const socials = SITE.socials.map((s) => `<li><a href="${esc(s.url)}" target="_blank" rel="noopener">${esc(s.name)}<span class="sr-only"> (opens in a new tab)</span></a></li>`).join('');
  const footer = document.createElement('footer');
  footer.className = 'site-footer on-dark';
  footer.innerHTML = `
    <div class="wrap">
      ${page === 'contact' ? '' : `
      <div class="footer-cta">
        <p class="eyebrow" style="color:#c9c2b4">Commissions · collaborations · a chat over matcha</p>
        <h2 class="display" style="margin-top:18px">Let’s make<br>something <em>together.</em></h2>
        <div class="row">
          <a class="btn" href="contact.html">Start a conversation <span class="arrow" aria-hidden="true">→</span></a>
          <a class="mail link-underline" href="mailto:${esc(SITE.email)}">${esc(SITE.email)}</a>
        </div>
      </div>`}
      <p class="cielo" lang="es">De Madrid al cielo… <span lang="en">by way of Dublin.</span></p>
      ${SKYLINE}
      <div class="footer-bottom" ${page === 'contact' ? 'style="margin-top:0;border-top:0;padding-top:0"' : ''}>
        <p>© ${new Date().getFullYear()} ${esc(SITE.name)}. Made in ${esc(SITE.hometown)}, painted in ${esc(SITE.location)}.</p>
        <ul aria-label="Social media">${socials}</ul>
      </div>
    </div>
    <div class="footer-swatches" aria-hidden="true">${Object.values(PIGMENTS).map((p) => `<i style="background:${p.hex}"></i>`).join('')}</div>`;
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
   Page transitions — a brush stroke in the next page's colour
   ===================================================================== */
const WIPE_SVG = '<svg viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true"><path d="M8 0h84c-3 6 3 10 0 16s4 10 1 17 3 9 0 16 4 11 0 18 3 9 0 17 2 10-1 16H8c3-6-3-9 0-16s-4-10-1-17-3-9 0-16-4-11 0-18-3-9 0-17-2-10 1-16z"/></svg>';

function pigmentForUrl(url) {
  const file = url.pathname.split('/').pop() || 'index.html';
  if (file === 'project.html') {
    const p = PROJECTS.find((x) => x.slug === url.searchParams.get('p'));
    return p ? pigmentHex(p.section) : '#1b1a17';
  }
  const map = { 'works.html': 'client', 'personal-work.html': 'personal', 'paintings.html': 'paintings', 'art-shop.html': 'shop', 'about.html': 'about', 'contact.html': 'contact' };
  return map[file] ? pigmentHex(map[file]) : '#1b1a17';
}

function setupTransitions() {
  const wipe = document.createElement('div');
  wipe.className = 'wipe';
  wipe.innerHTML = WIPE_SVG;
  document.body.append(wipe);
  if (reduceMotion) return;

  let incoming = null;
  try { incoming = sessionStorage.getItem('wipe'); sessionStorage.removeItem('wipe'); } catch (e) { /* storage blocked */ }
  if (incoming) {
    wipe.style.setProperty('--wipe', incoming);
    wipe.classList.add('out');
    wipe.addEventListener('animationend', () => wipe.classList.remove('out'), { once: true });
  }

  document.addEventListener('click', (e) => {
    const a = e.target.closest('a[href]');
    if (!a || e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    if (a.target === '_blank' || a.hasAttribute('download')) return;
    const url = new URL(a.href, location.href);
    if (url.origin !== location.origin || !/\.html$|\/$/.test(url.pathname)) return;
    if (url.pathname === location.pathname && url.search === location.search) return; // same page / anchors
    e.preventDefault();
    const colour = pigmentForUrl(url);
    try { sessionStorage.setItem('wipe', colour); } catch (err) { /* ignore */ }
    wipe.style.setProperty('--wipe', colour);
    wipe.classList.remove('out');
    wipe.classList.add('in');
    setTimeout(() => { location.href = url.href; }, 380);
  });
  // Coming back with the browser's back button: clear any half-finished wipe.
  window.addEventListener('pageshow', (e) => { if (e.persisted) wipe.classList.remove('in', 'out'); });
}

/* =====================================================================
   Images: show a primed-canvas box until the file has loaded
   ===================================================================== */
function loadImages(root = document) {
  $$('.ph[data-src]', root).forEach((ph) => {
    if (ph.querySelector('img')) return;
    if (ph.dataset.label === undefined) ph.dataset.label = '';
    const img = new Image();
    img.alt = ph.dataset.alt || '';
    img.decoding = 'async';
    if (ph.dataset.fit) img.style.objectFit = ph.dataset.fit;
    if (ph.dataset.pos) img.style.objectPosition = ph.dataset.pos;
    if (!ph.hasAttribute('data-eager')) img.loading = 'lazy';
    img.onload = () => { ph.classList.add('loaded'); ph.closest('.stretch')?.classList.add('has-img'); };
    img.onerror = () => img.remove();
    img.src = ph.dataset.src;
    ph.append(img);
  });
}

/* =====================================================================
   Shared: work card
   ===================================================================== */
// How a piece is "hung": posters are pasted up, gouache sheets are taped, digital pieces are printed
const frameOf = (p) => (p.section === 'client' ? 'poster' : p.medium === 'Gouache' ? 'paper' : 'print');
const MEDIUM_NOTE = { poster: 'pasted up', paper: 'gouache on paper', print: 'digital print' };

function workCard(p, i) {
  const meta = [p.client, p.year].filter(Boolean).join(' · ');
  const frame = frameOf(p);
  const tilt = [-1.6, 1.2, -0.6, 1.8, -1.2, 0.8][i % 6];
  return `
    <a class="work-card is-${frame}" href="${projectUrl(p)}" data-medium="${esc(p.medium || '')}" style="--tilt:${tilt}deg">
      <div class="work-media" style="aspect-ratio:${p.ratio || 0.8}">
        <span class="tape" aria-hidden="true"></span>
        <div class="ph" data-src="${esc(p.images[0].src)}" data-alt=""></div>
      </div>
      <div class="work-info">
        <span class="idx" aria-hidden="true">${String(i + 1).padStart(2, '0')}</span>
        <h3>${esc(p.title)}</h3>
        <span class="meta">${esc(meta)}</span>
        <span class="hand-note" aria-hidden="true">${MEDIUM_NOTE[frame]}</span>
      </div>
    </a>`;
}

/* =====================================================================
   Home
   ===================================================================== */
function buildHome() {
  if (document.body.dataset.page !== 'home') return;

  // Pinned prints of real work around the hero
  const PRINTS = [
    { slug: 'gouache-cats', left: 0, top: 2, width: 56, r: -4 },
    { slug: 'gouache-lemons', left: 62, top: 0, width: 27, r: 5 },
    { slug: 'gouache-cable-car', left: 4, top: 42, width: 50, r: 3 },
    { slug: 'gouache-fox', left: 60, top: 44, width: 27, r: -6 },
    { slug: 'jinx', left: 22, top: 78, width: 44, r: -2 },
  ];
  $('.prints').innerHTML = PRINTS.map((pr, i) => {
    const p = PROJECTS.find((x) => x.slug === pr.slug);
    if (!p) return '';
    return `<a class="print" href="${projectUrl(p)}" style="left:${pr.left}%;top:${pr.top}%;width:${pr.width}%;--r:${pr.r}deg;--d:${0.2 + i * 0.12}s">
      <figure><div class="ph" data-eager data-src="${esc(p.images[0].src)}" style="aspect-ratio:${p.ratio}" data-alt=""></div>
      <figcaption>${esc(p.title)}</figcaption></figure><span class="sr-only">: view project</span></a>`;
  }).join('');

  // The deck — same order as the navigation
  const CARDS = [
    { key: 'client', href: 'works.html', label: 'Client <em>work</em>', suit: 'oros', es: 'Oros' },
    { key: 'personal', href: 'personal-work.html', label: 'Personal <em>work</em>', suit: 'copas', es: 'Copas' },
    { key: 'paintings', href: 'paintings.html', label: 'The <em>paintings</em>', suit: 'bastos', es: 'Bastos' },
    { key: 'shop', href: 'art-shop.html', label: 'Art <em>shop</em>', suit: 'espadas', es: 'Espadas' },
    { key: 'about', href: 'about.html', label: 'About <em>me</em>', suit: 'oros', es: 'Oros' },
    { key: 'contact', href: 'contact.html', label: 'Say <em>hola</em>', suit: 'copas', es: 'Copas' },
  ];
  const n = CARDS.length;
  $('.deck').innerHTML = CARDS.map((c, i) => {
    const pg = PIGMENTS[c.key];
    const t = i - (n - 1) / 2;
    const plain = c.label.replace(/<[^>]+>/g, '');
    return `<a class="pcard" href="${c.href}" style="--c:${pg.hex};--ci:${pg.ink};--t:${t};--r:${(t * 5).toFixed(1)}deg;--y:${(t * t * 5).toFixed(0)}px;--i:${i};z-index:${i + 1}" aria-label="${esc(plain)}">
      <span class="face" aria-hidden="true">
        <span class="num"><span>${i + 1}</span>${icon(c.suit, 'suit')}</span>
        <span class="big-suit">${icon(c.suit)}</span>
        <span class="title">${c.label}</span>
      </span>
      <span class="spec" aria-hidden="true"><b>${esc(pg.name)}</b><span lang="es">${i + 1} de ${c.es}</span></span>
    </a>`;
  }).join('');

  // Deal the cards in when the deck scrolls into view
  const deck = $('.deck');
  if (!reduceMotion && 'IntersectionObserver' in window) {
    deck.classList.add('undealt');
    const io = new IntersectionObserver((entries) => {
      if (entries.some((e) => e.isIntersecting)) {
        deck.classList.remove('undealt'); deck.classList.add('dealt'); io.disconnect();
        setTimeout(() => deck.classList.remove('dealt'), 1900); // hand back to the normal hover motion
      }
    }, { threshold: 0.25 });
    io.observe(deck);
  }

  // Selected work
  $('.feature-grid').innerHTML = ['gouache-cats', 'gouache-lemons', 'mascots']
    .map((slug, i) => workCard(PROJECTS.find((p) => p.slug === slug), i)).join('');

  // "Now showing": the canvases, hung on a gallery wall
  const mini = $('.mini-wall');
  if (mini) {
    mini.innerHTML = PAINTINGS.map((pt, i) => `
      <a class="mini-frame" href="paintings.html#painting-${i + 1}">
        <span class="gilt"><span class="ph" data-src="${esc(pt.src)}" data-alt="" style="aspect-ratio:${i === 1 ? '1' : '0.81'}"></span></span>
        <span class="mini-label"><b>${esc(pt.title)}</b><span>${esc(pt.medium)}</span></span>
      </a>`).join('');
  }

  setupPaint();
}

/* Paintable hero: press and drag to lay down acrylic-like strokes */
function setupPaint() {
  const hero = $('.hero');
  const canvas = $('.paint-layer');
  const palette = $('.palette');
  if (!hero || !canvas) return;
  const ctx = canvas.getContext('2d');
  const colours = Object.values(PIGMENTS).map((p) => p.hex);
  let colour = colours[1];
  let w = 0, h = 0;

  const resize = () => {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const r = hero.getBoundingClientRect();
    const snapshot = w ? ctx.getImageData(0, 0, canvas.width, canvas.height) : null;
    w = r.width; h = r.height;
    canvas.width = w * dpr; canvas.height = h * dpr;
    canvas.style.width = w + 'px'; canvas.style.height = h + 'px';
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    if (snapshot) ctx.putImageData(snapshot, 0, 0);
  };

  // One brush "dab" between two points: a body of colour plus streaky bristles
  const bristles = Array.from({ length: 14 }, () => ({ o: Math.random() * 2 - 1, a: 0.25 + Math.random() * 0.5, w: 0.6 + Math.random() * 1.8 }));
  const dab = (x0, y0, x1, y1, size, c) => {
    const ang = Math.atan2(y1 - y0, x1 - x0) + Math.PI / 2;
    const nx = Math.cos(ang), ny = Math.sin(ang);
    ctx.lineCap = 'round';
    ctx.strokeStyle = c;
    ctx.globalAlpha = 0.5;
    ctx.lineWidth = size;
    ctx.beginPath(); ctx.moveTo(x0, y0); ctx.lineTo(x1, y1); ctx.stroke();
    for (const b of bristles) {
      const off = b.o * size * 0.55;
      ctx.globalAlpha = b.a;
      ctx.lineWidth = b.w;
      ctx.beginPath();
      ctx.moveTo(x0 + nx * off, y0 + ny * off);
      ctx.lineTo(x1 + nx * off, y1 + ny * off);
      ctx.stroke();
    }
    ctx.globalAlpha = 1;
  };

  // A few opening strokes so it reads as a canvas
  const intro = () => {
    const strokes = [
      { c: PIGMENTS.contact.hex, pts: [[0.03, 0.30], [0.18, 0.22], [0.34, 0.34], [0.50, 0.26]], s: 70 },
      { c: PIGMENTS.shop.hex, pts: [[0.05, 0.74], [0.22, 0.66], [0.40, 0.78]], s: 46 },
      { c: PIGMENTS.personal.hex, pts: [[0.40, 0.56], [0.47, 0.50], [0.53, 0.58]], s: 22 },
    ];
    strokes.forEach((st) => {
      for (let i = 1; i < st.pts.length; i++) {
        const [ax, ay] = st.pts[i - 1], [bx, by] = st.pts[i];
        for (let t = 0; t < 1; t += 0.02) {
          const x0 = (ax + (bx - ax) * t) * w, y0 = (ay + (by - ay) * t) * h;
          const x1 = (ax + (bx - ax) * (t + 0.02)) * w, y1 = (ay + (by - ay) * (t + 0.02)) * h;
          dab(x0, y0, x1, y1, st.s * (0.85 + Math.sin(t * Math.PI) * 0.3), st.c);
        }
      }
    });
  };

  resize();
  intro();
  let resizeTimer;
  window.addEventListener('resize', () => { clearTimeout(resizeTimer); resizeTimer = setTimeout(resize, 150); });

  // Painting with a mouse or pen only — touch keeps scrolling the page
  const canPaint = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  if (!canPaint) { palette?.remove(); return; }
  hero.classList.add('painting-on');

  let last = null, lastT = 0;
  const point = (e) => { const r = canvas.getBoundingClientRect(); return { x: e.clientX - r.left, y: e.clientY - r.top }; };
  hero.addEventListener('pointerdown', (e) => {
    if (e.button !== 0 || e.target.closest('a, button, .palette')) return;
    e.preventDefault();
    last = point(e); lastT = performance.now();
    hero.setPointerCapture(e.pointerId);
  });
  hero.addEventListener('pointermove', (e) => {
    if (!last) return;
    const p = point(e), now = performance.now();
    const speed = Math.hypot(p.x - last.x, p.y - last.y) / Math.max(now - lastT, 1);
    const size = Math.max(10, 34 - speed * 9) * (e.pressure && e.pointerType === 'pen' ? e.pressure * 1.6 : 1);
    dab(last.x, last.y, p.x, p.y, size, colour);
    last = p; lastT = now;
  });
  const end = () => { last = null; };
  hero.addEventListener('pointerup', end);
  hero.addEventListener('pointercancel', end);

  // Palette
  $$('.swatch', palette).forEach((btn, i) => {
    const c = colours[i];
    btn.style.setProperty('--c', c);
    btn.setAttribute('aria-pressed', c === colour);
    btn.addEventListener('click', () => {
      colour = c;
      $$('.swatch', palette).forEach((b) => b.setAttribute('aria-pressed', b === btn));
    });
  });
  $('.wash', palette).addEventListener('click', () => ctx.clearRect(0, 0, w, h));
}

/* =====================================================================
   Works list pages
   ===================================================================== */
function buildWorks() {
  const grid = $('.work-grid');
  if (!grid) return;
  const section = document.body.dataset.section;
  const list = PROJECTS.filter((p) => p.section === section);
  grid.innerHTML = list.map(workCard).join('');

  // Filter personal work by medium
  const filters = $('.filters');
  if (filters) {
    const status = $('.filter-status');
    const opts = [['', 'Everything'], ['Gouache', 'Gouache on paper'], ['Digital', 'Digital']];
    filters.innerHTML = opts.map(([v, label]) => {
      const n = v ? list.filter((p) => p.medium === v).length : list.length;
      return `<button type="button" class="chip-btn" data-medium="${v}" aria-pressed="${v === ''}">${label} <span class="n">${n}</span></button>`;
    }).join('');
    $$('.chip-btn', filters).forEach((btn) => btn.addEventListener('click', () => {
      const v = btn.dataset.medium;
      $$('.chip-btn', filters).forEach((b) => b.setAttribute('aria-pressed', b === btn));
      let shown = 0;
      $$('.work-card', grid).forEach((card) => { const on = !v || card.dataset.medium === v; card.hidden = !on; shown += on; });
      if (status) status.textContent = `Showing ${shown} ${shown === 1 ? 'piece' : 'pieces'}${v ? `: ${btn.firstChild.textContent.trim().toLowerCase()}` : ''}.`;
    }));
  }
  $$('[data-count]').forEach((el) => {
    el.textContent = String(PROJECTS.filter((p) => p.section === el.dataset.count).length).padStart(2, '0');
  });
}

/* =====================================================================
   Project page
   ===================================================================== */
function buildProject() {
  if (document.body.dataset.page !== 'project') return;
  const main = $('#main');
  const slug = new URLSearchParams(location.search).get('p');
  const p = PROJECTS.find((x) => x.slug === slug);

  if (!p) {
    document.title = `Project not found | ${SITE.name}`;
    main.innerHTML = `<section class="page-head wrap"><p class="eyebrow">Error 404</p><h1 class="display">This canvas <em>is blank.</em></h1>
      <p class="lede">I couldn’t find that project. It may have moved.</p>
      <p style="margin-top:28px;display:flex;gap:12px;flex-wrap:wrap"><a class="btn" href="works.html">Client work</a><a class="btn ghost" href="personal-work.html">Personal work</a></p></section>`;
    return;
  }

  document.body.dataset.pigment = p.section;
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
    ['Section', SECTION_NAMES[p.section]],
  ].filter(([, v]) => v);

  const imgs = p.images;
  const platesClass = (imgs.length === 1 ? 'plates single' : imgs.length === 3 ? 'plates three' : 'plates') + ` is-${frameOf(p)}`;
  const plates = imgs.map((im, i) => {
    return `<figure class="plate">
      <button type="button" data-i="${i}" aria-label="Open image ${i + 1} of ${imgs.length} full screen"><img src="${esc(im.src)}" alt="${esc(im.alt)}" loading="${i < 2 ? 'eager' : 'lazy'}" decoding="async"></button>
    </figure>`;
  }).join('');

  main.innerHTML = `
    <section class="project-hero">
      <div class="wrap">
        ${plaque(p.section, String(idx + 1).padStart(2, '0'))}
        <nav class="crumbs" aria-label="Breadcrumb"><a href="${SECTION_PAGES[p.section]}">← ${SECTION_NAMES[p.section]}</a><span aria-hidden="true">/</span><span aria-current="page">${String(idx + 1).padStart(2, '0')} of ${String(siblings.length).padStart(2, '0')}</span></nav>
        <h1 class="display">${esc(p.title)}</h1>
        <p class="summary">${esc(p.summary)}</p>
      </div>
      <span class="big-num" aria-hidden="true">${String(idx + 1).padStart(2, '0')}</span>
    </section>
    <div class="wrap">
      <section class="project-body" aria-label="About this project">
        <dl class="facts">${facts.map(([k, v]) => `<div><dt>${k}</dt><dd>${esc(v)}</dd></div>`).join('')}</dl>
        <div class="project-text">${p.description.map((d) => `<p>${esc(d)}</p>`).join('')}
          ${p.netsoc ? `<div class="journey" role="group" aria-label="My role at Netsoc"><p class="journey-intro">${esc(NETSOC_JOURNEY.intro)}</p>${LINES.netsoc()}</div>` : ''}
        </div>
      </section>
      <section class="${platesClass}" aria-label="Images">${plates}</section>
      <nav class="pager" aria-label="More projects">
        <a href="${projectUrl(prev)}"><small>← Previous <span lang="es">· Estación anterior</span></small><b>${esc(prev.title)}</b></a>
        <a href="${projectUrl(next)}"><small><span lang="es">Próxima estación ·</span> Next →</small><b>${esc(next.title)}</b></a>
      </nav>
    </div>`;

  setupLightbox(imgs);
}

function setupLightbox(imgs, selector = '.plate button') {
  const dlg = document.createElement('dialog');
  dlg.className = 'lightbox on-dark';
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
  const wall = $('.wall');
  if (!wall) return;
  wall.innerHTML = PAINTINGS.map((pt, i) => `
    <figure class="canvas-piece" id="painting-${i + 1}">
      <span class="picture-light" aria-hidden="true"></span>
      <button type="button" class="gilt" data-i="${i}" aria-label="View ${esc(pt.title)} full screen">
        <span class="ph" data-src="${esc(pt.src)}" data-alt="${esc(pt.alt || pt.title)}" style="aspect-ratio:${i === 1 ? '1' : '0.81'}"></span>
      </button>
      <figcaption class="wall-card">
        <span class="sala-no" aria-hidden="true">Nº ${String(i + 1).padStart(3, '0')}</span>
        <b>${esc(pt.title)}</b>
        <span class="med">${esc([pt.medium, pt.size, pt.year].filter(Boolean).join(' · '))}</span>
        ${pt.note ? `<span class="note">${esc(pt.note)}</span>` : ''}
      </figcaption>
    </figure>`).join('');
  setupLightbox(PAINTINGS.map((pt) => ({ src: pt.src, alt: pt.alt || pt.title })), '.canvas-piece .gilt');
}

/* =====================================================================
   About — cabinet of favourite things
   ===================================================================== */
function buildCabinet() {
  const cab = $('.cabinet');
  if (!cab) return;
  const backs = [
    [PIGMENTS.paintings.hex, '#fff'], [PIGMENTS.about.hex, '#fff'], ['#55524c', '#fff'], [PIGMENTS.personal.hex, '#fff'],
    [PIGMENTS.client.hex, '#fff'], [PIGMENTS.contact.hex, '#1b1a17'], [PIGMENTS.shop.hex, '#1b1a17'],
  ];
  cab.innerHTML = FAVOURITES.map((f, i) => {
    const [c, ci] = backs[i % backs.length];
    const no = String(i + 1).padStart(2, '0');
    return `<li class="cell" style="--c:${c};--ci:${ci}">
      <button class="cell-btn" type="button" aria-expanded="false" aria-describedby="fav-story-${i}">
        <span class="front">
          <img src="${esc(f.img)}" alt="" loading="lazy">
          <span class="tagline"><span><small>No. ${no} · ${esc(f.label)}</small><b>${esc(f.name)}</b></span><span class="flip-hint" aria-hidden="true">Flip ↻</span></span>
        </span>
        <span class="back" aria-hidden="true"><span><small>${esc(f.label)}</small><b>${esc(f.name)}</b></span><span class="story-copy">${esc(f.story)}</span></span>
      </button>
      <p class="sr-only" id="fav-story-${i}">${esc(f.story)}</p>
    </li>`;
  }).join('');
  $$('.cell-btn', cab).forEach((b) => b.addEventListener('click', () => {
    b.setAttribute('aria-expanded', b.getAttribute('aria-expanded') !== 'true');
  }));
}

/* =====================================================================
   Contact
   ===================================================================== */
function buildContact() {
  const g = $('.greeting');
  if (g && !reduceMotion) {
    const words = $$('span', g);
    let k = 0;
    setInterval(() => {
      words[k].classList.remove('on');
      k = (k + 1) % words.length;
      words[k].classList.add('on');
    }, 2200);
  }
  $$('[data-email]').forEach((el) => { el.textContent = SITE.email; el.href = `mailto:${SITE.email}`; });
  $$('[data-shop-mail]').forEach((el) => { el.href = `mailto:${SITE.email}?subject=${encodeURIComponent('Tell me when the shop opens')}`; });
  const socials = $('.contact-socials');
  if (socials) socials.innerHTML = SITE.socials.map((s) => `<a href="${esc(s.url)}" target="_blank" rel="noopener">${esc(s.name)}<span class="sr-only"> (opens in a new tab)</span></a>`).join('');

  const form = $('.note-form');
  if (!form) return;
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const d = new FormData(form);
    const subject = `${d.get('topic') || 'Hello'} — from ${d.get('name')}`;
    const body = `${d.get('message')}\n\n— ${d.get('name')} (${d.get('email')})`;
    window.location.href = `mailto:${SITE.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    $('.form-status', form).innerHTML = `Your email app should open with the message ready. Just press send. Nothing opened? Write to <a href="mailto:${esc(SITE.email)}">${esc(SITE.email)}</a>.`;
  });
}

/* ===================================================================== */
document.addEventListener('DOMContentLoaded', () => {
  renderPlaques();
  renderLines();
  buildChrome();
  buildHome();
  buildWorks();
  buildProject();
  buildPaintings();
  buildCabinet();
  buildContact();
  loadImages();
  setupTransitions();
});
