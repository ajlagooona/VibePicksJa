/* ============================================================
   VibePicksJA — app.js
   MVP investor demo · all data and logic in one file
   ============================================================ */

'use strict';

/* ─── Venue data ─────────────────────────────────────────────
   Each venue object holds all data needed across all screens.
   Replace or extend this array as real venue data is ingested.
   ─────────────────────────────────────────────────────────── */
const VENUES = [
  {
    id: 'v1',
    name: "Norma's on the Terrace",
    location: 'Devon House, Kingston',
    parish: 'kingston',
    category: 'dining',
    type: 'Fine dining',
    color: '#5DCAA5',
    price_jmd: 'JMD 5,000–10,000',
    price_usd: 'USD 32–65',
    rating: 4.9,
    reviews: 318,
    safespace: 95,
    tastemaker: true,
    badge: '#1 Most loved',
    w3w: '///mango.terrace.bloom',
    description: "Set in the grounds of Devon House, Norma's is Kingston's most iconic dining terrace. Impeccable Jamaican cuisine, a lush garden setting, and a warm staff that makes every visit feel like a celebration. Reservations strongly recommended on weekends.",
    tags: ['Waterfront', 'Live music Fri–Sat', 'Credit cards', 'Reservations', 'Smart casual'],
    tagStyles: ['tag-teal', 'tag-amber', 'tag-blue', 'tag-green', 'tag-gray'],
    features: [
      { label: 'Credit cards',    yes: true  },
      { label: 'Reservations',    yes: true  },
      { label: 'Live music',      yes: true  },
      { label: 'Smoke-free',      yes: true  },
      { label: 'Smart dress',     yes: true  },
      { label: 'Outdoor terrace', yes: true  },
    ],
    reviews_sample: [
      { name: 'Tamara W.', context: 'Group · Celebration', stars: 5, text: "Absolutely magical setting. The food was outstanding and our server Marcus made the whole evening feel so special. Norma's never disappoints." },
      { name: 'Priya R.',  context: 'Solo · Business dinner', stars: 5, text: "As a solo woman I felt completely comfortable and well looked-after. The garden lighting is beautiful and the staff checked in without being intrusive." },
    ],
    occasion_scores: { chill: 0.72, celebrate: 0.97, date: 0.91, family: 0.60, work: 0.78, explore: 0.55 },
  },
  {
    id: 'v2',
    name: 'Tracks & Records',
    location: 'Marketplace, Kingston',
    parish: 'kingston',
    category: 'bar',
    type: 'Sports bar & lounge',
    color: '#7F77DD',
    price_jmd: 'JMD 2,000–5,000',
    price_usd: 'USD 13–32',
    rating: 4.5,
    reviews: 512,
    safespace: null,
    tastemaker: true,
    badge: 'Top lounge',
    w3w: '///beats.crowd.loud',
    description: "Usain Bolt's Kingston flagship. Multiple screens, a buzzing sports atmosphere, and cocktails that keep pace with the action. The go-to spot for game nights, after-work gatherings, and anyone who wants great food with their sport.",
    tags: ['Sports bar', 'DJ nightly', 'Credit cards', 'Casual dresscode', 'Late night'],
    tagStyles: ['tag-purple', 'tag-amber', 'tag-blue', 'tag-teal', 'tag-gray'],
    features: [
      { label: 'Credit cards',  yes: true  },
      { label: 'Reservations',  yes: false },
      { label: 'Live sports',   yes: true  },
      { label: 'DJ nightly',    yes: true  },
      { label: 'Casual dress',  yes: true  },
      { label: 'Late night',    yes: true  },
    ],
    reviews_sample: [
      { name: 'Damion B.', context: 'Group · Sports night', stars: 5, text: "Best spot in Kingston for a big match. Great atmosphere, cold Red Stripe, and the wings are fire. Will be back every weekend." },
      { name: 'Kezia L.',  context: 'Couple · Date night',  stars: 4, text: "Louder than we expected but the food was really good and the cocktails were creative. Arrived early and got a great spot." },
    ],
    occasion_scores: { chill: 0.60, celebrate: 0.70, date: 0.55, family: 0.35, work: 0.88, explore: 0.50 },
  },
  {
    id: 'v3',
    name: 'Scotchies Jerk Centre',
    location: 'Hope Road, Kingston',
    parish: 'kingston',
    category: 'dining',
    type: 'Casual dining',
    color: '#D85A30',
    price_jmd: 'JMD 800–2,000',
    price_usd: 'USD 5–13',
    rating: 4.8,
    reviews: 924,
    safespace: 81,
    tastemaker: false,
    badge: 'Best jerk in JA',
    w3w: '///jerk.smoke.fire',
    description: "The definitive Jamaican jerk experience. Pork, chicken and fish slow-cooked over pimento wood in the open air. No frills, no pretence — just Jamaica on a plate. Arguably the best jerk in the island.",
    tags: ['Open fire jerk', 'Outdoor seating', 'Budget friendly', 'Local favourite', 'Cash & cards'],
    tagStyles: ['tag-coral', 'tag-teal', 'tag-green', 'tag-amber', 'tag-blue'],
    features: [
      { label: 'Credit cards',   yes: true  },
      { label: 'Outdoor only',   yes: true  },
      { label: 'Budget friendly',yes: true  },
      { label: 'Reservations',   yes: false },
      { label: 'Open fire grill',yes: true  },
      { label: 'Takeaway',       yes: true  },
    ],
    reviews_sample: [
      { name: 'Marcus J.',  context: 'Group · Casual lunch',  stars: 5, text: "This is the real deal. Been coming for years and the pimento wood jerk is still unmatched anywhere in Kingston. Queue moves fast." },
      { name: 'Sandra O.',  context: 'Solo · Quick lunch',    stars: 4, text: "Iconic spot. Outdoor picnic-bench seating, great music playing, and the best jerk chicken I have ever had. Cash is easier." },
    ],
    occasion_scores: { chill: 0.88, celebrate: 0.55, date: 0.42, family: 0.80, work: 0.60, explore: 0.75 },
  },
  {
    id: 'v4',
    name: 'Knutsford Yoga & Wellness',
    location: 'New Kingston',
    parish: 'kingston',
    category: 'wellness',
    type: 'Fitness & wellness',
    color: '#1D9E75',
    price_jmd: 'JMD 1,500–4,000',
    price_usd: 'USD 10–26',
    rating: 4.9,
    reviews: 187,
    safespace: 97,
    tastemaker: true,
    badge: 'Top wellness',
    w3w: '///calm.breathe.well',
    description: "Kingston's premier urban wellness studio. Daily yoga, meditation and breathwork sessions in a beautifully curated space. Women's-only sessions every morning. Private sessions and corporate bookings available.",
    tags: ['Yoga classes', 'Meditation', "Women's sessions", 'Credit cards', 'Private sessions'],
    tagStyles: ['tag-teal', 'tag-green', 'tag-pink', 'tag-blue', 'tag-purple'],
    features: [
      { label: 'Credit cards',    yes: true },
      { label: 'Bookings required',yes: true },
      { label: "Women's classes", yes: true },
      { label: 'Smoke-free',      yes: true },
      { label: 'Changing rooms',  yes: true },
      { label: 'Juice bar',       yes: true },
    ],
    reviews_sample: [
      { name: 'Rochelle T.', context: 'Solo · Morning session', stars: 5, text: "My sanctuary. The early morning women's sessions have transformed my week. The instructors are warm, knowledgeable and genuinely caring." },
      { name: 'Nneka A.',    context: 'Solo · Meditation class', stars: 5, text: "Discovered this place through VibePicksJA and now I come three times a week. Cleanest facilities, most welcoming atmosphere." },
    ],
    occasion_scores: { chill: 0.92, celebrate: 0.40, date: 0.50, family: 0.45, work: 0.55, explore: 0.70 },
  },
  {
    id: 'v5',
    name: 'Hope Botanical Gardens',
    location: 'Hope Pastures, Kingston',
    parish: 'kingston',
    category: 'park',
    type: 'Park & outdoor',
    color: '#639922',
    price_jmd: 'Free / JMD 300 zoo',
    price_usd: 'Free / ~USD 2',
    rating: 4.7,
    reviews: 443,
    safespace: 88,
    tastemaker: false,
    badge: 'Best park',
    w3w: '///green.hope.bloom',
    description: "Jamaica's most beloved green space. 200 acres of botanical gardens, a zoo, shaded walking trails and open picnic lawns. Perfect for families, solo walkers, runners, and anyone who needs to breathe.",
    tags: ['Free entry', 'Zoo on-site', 'Guided tours', 'Picnic areas', 'Heritage site'],
    tagStyles: ['tag-green', 'tag-teal', 'tag-amber', 'tag-green', 'tag-blue'],
    features: [
      { label: 'Free entry',   yes: true },
      { label: 'Zoo included', yes: true },
      { label: 'Picnic areas', yes: true },
      { label: 'Guided tours', yes: true },
      { label: 'Kids welcome', yes: true },
      { label: 'Parking',      yes: true },
    ],
    reviews_sample: [
      { name: 'Claudette R.', context: 'Family · Weekend outing', stars: 5, text: "Our children absolutely love it here. The zoo has been upgraded and the botanical section is so peaceful. A proper full-day outing for the whole family." },
      { name: 'Amelia S.',    context: 'Solo · Morning walk',     stars: 5, text: "I run here three mornings a week. It's safe, beautifully maintained and the garden staff are always friendly. My favourite spot in Kingston." },
    ],
    occasion_scores: { chill: 0.95, celebrate: 0.40, date: 0.65, family: 0.97, work: 0.30, explore: 0.80 },
  },
  {
    id: 'v6',
    name: 'Caymanas Park & Fun Zone',
    location: 'St. Catherine',
    parish: 'st-catherine',
    category: 'family',
    type: 'Family entertainment',
    color: '#378ADD',
    price_jmd: 'JMD 500–1,500',
    price_usd: 'USD 3–10',
    rating: 4.4,
    reviews: 276,
    safespace: 89,
    tastemaker: true,
    badge: 'Best family',
    w3w: '///race.family.fun',
    description: "The Caribbean's top horse racing venue doubles as a full family entertainment destination. Rides, food court, racing and open space — a complete day out for all ages from the little ones to the grandparents.",
    tags: ["Kids' rides", 'Food court', 'Horse racing', 'Parking', 'Weekend events'],
    tagStyles: ['tag-blue', 'tag-teal', 'tag-amber', 'tag-green', 'tag-purple'],
    features: [
      { label: 'Credit cards',    yes: true },
      { label: 'Free parking',    yes: true },
      { label: "Kids' rides",     yes: true },
      { label: 'Food court',      yes: true },
      { label: 'Horse racing',    yes: true },
      { label: 'Smoke-free zones',yes: true },
    ],
    reviews_sample: [
      { name: 'Fitzroy M.',  context: 'Family · Weekend', stars: 5, text: "Best family day out in St. Catherine hands down. The kids were on the rides all day and we got to catch the races in the afternoon. Great value." },
      { name: 'Donna-Kay P.',context: 'Family · Birthday party', stars: 4, text: "Hosted my daughter's birthday here. The fun zone staff were accommodating and the food court had something for everyone. Would return." },
    ],
    occasion_scores: { chill: 0.65, celebrate: 0.78, date: 0.45, family: 0.97, work: 0.30, explore: 0.60 },
  },
  {
    id: 'v7',
    name: 'Fiction Nightclub',
    location: 'New Kingston',
    parish: 'kingston',
    category: 'club',
    type: 'Club & events',
    color: '#993556',
    price_jmd: 'JMD 1,500–4,000',
    price_usd: 'USD 10–26',
    rating: 4.3,
    reviews: 681,
    safespace: null,
    tastemaker: false,
    badge: 'Top nightlife',
    w3w: '///night.pulse.fiction',
    description: "Kingston's premium nightlife venue. World-class DJs, immaculate sound system and a crowd that knows how to move. Friday and Saturday nights are unmissable. Book a VIP table for weekends to guarantee your spot.",
    tags: ['Top club', 'DJ events', 'Smart casual', 'Credit cards', 'VIP tables'],
    tagStyles: ['tag-pink', 'tag-purple', 'tag-amber', 'tag-teal', 'tag-blue'],
    features: [
      { label: 'Credit cards', yes: true },
      { label: 'VIP tables',   yes: true },
      { label: 'Smart casual', yes: true },
      { label: 'Late night',   yes: true },
      { label: 'DJ resident',  yes: true },
      { label: 'Smoke area',   yes: true },
    ],
    reviews_sample: [
      { name: 'Rohan C.',  context: 'Group · Saturday night', stars: 5, text: "Fiction on a Saturday is unmatched in Kingston. The sound system is incredible and the DJ selection is always on point. VIP table is worth it." },
      { name: 'Simone K.', context: 'Group · Birthday',       stars: 4, text: "Great energy, great music. Can get quite packed from midnight so arrive early or book a table. One of the best clubs in the Caribbean." },
    ],
    occasion_scores: { chill: 0.30, celebrate: 0.92, date: 0.70, family: 0.05, work: 0.45, explore: 0.55 },
  },
];

/* ─── Quiz data ──────────────────────────────────────────────
   Each step defines type, key, question copy, and options.
   ─────────────────────────────────────────────────────────── */
const QUIZ_STEPS = [
  {
    key: 'occasion',
    label: 'Step 1 of 6',
    question: "What's the occasion?",
    sub: 'Pick the one that fits best right now.',
    type: 'tiles',
    options: [
      { icon: '&#127774;', name: 'Chill day out',     sub: 'No plans, just vibes',         val: 'chill'     },
      { icon: '&#127881;', name: 'Celebration',        sub: 'Birthday, anniversary',         val: 'celebrate' },
      { icon: '&#10084;',  name: 'Date night',         sub: 'Romantic, intimate setting',    val: 'date'      },
      { icon: '&#128106;', name: 'Family outing',      sub: 'Kids welcome',                  val: 'family'    },
      { icon: '&#128084;', name: 'After work link',    sub: 'Quick drinks or dinner',        val: 'work'      },
      { icon: '&#127758;', name: 'Explore new spots',  sub: 'Off the beaten path',           val: 'explore'   },
    ],
  },
  {
    key: 'group',
    label: 'Step 2 of 6',
    question: "Who's coming with you?",
    sub: 'This helps us find the right size and vibe.',
    type: 'tiles',
    options: [
      { icon: '&#128100;', name: 'Just me',       sub: 'Solo trip or remote work', val: 'solo'       },
      { icon: '&#128145;', name: 'Two of us',     sub: 'Date or close friend',     val: 'couple'     },
      { icon: '&#128101;', name: 'Small group',   sub: '3–6 people',               val: 'smallgroup' },
      { icon: '&#127881;', name: 'Big crew',      sub: '7+ people, need space',    val: 'bigcrew'    },
    ],
  },
  {
    key: 'parish',
    label: 'Step 3 of 6',
    question: 'Where in Jamaica?',
    sub: 'Pick your area — or where you want to end up.',
    type: 'parish',
    options: ['Kingston / St. Andrew', 'St. Catherine', 'St. Ann', 'Manchester', 'St. Elizabeth', 'Clarendon', 'Surprise me'],
  },
  {
    key: 'budget',
    label: 'Step 4 of 6',
    question: "What's the budget per person?",
    sub: 'Roughly how much are you spending on food or entry?',
    type: 'budget',
    options: [
      { jmd: 'Under JMD 2,000', usd: '~USD 13',      lbl: 'Budget friendly', val: 'low'    },
      { jmd: 'JMD 2,000–5,000', usd: '~USD 13–32',   lbl: 'Mid range',       val: 'mid'    },
      { jmd: 'JMD 5,000–10,000',usd: '~USD 32–65',   lbl: 'Upper mid',       val: 'upper'  },
      { jmd: 'USD 65+',          usd: 'Splash out',   lbl: 'Splash out',      val: 'splash' },
    ],
  },
  {
    key: 'energy',
    label: 'Step 5 of 6',
    question: "What's the energy you're after?",
    sub: 'Pick all that feel right — as many as you like.',
    type: 'multi',
    options: ['Lively & loud', 'Relaxed & quiet', 'Live music', 'Waterfront setting', 'Outdoor seating', 'Sports on screens', 'Dancing later', 'Healthy / juice bar', 'Wellness & fitness', 'Family-friendly'],
  },
  {
    key: 'needs',
    label: 'Step 6 of 6',
    question: 'Any must-haves?',
    sub: 'Toggle anything that matters for your visit.',
    type: 'toggles',
    options: [
      { label: 'Credit cards accepted',  sub: 'No cash needed',                  rose: false },
      { label: 'Reservation available',  sub: 'Can book ahead',                  rose: false },
      { label: 'No strict dresscode',    sub: 'Casual wear welcome',             rose: false },
      { label: 'Smoke-free venue',       sub: 'No smoking inside',               rose: false },
      { label: 'SafeSpace rated &#9792;',sub: 'Verified for solo female comfort', rose: true  },
      { label: 'Outdoor seating',        sub: 'Al fresco option available',      rose: false },
      { label: 'Juice bar',              sub: 'Healthy drinks on the menu',      rose: false },
      { label: 'Kids welcome',           sub: 'Family-friendly setup',           rose: false },
    ],
  },
];

/* ─── State ──────────────────────────────────────────────────
   Tracks current quiz step, answers, and active screen.
   ─────────────────────────────────────────────────────────── */
const State = {
  currentScreen: 'home',
  quizStep: 0,
  quizAnswers: {},
  activeFilters: { home: 'all', browse: 'all' },
  currentDetail: null,
  savedVenues: new Set(),
};

/* ─── Helpers ────────────────────────────────────────────────*/
function el(id) { return document.getElementById(id); }

function toast(msg) {
  const t = el('toast');
  t.textContent = msg;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 2500);
}

function stars(n) {
  return '&#9733;'.repeat(Math.floor(n)) + (n % 1 >= 0.5 ? '&#9734;' : '');
}

function animateStatNumber(node) {
  if (!node || node.dataset.counted === 'true') return;
  node.dataset.counted = 'true';

  const target = Number(node.dataset.countTo || 0);
  const suffix = node.dataset.countSuffix || '';
  const duration = 1100;
  const startTime = performance.now();

  function tick(now) {
    const progress = Math.min(1, (now - startTime) / duration);
    const eased = 1 - Math.pow(1 - progress, 3);
    node.textContent = `${Math.round(target * eased).toLocaleString()}${suffix}`;
    if (progress < 1) requestAnimationFrame(tick);
  }

  requestAnimationFrame(tick);
}

function initStatCounters() {
  const nums = Array.from(document.querySelectorAll('[data-count-to]'));
  if (!nums.length) return;

  if (!('IntersectionObserver' in window)) {
    nums.forEach(animateStatNumber);
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      animateStatNumber(entry.target);
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.45 });

  nums.forEach(num => observer.observe(num));
}

/* ─── Screen routing ─────────────────────────────────────────*/
function showScreen(id) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  el(`screen-${id}`).classList.add('active');
  State.currentScreen = id;
  updateNav(id);
  window.scrollTo({ top: 0, behavior: 'smooth' });

  /* Initialise screen-specific content on first show */
  if (id === 'home')   renderHomeCards('all');
  if (id === 'browse') { renderBrowseCards('all'); renderBrowseFilters(); }
  if (id === 'quiz')   { State.quizStep = 0; State.quizAnswers = {}; renderQuiz(); }
  if (id === 'ss')     renderSSCards();
}

function updateNav(id) {
  document.querySelectorAll('.nav-links a').forEach(a => a.classList.remove('active'));
  const map = { home: 'nl-home', browse: 'nl-browse', quiz: 'nl-quiz', ss: 'nl-ss' };
  if (map[id]) el(map[id]).classList.add('active');
}

function toggleMobileMenu() {
  /* Simple toggle — expand nav links on mobile */
  const links = document.querySelector('.nav-links');
  const open  = links.style.display === 'flex';
  links.style.display = open ? 'none' : 'flex';
  links.style.flexDirection = 'column';
  links.style.position = 'absolute';
  links.style.top = '54px';
  links.style.left = '0';
  links.style.right = '0';
  links.style.background = '#fff';
  links.style.padding = '16px 24px';
  links.style.borderBottom = '0.5px solid rgba(26,26,24,0.10)';
  links.style.zIndex = '200';
}

/* ─── Card builder ───────────────────────────────────────────
   Builds a single venue card DOM element.
   ─────────────────────────────────────────────────────────── */
function buildCard(v) {
  const div = document.createElement('div');
  div.className = 'venue-card';
  div.setAttribute('role', 'article');
  div.setAttribute('aria-label', v.name);
  div.onclick = () => openDetail(v.id);

  const tasteHtml = v.tastemaker
    ? `<span class="tastemaker-badge">Tastemaker pick</span>`
    : '';

  const ssScoreHtml = v.safespace
    ? `<div class="ss-score-wrap">
         <div class="ss-score-label">&#9792; SafeSpace</div>
         <div class="ss-score-num">${v.safespace}</div>
         <div class="ss-score-denom">/100</div>
       </div>`
    : `<div class="ss-score-wrap">
         <div class="ss-score-num" style="color:var(--ink-4)">—</div>
         <div class="ss-score-denom">unrated</div>
       </div>`;

  const ssStripHtml = v.safespace
    ? `<div class="ss-strip">
         <span>&#9792; SafeSpace ${v.safespace}/100</span>
         <div class="ss-bar-bg"><div class="ss-bar-fill" style="width:${v.safespace}%"></div></div>
       </div>`
    : '';

  const tagHtml = v.tags.slice(0, 4).map((t, i) =>
    `<span class="tag ${v.tagStyles[i] || 'tag-teal'}">${t}</span>`
  ).join('');

  div.innerHTML = `
    <div class="card-banner" style="background:${v.color}">
      <span class="match-badge">${v.badge}</span>
      ${tasteHtml}
    </div>
    <div class="card-body">
      <div class="card-top">
        <div>
          <div class="venue-name">${v.name}</div>
          <div class="venue-meta">${v.location} &middot; ${v.type}</div>
        </div>
        ${ssScoreHtml}
      </div>
      <div class="rating-row">
        <span class="stars">${stars(v.rating)}</span>
        <span>${v.rating} &middot; ${v.reviews.toLocaleString()} reviews</span>
        <span class="price-tag">${v.price_jmd.split('–')[0].trim()}+</span>
      </div>
      <div>${tagHtml}</div>
    </div>
    ${ssStripHtml}
  `;

  return div;
}

/* ─── Home screen ────────────────────────────────────────────*/
function homeFilter(cat, btn) {
  document.querySelectorAll('#home-cat-strip .cat-pill').forEach(p => p.classList.remove('on'));
  btn.classList.add('on');
  State.activeFilters.home = cat;
  renderHomeCards(cat);
}

function renderHomeCards(cat) {
  const grid = el('home-card-grid');
  grid.innerHTML = '';
  const filtered = cat === 'all'
    ? VENUES
    : VENUES.filter(v => v.category === cat);
  filtered.forEach(v => grid.appendChild(buildCard(v)));
}

/* ─── Browse screen ──────────────────────────────────────────*/
const BROWSE_FILTERS = [
  'SafeSpace &#9792;', 'Credit cards', 'Live music',
  'Waterfront', 'Under JMD 2k', 'Reservations', 'Outdoor seating',
];

function renderBrowseFilters() {
  const row = el('browse-filter-row');
  if (row.children.length > 0) return; /* only render once */
  BROWSE_FILTERS.forEach(f => {
    const btn = document.createElement('button');
    btn.className = 'filter-pill';
    btn.innerHTML = f;
    btn.onclick = () => btn.classList.toggle('on');
    row.appendChild(btn);
  });
}

function browseFilter(cat, btn) {
  document.querySelectorAll('#browse-cat-strip .cat-pill').forEach(p => p.classList.remove('on'));
  btn.classList.add('on');
  State.activeFilters.browse = cat;
  renderBrowseCards(cat);
}

function renderBrowseCards(cat) {
  const grid = el('browse-card-grid');
  grid.innerHTML = '';
  const filtered = cat === 'all'
    ? VENUES
    : VENUES.filter(v => v.category === cat);
  filtered.forEach(v => grid.appendChild(buildCard(v)));
}

/* ─── Venue detail ───────────────────────────────────────────*/
function openDetail(id) {
  const v = VENUES.find(x => x.id === id);
  if (!v) return;
  State.currentDetail = id;
  renderDetail(v);
  showScreen('detail');
}

const FEATURE_ICONS = [
  { match: ['credit', 'card', 'cash'], icon: 'fa-solid fa-credit-card' },
  { match: ['reservation', 'booking', 'bookings', 'vip table'], icon: 'fa-solid fa-calendar-check' },
  { match: ['music', 'dj'], icon: 'fa-solid fa-music' },
  { match: ['smoke-free', 'smoke free', 'no smoking'], icon: 'fa-solid fa-ban-smoking' },
  { match: ['dress', 'casual'], icon: 'fa-solid fa-shirt' },
  { match: ['outdoor', 'terrace', 'picnic'], icon: 'fa-solid fa-umbrella-beach' },
  { match: ['parking'], icon: 'fa-solid fa-square-parking' },
  { match: ['kids', 'family'], icon: 'fa-solid fa-children' },
  { match: ['food', 'juice'], icon: 'fa-solid fa-utensils' },
  { match: ['horse'], icon: 'fa-solid fa-horse' },
  { match: ['zoo'], icon: 'fa-solid fa-paw' },
  { match: ['tour', 'guided'], icon: 'fa-solid fa-map-location-dot' },
  { match: ['budget', 'free'], icon: 'fa-solid fa-wallet' },
  { match: ['takeaway'], icon: 'fa-solid fa-bag-shopping' },
  { match: ['grill', 'fire'], icon: 'fa-solid fa-fire-burner' },
  { match: ['women'], icon: 'fa-solid fa-person-dress' },
  { match: ['changing'], icon: 'fa-solid fa-door-open' },
  { match: ['late night'], icon: 'fa-solid fa-moon' },
  { match: ['sports'], icon: 'fa-solid fa-tv' },
];

function featureIconClass(feature) {
  if (!feature.yes) return 'fa-solid fa-xmark';
  const label = feature.label.toLowerCase();
  const found = FEATURE_ICONS.find(item => item.match.some(term => label.includes(term)));
  return found ? found.icon : 'fa-solid fa-check';
}

function toggleSaveVenue(id) {
  const wasSaved = State.savedVenues.has(id);
  if (wasSaved) {
    State.savedVenues.delete(id);
  } else {
    State.savedVenues.add(id);
  }

  const btn = document.querySelector(`[data-save-venue="${id}"]`);
  const alert = document.querySelector(`[data-save-alert="${id}"]`);
  if (!btn || !alert) return;

  const isSaved = State.savedVenues.has(id);
  btn.classList.toggle('saved', isSaved);
  btn.setAttribute('aria-pressed', String(isSaved));
  btn.innerHTML = `<i class="${isSaved ? 'fa-solid' : 'fa-regular'} fa-bookmark" aria-hidden="true"></i>`;
  alert.textContent = isSaved ? 'Saved' : 'Removed';
  alert.classList.add('show');
  setTimeout(() => alert.classList.remove('show'), 1800);
}

function renderDetail(v) {
  const isSaved = State.savedVenues.has(v.id);
  const featHtml = v.features.map(f => `
    <div class="feat-item">
      <span class="feat-icon ${f.yes ? 'yes' : 'no'}" aria-hidden="true"><i class="${featureIconClass(f)}"></i></span>
      <span>${f.label}</span>
    </div>
  `).join('');

  const ssHtml = v.safespace ? (() => {
    const dims = [
      { label: 'Lighting quality',        pct: Math.min(100, Math.round(v.safespace * 0.97)) },
      { label: 'Staff responsiveness',    pct: Math.min(100, Math.round(v.safespace * 1.00)) },
      { label: 'Solo-friendly seating',   pct: Math.min(100, Math.round(v.safespace * 0.92)) },
      { label: 'Female-reviewed rating',  pct: Math.min(100, Math.round(v.safespace * 1.04)) },
    ];
    const rows = dims.map(d => `
      <div class="ss-dim-row">
        <span>${d.label}</span>
        <span>
          <span class="ss-dim-bar-bg"><span class="ss-dim-bar-fill" style="width:${d.pct}%"></span></span>
          ${d.pct}/100
        </span>
      </div>
    `).join('');
    return `
      <div class="ss-detail-panel" role="region" aria-label="SafeSpace score breakdown">
        <div class="ss-detail-title">&#9792; SafeSpace score: ${v.safespace}/100</div>
        ${rows}
        <div class="ss-composite">Verified by female moderator &middot; Reassessed every 6 months</div>
      </div>`;
  })() : '';

  const reviewHtml = v.reviews_sample.map(r => `
    <div class="review-card">
      <div class="review-top">
        <div class="review-avatar">${r.name.charAt(0)}</div>
        <div>
          <div class="review-name">${r.name}</div>
          <div class="review-ctx">${r.context}</div>
        </div>
        <div class="stars" style="margin-left:auto">${stars(r.stars)}</div>
      </div>
      <div class="review-text">"${r.text}"</div>
    </div>
  `).join('');

  const tagHtml = v.tags.map((t, i) =>
    `<span class="tag ${v.tagStyles[i] || 'tag-teal'}">${t}</span>`
  ).join('');

  el('detail-content').innerHTML = `
    <button class="back-btn" onclick="history.back(); showScreen('${State.currentScreen === 'detail' ? 'home' : State.currentScreen}')">
      &#8592; Back
    </button>

    <div class="detail-banner" style="background:${v.color}">
      <div class="detail-header-actions">
        <span class="save-inline-alert" data-save-alert="${v.id}" role="status" aria-live="polite"></span>
        <button class="detail-save-btn ${isSaved ? 'saved' : ''}" data-save-venue="${v.id}" onclick="toggleSaveVenue('${v.id}')" aria-label="Save ${v.name} to your list" aria-pressed="${isSaved}">
          <i class="${isSaved ? 'fa-solid' : 'fa-regular'} fa-bookmark" aria-hidden="true"></i>
        </button>
        <button class="detail-share-btn" onclick="toast('Opening WhatsApp...')" aria-label="Share ${v.name} on WhatsApp">
          <i class="fa-brands fa-whatsapp" aria-hidden="true"></i>
        </button>
      </div>
      <div class="detail-banner-text">
        <div class="detail-name">${v.name}</div>
        <div class="detail-meta">${v.location} &middot; ${v.type}</div>
      </div>
    </div>

    <div class="detail-grid">
      <div class="dg-item">
        <div class="dg-lbl">Price range</div>
        <div class="dg-val">${v.price_jmd}</div>
        <div class="dg-sub">${v.price_usd}</div>
      </div>
      <div class="dg-item">
        <div class="dg-lbl">Rating</div>
        <div class="dg-val">${v.rating} <span class="stars" style="font-size:14px">&#9733;</span></div>
        <div class="dg-sub">${v.reviews.toLocaleString()} reviews</div>
      </div>
      <div class="dg-item">
        <div class="dg-lbl">Parish</div>
        <div class="dg-val">${v.location.split(',').pop().trim()}</div>
        <div class="dg-sub">${v.parish === 'kingston' ? 'Kingston & St. Andrew' : 'St. Catherine'}</div>
      </div>
      <div class="dg-item">
        <div class="dg-lbl">Category</div>
        <div class="dg-val">${v.type}</div>
        <div class="dg-sub">${v.tastemaker ? 'Tastemaker verified' : 'Community listed'}</div>
      </div>
    </div>

    <p style="font-size:14px;color:var(--ink-2);line-height:1.75;margin-bottom:20px;font-weight:300;">${v.description}</p>

    ${ssHtml}

    <div class="sec-label">Venue features</div>
    <div class="feat-grid">${featHtml}</div>

    <div class="w3w-tag" role="note" aria-label="What3Words location">
      <strong>///</strong> ${v.w3w.replace('///', '')}
      &nbsp;&middot;&nbsp; <span style="font-size:11px;color:var(--ink-4)">Precise entrance pin</span>
    </div>

    <div style="margin-bottom:16px">${tagHtml}</div>

    <div class="reviews-section" aria-labelledby="reviews-title">
      <div class="sec-label" id="reviews-title">What visitors say</div>
      ${reviewHtml}
    </div>
  `;
}

/* ─── SafeSpace screen ───────────────────────────────────────*/
function renderSSCards() {
  const grid = el('ss-card-grid');
  grid.innerHTML = '';
  VENUES
    .filter(v => v.safespace)
    .sort((a, b) => b.safespace - a.safespace)
    .forEach(v => grid.appendChild(buildCard(v)));
}

function joinSS() {
  const input = el('ss-email-input');
  const btn   = el('ss-join-btn');
  if (!input.value || !input.value.includes('@')) {
    input.style.borderColor = 'var(--rose)';
    input.focus();
    return;
  }
  btn.textContent = 'Joined! ✓';
  btn.style.background = 'var(--rose-dark)';
  btn.disabled = true;
  input.disabled = true;
  toast('Welcome to the SafeSpace circle!');
}

/* ─── Quiz ───────────────────────────────────────────────────
   Renders each step into #quiz-content and handles navigation.
   ─────────────────────────────────────────────────────────── */
function renderQuiz() {
  const step = QUIZ_STEPS[State.quizStep];
  const pct  = Math.round(((State.quizStep + 1) / QUIZ_STEPS.length) * 100);
  el('quiz-progress').style.width = `${pct}%`;

  const isLast = State.quizStep === QUIZ_STEPS.length - 1;
  const isFreeStep = step.type === 'multi' || step.type === 'toggles';

  let bodyHtml = '';

  if (step.type === 'tiles') {
    bodyHtml = `<div class="tile-grid">
      ${step.options.map((o, i) => `
        <button class="quiz-tile" onclick="tileSelect(this, '${o.val}')">
          <span class="tile-icon">${o.icon}</span>
          <div class="tile-name">${o.name}</div>
          <div class="tile-sub">${o.sub}</div>
        </button>
      `).join('')}
    </div>`;
  }

  if (step.type === 'parish') {
    bodyHtml = `<div class="parish-pills">
      ${step.options.map(o => `
        <button class="parish-pill" onclick="parishSelect(this, '${o}')">${o}</button>
      `).join('')}
    </div>`;
  }

  if (step.type === 'budget') {
    bodyHtml = `<div class="budget-grid">
      ${step.options.map(o => `
        <div class="budget-card" onclick="budgetSelect(this, '${o.val}')">
          <div class="budget-jmd">${o.jmd}</div>
          <div class="budget-usd">${o.usd}</div>
          <div class="budget-lbl">${o.lbl}</div>
        </div>
      `).join('')}
    </div>`;
  }

  if (step.type === 'multi') {
    bodyHtml = `<div class="energy-pills">
      ${step.options.map(o => `
        <button class="energy-pill" onclick="this.classList.toggle('selected')">${o}</button>
      `).join('')}
    </div>`;
  }

  if (step.type === 'toggles') {
    bodyHtml = `<div class="toggle-list">
      ${step.options.map(o => `
        <div class="toggle-row ${o.rose ? 'toggle-rose' : ''}">
          <div class="toggle-info">
            <div class="toggle-lbl" style="${o.rose ? 'color:var(--rose)' : ''}">${o.label}</div>
            <div class="toggle-sub">${o.sub}</div>
          </div>
          <label class="toggle-switch">
            <input type="checkbox">
            <span class="toggle-track"></span>
          </label>
        </div>
      `).join('')}
    </div>`;
  }

  const backBtn = State.quizStep > 0
    ? `<button class="quiz-back" onclick="quizBack()">&#8592; Back</button>`
    : '';

  el('quiz-content').innerHTML = `
    <div class="quiz-step-label">${step.label}</div>
    <h2 class="quiz-question">${step.question}</h2>
    <p class="quiz-sub">${step.sub}</p>
    ${bodyHtml}
    <div class="quiz-nav">
      ${backBtn}
      <button
        class="quiz-next"
        id="quiz-next-btn"
        ${isFreeStep ? '' : 'disabled'}
        onclick="quizNext()"
      >
        ${isLast ? 'Find my vibe &rarr;' : 'Next'}
      </button>
    </div>
  `;
}

/* Quiz interaction helpers */
function enableNext() {
  const btn = el('quiz-next-btn');
  if (btn) { btn.disabled = false; }
}

function tileSelect(el, val) {
  el.closest('.tile-grid').querySelectorAll('.quiz-tile').forEach(t => t.classList.remove('selected'));
  el.classList.add('selected');
  State.quizAnswers[QUIZ_STEPS[State.quizStep].key] = val;
  enableNext();
}

function parishSelect(el, val) {
  el.closest('.parish-pills').querySelectorAll('.parish-pill').forEach(p => p.classList.remove('selected'));
  el.classList.add('selected');
  State.quizAnswers[QUIZ_STEPS[State.quizStep].key] = val;
  enableNext();
}

function budgetSelect(el, val) {
  el.closest('.budget-grid').querySelectorAll('.budget-card').forEach(c => c.classList.remove('selected'));
  el.classList.add('selected');
  State.quizAnswers[QUIZ_STEPS[State.quizStep].key] = val;
  enableNext();
}

function quizNext() {
  if (State.quizStep < QUIZ_STEPS.length - 1) {
    State.quizStep++;
    renderQuiz();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  } else {
    showResults();
  }
}

function quizBack() {
  if (State.quizStep > 0) {
    State.quizStep--;
    renderQuiz();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}

/* ─── Results ────────────────────────────────────────────────
   Scores venues against quiz answers, renders ranked results.
   ─────────────────────────────────────────────────────────── */
function scoreVenue(v, answers) {
  let score = 0;
  let weights = 0;

  /* Occasion score — from AI-enrichment data on each venue */
  const occ = answers.occasion || 'explore';
  if (v.occasion_scores && v.occasion_scores[occ] !== undefined) {
    score   += v.occasion_scores[occ] * 40;
    weights += 40;
  }

  /* Budget alignment */
  const priceMap = {
    low:    v.price_jmd.includes('800') || v.price_jmd.includes('1,') || v.price_jmd.includes('Free'),
    mid:    v.price_jmd.includes('2,') || v.price_jmd.includes('3,'),
    upper:  v.price_jmd.includes('5,') || v.price_jmd.includes('6,'),
    splash: v.price_jmd.includes('USD') || v.price_jmd.includes('10,'),
  };
  const budget = answers.budget;
  if (budget && priceMap[budget]) { score += 20; }
  weights += 20;

  /* SafeSpace toggle */
  const needsSS = answers.needs && answers.needs.safespace;
  if (needsSS) {
    if (v.safespace)  score += 20;
    else              score -= 10;
    weights += 20;
  }

  /* Category alignment with group size */
  const group = answers.group;
  if (group === 'bigcrew' && v.category === 'bar')   score += 10;
  if (group === 'family'  && v.category === 'family') score += 15;
  if (group === 'family'  && v.category === 'park')   score += 10;
  if (group === 'solo'    && v.safespace)              score += 10;
  weights += 15;

  const pct = weights > 0 ? Math.round((score / weights) * 100) : 50;
  return Math.min(99, Math.max(40, pct));
}

function showResults() {
  const answers = State.quizAnswers;

  /* Build vibe summary chips */
  const labels = {
    chill:'Chill day', celebrate:'Celebration', date:'Date night',
    family:'Family outing', work:'After work', explore:'Exploring',
    solo:'Just me', couple:'Two of us', smallgroup:'Small group', bigcrew:'Big crew',
    low:'Budget friendly', mid:'Mid range', upper:'Upper mid', splash:'Splash out',
  };
  const chips = [
    answers.occasion && labels[answers.occasion],
    answers.group    && labels[answers.group],
    answers.parish,
    answers.budget   && labels[answers.budget],
  ].filter(Boolean);

  /* Score and sort venues */
  const scored = VENUES.map(v => ({ v, pct: scoreVenue(v, answers) }))
    .sort((a, b) => b.pct - a.pct);

  /* Build results into the browse screen with a results header */
  const grid = el('browse-card-grid');
  grid.innerHTML = '';

  /* Results header card */
  const header = document.createElement('div');
  header.className = 'results-header';
  header.style.gridColumn = '1 / -1';
  header.innerHTML = `
    <div class="results-match-label">Your vibe match</div>
    <div class="results-title">${chips.join(' &middot; ') || 'Top picks for you'}</div>
    <div class="results-sub">${scored.length} venues matched by VibePicksJA</div>
    ${chips.length ? `<div class="vibe-summary" style="margin-top:12px">
      ${chips.map(c => `<span class="vibe-chip">${c}</span>`).join('')}
    </div>` : ''}
  `;
  grid.appendChild(header);

  scored.forEach(({ v, pct }) => {
    const card = buildCard(v);
    /* Overlay match percentage badge */
    const banner = card.querySelector('.card-banner');
    const matchEl = document.createElement('span');
    matchEl.style.cssText = 'background:rgba(255,255,255,0.92);color:#085041;font-size:11px;font-weight:500;padding:4px 10px;border-radius:10px;margin-left:auto;';
    matchEl.textContent = `${pct}% match`;
    banner.appendChild(matchEl);
    grid.appendChild(card);
  });

  /* Show browse screen — reset cat filter to 'all' */
  document.querySelectorAll('#browse-cat-strip .cat-pill').forEach(p => p.classList.remove('on'));
  const allPill = document.querySelector('#browse-cat-strip .cat-pill');
  if (allPill) allPill.classList.add('on');

  showScreen('browse');

  /* Update browse title to show results context */
  const browseTitle = document.querySelector('.browse-title');
  if (browseTitle) browseTitle.textContent = 'Your vibe results';
}

/* ─── Init ───────────────────────────────────────────────────*/
document.addEventListener('DOMContentLoaded', () => {
  showScreen('home');
  initStatCounters();
});
