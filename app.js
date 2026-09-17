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
    id: 'broken-plate',
    name: 'Broken Plate Jamaica',
    location: 'Progressive Shopping Center, Liguanea, Kingston',
    parish: 'kingston',
    category: 'dining',
    type: 'International fusion',
    color: '#C6553D',
    /* Rotating banner photos — shown in place of the flat colour
       background wherever this venue's card renders. Drop the two
       supplied photos in at these paths (see chat) to activate. */
    photos: ['assets/broken-plate/1.jpg', 'assets/broken-plate/3.jpg'],
    price_jmd: 'JMD 3,500–8,000',
    price_usd: 'USD 23–52',
    rating: 3.9,
    reviews: 59,
    safespace: null,
    tastemaker: true,
    badge: 'Kingston favorite',
    description: "Tucked into the Progressive Shopping Center in Liguanea, Broken Plate breaks from tradition with a menu that fuses Jamaican and international flavours — think oxtail mac 'n' cheese balls, ahi tuna wonton tacos and curried goat sushi rolls. Dine indoors or up on the rooftop balcony, and expect refined, seasonal plates with a distinctly Kingston point of view.",
    tags: ['Rooftop dining', 'Vegetarian friendly', 'Credit cards', 'Reservations', 'Full bar'],
    tagStyles: ['tag-teal', 'tag-green', 'tag-blue', 'tag-amber', 'tag-gray'],
    features: [
      { label: 'Credit cards',           yes: true  },
      { label: 'Reservations',           yes: true  },
      { label: 'Outdoor seating',        yes: true  },
      { label: 'Parking available',      yes: true  },
      { label: 'Vegetarian friendly',    yes: true  },
      { label: 'Wheelchair accessible',  yes: true  },
    ],
    reviews_sample: [
      { name: 'Kadiann M.', context: 'Group · Dinner', stars: 4, text: 'The oxtail mac \'n\' cheese balls alone are worth the trip. Great fusion of Jamaican and international flavours, and the staff kept up even with our large group.' },
      { name: 'Devon R.',   context: 'Date night',     stars: 4, text: 'Rooftop balcony seating with a great view over Liguanea. Crab cakes and the salmon were standouts — book ahead, it fills up on weekends.' },
    ],
    occasion_scores: { chill: 0.68, celebrate: 0.88, date: 0.85, family: 0.55, work: 0.70, explore: 0.80 },
  },
  {
    id: 'v2',
    name: 'Tracks & Records',
    location: 'Marketplace, Kingston',
    parish: 'kingston',
    category: 'bar',
    type: 'Sports bar & lounge',
    color: '#7F77DD',
    photos: ['assets/tracks-and-records/UB1.jpg', 'assets/tracks-and-records/UB3.jpg'],
    price_jmd: 'JMD 2,000–5,000',
    price_usd: 'USD 13–32',
    rating: 4.5,
    reviews: 512,
    safespace: null,
    tastemaker: true,
    badge: 'Top lounge',
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
    id: 'v5',
    name: 'Hope Botanical Gardens',
    location: 'Hope Pastures, Kingston',
    parish: 'kingston',
    category: 'park',
    type: 'Park & outdoor',
    color: '#639922',
    photos: ['assets/hope-gardens/Hope2.jpg', 'assets/hope-gardens/Hope3.jpg'],
    price_jmd: 'Free / JMD 300 zoo',
    price_usd: 'Free / ~USD 2',
    rating: 4.7,
    reviews: 443,
    safespace: 88,
    tastemaker: false,
    badge: 'Best park',
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
    options: ['Kingston / St. Andrew', 'St. Catherine', 'St. Ann', 'St. James', 'Westmoreland', 'Surprise me'],
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
  if (id === 'home')   { renderHomeMosaic('all'); renderEditorialStrips(); }
  if (id === 'browse') { renderBrowseCards('all'); renderBrowseFilters(); }
  if (id === 'quiz')   { State.quizStep = 0; State.quizAnswers = {}; renderQuiz(); }
  if (id === 'ss')     renderSSCards();
}

function updateNav(id) {
  document.querySelectorAll('.nav-links a').forEach(a => a.classList.remove('active'));
  /* Blog is reachable from the Tastemaker strip's CTA, but no longer
     has its own primary nav link, so there's nothing to highlight
     when that screen is active. */
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
/* ─── Amenity icon key ────────────────────────────────────────
   A compact icon strip for listing cards (Browse + SafeSpace grids
   only — not the home mosaic cards). Available features show at
   full opacity, unavailable ones are greyed, and SafeSpace always
   sits apart in its own rose chip at the end. Reuses the same
   featureIconClass() mapping as the venue detail page so a symbol
   means the same thing everywhere it appears. Uses the native
   `title` attribute for hover/tap labels. */
function buildAmenityIconsHtml(v) {
  if (!v.features || !v.features.length) return '';

  const available = v.features.filter(f => f.yes);
  const unavailable = v.features.filter(f => !f.yes);

  const iconSpan = f => `<span class="amenity-icon${f.yes ? '' : ' off'}" title="${f.label}" aria-label="${f.label}${f.yes ? '' : ' (not available)'}"><i class="${featureIconClass(f)}" aria-hidden="true"></i></span>`;

  const safespaceSpan = v.safespace
    ? `<span class="amenity-icon safespace" title="SafeSpace ${v.safespace}/100" aria-label="SafeSpace rated ${v.safespace} out of 100">&#9792; ${v.safespace}</span>`
    : `<span class="amenity-icon safespace off" title="SafeSpace: unrated" aria-label="SafeSpace unrated">&#9792;</span>`;

  return `
    <div class="amenity-strip">
      ${available.map(iconSpan).join('')}
      ${available.length && unavailable.length ? '<span class="amenity-divider" aria-hidden="true"></span>' : ''}
      ${unavailable.map(iconSpan).join('')}
      ${safespaceSpan}
    </div>
  `;
}

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
      ${buildAmenityIconsHtml(v)}
    </div>
    ${ssStripHtml}
  `;

  return div;
}

/* ─── Photo rotation ─────────────────────────────────────────
   For venues with a `photos` array, crossfades between images
   behind the card content every 8s instead of the flat colour
   fill. Reusable across any card that has a .mosaic-scrim layer.
   Active timers are tracked per render scope (mosaic grid vs.
   editorial strips) so re-rendering one doesn't kill timers that
   are still driving cards in the other.

   `delayMs` staggers a card's very first transition — used on the
   mosaic hero card so its crossfade doesn't land on the exact same
   beat as the two compact cards beside it (which both start at 0
   delay). Subsequent transitions still run on the regular 8s beat
   from that offset starting point. ─────────────────────────────── */
let activePhotoIntervals = []; /* { scope, clear } */

function clearPhotoRotations(scope) {
  activePhotoIntervals = activePhotoIntervals.filter(entry => {
    if (entry.scope !== scope) return true;
    entry.clear();
    return false;
  });
}

function startPhotoRotation(container, photos, scope, delayMs = 0) {
  if (!photos || !photos.length) return;

  const layer = document.createElement('div');
  layer.className = 'mosaic-photo-layer';

  const imgA = document.createElement('img');
  const imgB = document.createElement('img');
  imgA.className = 'mosaic-photo-img front';
  imgB.className = 'mosaic-photo-img';
  imgA.alt = ''; imgB.alt = '';
  imgA.decoding = 'async'; imgB.decoding = 'async';
  imgA.src = photos[0];
  imgB.src = photos[1] || photos[0];

  layer.appendChild(imgB);
  layer.appendChild(imgA);
  container.prepend(layer); /* sits behind the existing scrim/badges/info */

  if (photos.length < 2) return; /* single photo — nothing to rotate */

  let front = imgA;              /* visible now, showing photos[0] */
  let back = imgB;               /* hidden, preloaded with photos[1] */
  let nextIndex = 2 % photos.length; /* photo to preload after this reveal */

  const tick = () => {
    /* reveal the already-preloaded `back` layer */
    front.classList.remove('front');
    back.classList.add('front');
    [front, back] = [back, front];
    /* preload the following photo into the now-hidden layer, ready
       for the next tick */
    back.src = photos[nextIndex];
    nextIndex = (nextIndex + 1) % photos.length;
  };

  /* `timer` always points at whichever handle is currently live —
     the one-off stagger timeout, then the recurring interval once
     it kicks in — so clear() works correctly at any point. */
  const timer = { id: null, kind: 'timeout' };
  timer.id = setTimeout(() => {
    tick();
    timer.kind = 'interval';
    timer.id = setInterval(tick, 8000);
  }, delayMs);

  activePhotoIntervals.push({
    scope,
    clear: () => (timer.kind === 'interval' ? clearInterval(timer.id) : clearTimeout(timer.id)),
  });
}

/* ─── Mosaic card builder ─────────────────────────────────────
   Builds a single full-bleed venue tile for the home mosaic grid
   (Immersive magazine mosaic — Eater / Time Out / IG Explore style).
   Favourites and SafeSpace badges overlay the image; venue info
   sits on a gradient scrim at the bottom.
   ─────────────────────────────────────────────────────────── */
/* Same category → icon mapping used on the cat-strip filter pills,
   reused here so the "Vibe Picks" tag icon matches a venue's own
   category at a glance. */
const CATEGORY_ICONS = {
  dining:   'ti-tools-kitchen-2',
  bar:      'ti-beer',
  club:     'ti-disco-ball',
  outdoor:  'ti-sun',
  wellness: 'ti-yoga',
  family:   'ti-users',
  park:     'ti-trees',
};

function buildMosaicCard(v, isHero) {
  const div = document.createElement('div');
  div.className = `mosaic-card ${isHero ? 'hero' : 'compact'}`;
  div.style.background = v.color;
  div.setAttribute('role', 'article');
  div.setAttribute('aria-label', v.name);
  div.onclick = () => openDetail(v.id);

  const isSaved = State.savedVenues.has(v.id);

  const chosenTagHtml = v.tastemaker
    ? `<span class="mosaic-vibe-tag"><i class="ti ${CATEGORY_ICONS[v.category] || 'ti-category'}" aria-hidden="true"></i> Vibe Picks</span>`
    : '<span></span>';

  const ssBadgeHtml = v.safespace
    ? `<div class="mosaic-ss-badge ${v.safespace >= 85 ? 'high' : 'mid'}"><span class="num">${v.safespace}</span><span class="lbl">SafeSpace</span></div>`
    : `<div class="mosaic-ss-badge"><span class="num">—</span><span class="lbl">Unrated</span></div>`;

  const tagHtml = isHero
    ? v.tags.slice(0, 3).map((t, i) => `<span class="tag ${v.tagStyles[i] || 'tag-teal'}">${t}</span>`).join('')
    : '';

  div.innerHTML = `
    <div class="mosaic-scrim"></div>
    <div class="mosaic-top-badges">
      ${chosenTagHtml}
      <div class="mosaic-badges-right">
        ${ssBadgeHtml}
        <button class="mosaic-heart ${isSaved ? 'saved' : ''}" data-save-venue="${v.id}"
          onclick="event.stopPropagation(); toggleSaveVenue('${v.id}')"
          aria-label="${isSaved ? 'Remove' : 'Save'} ${v.name} to your list" aria-pressed="${isSaved}">
          <i class="${isSaved ? 'fa-solid' : 'fa-regular'} fa-heart" aria-hidden="true"></i>
        </button>
      </div>
    </div>
    <div class="mosaic-info">
      <div class="mosaic-name">${v.name}</div>
      <div class="mosaic-meta">${v.location} &middot; ${v.type}</div>
      <div class="mosaic-rating">
        <span class="stars">${stars(v.rating)}</span>
        <span>${v.rating} &middot; ${v.reviews.toLocaleString()} reviews</span>
      </div>
      ${tagHtml ? `<div class="mosaic-tags">${tagHtml}</div>` : ''}
    </div>
  `;

  /* Stagger the hero card's rotation by half a cycle so it doesn't
     crossfade in lockstep with the two compact cards beside it. */
  if (v.photos && v.photos.length) startPhotoRotation(div, v.photos, 'mosaic', isHero ? 4000 : 0);

  return div;
}

/* ─── Tastemaker of the Month video card ─────────────────────
   A one-off editorial feature slotted into the mosaic grid in
   place of a regular venue card. Starts muted (autoplay requires
   it), with custom mute, play/pause and a scrub-able progress bar.
   Uses the real YouTube IFrame Player API (not just postMessage)
   since a reliable progress bar needs getCurrentTime()/getDuration()
   polling, not just one-off commands. ─────────────────────────── */
const TASTEMAKER_VIDEO_FEATURE = {
  __type: 'video-feature',
  youtubeId: 'ZAtJgPCZiRc',
  title: 'Tastemaker of the Month: Broken Plate',
  subtitle: 'Behind the pass with the chef at Broken Plate Jamaica',
  linkVenueId: 'broken-plate',
};

/* Loads the YouTube IFrame API script exactly once and resolves
   with the global YT object once it's ready. Safe to call from
   multiple cards — they all share the same loaded script/promise. */
let youtubeApiPromise = null;
function loadYouTubeApi() {
  if (youtubeApiPromise) return youtubeApiPromise;
  youtubeApiPromise = new Promise(resolve => {
    if (window.YT && window.YT.Player) { resolve(window.YT); return; }
    const prevReady = window.onYouTubeIframeAPIReady;
    window.onYouTubeIframeAPIReady = () => {
      if (typeof prevReady === 'function') prevReady();
      resolve(window.YT);
    };
    const tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';
    document.head.appendChild(tag);
  });
  return youtubeApiPromise;
}

function formatVideoTime(sec) {
  if (!isFinite(sec) || sec < 0) sec = 0;
  const m = Math.floor(sec / 60);
  const s = Math.floor(sec % 60);
  return `${m}:${s < 10 ? '0' : ''}${s}`;
}

let videoCardSeq = 0;

function buildTastemakerVideoCard(feature, isHero) {
  const div = document.createElement('div');
  const iframeId = `tastemaker-video-${++videoCardSeq}`;
  div.className = `mosaic-card video-card ${isHero ? 'hero' : 'compact'}`;
  div.style.background = '#000';
  div.setAttribute('role', 'article');
  div.setAttribute('aria-label', feature.title);
  /* No click-through here — this is a video card, not a venue
     listing link. Only the mute, play/pause and seek controls
     (which stopPropagation) are interactive. */

  const embedSrc = `https://www.youtube.com/embed/${feature.youtubeId}`
    + `?autoplay=1&mute=1&enablejsapi=1&playsinline=1&controls=0&rel=0`
    + `&modestbranding=1&loop=1&playlist=${feature.youtubeId}`;

  div.innerHTML = `
    <div class="video-embed-wrap">
      <iframe id="${iframeId}" class="video-embed-iframe" src="${embedSrc}"
        title="${feature.title}" tabindex="-1" frameborder="0"
        allow="autoplay; encrypted-media; picture-in-picture"
        allowfullscreen></iframe>
    </div>
    <div class="mosaic-scrim"></div>
    <div class="mosaic-top-badges">
      <span class="mosaic-chosen-tag"><i class="fa-solid fa-play" aria-hidden="true"></i> Tastemaker of the month</span>
      <div class="mosaic-badges-right">
        <button class="video-mute-btn" data-muted="true" aria-pressed="false"
          onclick="event.stopPropagation(); toggleVideoMute(this)"
          aria-label="Unmute video">
          <i class="fa-solid fa-volume-xmark" aria-hidden="true"></i>
        </button>
      </div>
    </div>
    <div class="mosaic-info video-info">
      <div class="mosaic-name">${feature.title}</div>
      <div class="mosaic-meta">${feature.subtitle}</div>
      <div class="video-controls">
        <button class="video-play-btn" data-playing="true" aria-pressed="true"
          onclick="event.stopPropagation(); toggleVideoPlay(this)" aria-label="Pause video">
          <i class="fa-solid fa-pause" aria-hidden="true"></i>
        </button>
        <div class="video-progress-track" onclick="event.stopPropagation(); seekVideo(event, this)">
          <div class="video-progress-fill"></div>
        </div>
        <span class="video-time">0:00 / 0:00</span>
      </div>
    </div>
  `;

  initTastemakerPlayer(iframeId, div);

  return div;
}

/* Wires up the real YT.Player against the iframe we already built
   (adopting an existing customised iframe, rather than letting the
   API create its own — keeps our autoplay/loop/controls params). */
function initTastemakerPlayer(iframeId, cardEl) {
  loadYouTubeApi().then(YT => {
    /* card may already be gone if a fast filter click re-rendered
       the grid before the API finished loading */
    if (!document.body.contains(cardEl)) return;

    let pollId = null;
    const player = new YT.Player(iframeId, {
      events: {
        onReady: (e) => {
          const timeEl = cardEl.querySelector('.video-time');
          if (timeEl) timeEl.textContent = `0:00 / ${formatVideoTime(e.target.getDuration())}`;
        },
        onStateChange: (e) => {
          const playBtn = cardEl.querySelector('.video-play-btn');
          const isPlaying = e.data === YT.PlayerState.PLAYING;

          if (playBtn) {
            playBtn.dataset.playing = String(isPlaying);
            playBtn.setAttribute('aria-pressed', String(isPlaying));
            playBtn.setAttribute('aria-label', isPlaying ? 'Pause video' : 'Play video');
            playBtn.innerHTML = isPlaying
              ? '<i class="fa-solid fa-pause" aria-hidden="true"></i>'
              : '<i class="fa-solid fa-play" aria-hidden="true"></i>';
          }

          if (isPlaying && !pollId) {
            pollId = setInterval(() => {
              if (!document.body.contains(cardEl)) { clearInterval(pollId); pollId = null; return; }
              const fill = cardEl.querySelector('.video-progress-fill');
              const timeEl = cardEl.querySelector('.video-time');
              const dur = player.getDuration() || 0;
              const cur = player.getCurrentTime() || 0;
              if (fill && dur > 0) fill.style.width = `${Math.min(100, (cur / dur) * 100)}%`;
              if (timeEl) timeEl.textContent = `${formatVideoTime(cur)} / ${formatVideoTime(dur)}`;
            }, 400);
          } else if (!isPlaying && pollId) {
            clearInterval(pollId);
            pollId = null;
          }
        },
      },
    });

    cardEl._tastemakerPlayer = player;
  });
}

function toggleVideoMute(btn) {
  const card = btn.closest('.video-card');
  const player = card && card._tastemakerPlayer;
  if (!player || typeof player.isMuted !== 'function') return;

  const isMuted = player.isMuted();
  if (isMuted) player.unMute(); else player.mute();

  btn.setAttribute('aria-pressed', String(!isMuted));
  btn.setAttribute('aria-label', isMuted ? 'Mute video' : 'Unmute video');
  btn.innerHTML = isMuted
    ? '<i class="fa-solid fa-volume-high" aria-hidden="true"></i>'
    : '<i class="fa-solid fa-volume-xmark" aria-hidden="true"></i>';
}

function toggleVideoPlay(btn) {
  const card = btn.closest('.video-card');
  const player = card && card._tastemakerPlayer;
  if (!player) return;
  /* button icon/state updates itself via the onStateChange handler
     in initTastemakerPlayer once the player actually responds */
  if (btn.dataset.playing === 'true') player.pauseVideo();
  else player.playVideo();
}

function seekVideo(evt, track) {
  const card = track.closest('.video-card');
  const player = card && card._tastemakerPlayer;
  if (!player) return;
  const rect = track.getBoundingClientRect();
  const ratio = Math.min(1, Math.max(0, (evt.clientX - rect.left) / rect.width));
  player.seekTo((player.getDuration() || 0) * ratio, true);
}

/* Dispatches to the right card builder — a venue, or the special
   video-feature slot. */
function buildGridCard(item, isHero) {
  return item.__type === 'video-feature'
    ? buildTastemakerVideoCard(item, isHero)
    : buildMosaicCard(item, isHero);
}

/* Groups venues into mosaic blocks of up to 3: one tall hero on the
   left, two compact tiles stacked on the right (or fewer, for the
   final partial group). A block containing the video feature uses
   a different shape instead — a wide 16:9 banner on top with the
   other two venues side by side underneath — since a landscape
   video letterboxed into a tall portrait hero slot looks terrible
   (huge black bars). */
function buildMosaicBlock(group) {
  if (group[0] && group[0].__type === 'video-feature') return buildVideoBlock(group);

  const wrap = document.createElement('div');
  wrap.className = 'mosaic-block' + (group.length === 1 ? ' single' : '');

  wrap.appendChild(buildGridCard(group[0], true));
  if (group[1]) {
    const compact = buildGridCard(group[1], false);
    if (group.length === 2) compact.classList.add('fill');
    wrap.appendChild(compact);
  }
  if (group[2]) wrap.appendChild(buildGridCard(group[2], false));

  return wrap;
}

function buildVideoBlock(group) {
  const wrap = document.createElement('div');
  wrap.className = 'mosaic-block video-block';

  wrap.appendChild(buildTastemakerVideoCard(group[0], true));
  if (group[1]) wrap.appendChild(buildMosaicCard(group[1], false));
  if (group[2]) wrap.appendChild(buildMosaicCard(group[2], false));

  return wrap;
}

/* ─── Home screen ────────────────────────────────────────────*/
function homeFilter(cat, btn) {
  document.querySelectorAll('#home-cat-strip .cat-pill').forEach(p => p.classList.remove('on'));
  btn.classList.add('on');
  State.activeFilters.home = cat;
  renderHomeMosaic(cat);
}

function renderHomeMosaic(cat) {
  const gridA = el('home-mosaic-grid-a');
  const gridB = el('home-mosaic-grid-b');
  const gridC = el('home-mosaic-grid-c');
  if (!gridA) return;

  clearPhotoRotations('mosaic');
  gridA.innerHTML = '';
  if (gridB) gridB.innerHTML = '';
  if (gridC) gridC.innerHTML = '';

  /* B/C only get content in the "All" view (see below) — when a
     category filter empties them, hide their wrapping sections too,
     otherwise they'd leave a stray blank gap between the editorial
     strips either side of them. */
  [gridB, gridC].forEach(grid => {
    if (!grid) return;
    const section = grid.closest('section');
    if (section) section.style.display = cat === 'all' ? '' : 'none';
  });

  if (cat !== 'all') {
    /* Category filters just show a normal flowing grid of matches —
       the hand-curated "All" sequence below is a homepage-only thing. */
    const filtered = VENUES.filter(v => v.category === cat);
    for (let i = 0; i < filtered.length; i += 3) {
      gridA.appendChild(buildMosaicBlock(filtered.slice(i, i + 3)));
    }
    return;
  }

  /* The "All" homepage view is a hand-curated sequence, not a
     generic chunk-by-3 of the venue list:
       A. Broken Plate hero + Tracks & Records + Hope Gardens, then
          the Tastemaker-of-the-month video on its own wide block
          (SafeSpace picks strip sits right after this, in the HTML)
       B. Scotchies Jerk Centre + Caymanas Park
          (Tastemaker picks strip sits right after this, in the HTML)
       C. Everything else not already featured above */
  const byId = id => VENUES.find(v => v.id === id);
  const groupA = ['broken-plate', 'v2', 'v5'].map(byId).filter(Boolean);
  const groupB = ['v3', 'v6'].map(byId).filter(Boolean);
  const curatedIds = new Set([...groupA, ...groupB].map(v => v.id));
  const rest = VENUES.filter(v => !curatedIds.has(v.id));

  gridA.appendChild(buildMosaicBlock(groupA));
  gridA.appendChild(buildVideoBlock([TASTEMAKER_VIDEO_FEATURE]));

  if (gridB) gridB.appendChild(buildMosaicBlock(groupB));

  if (gridC) {
    for (let i = 0; i < rest.length; i += 3) {
      gridC.appendChild(buildMosaicBlock(rest.slice(i, i + 3)));
    }
  }
}

/* ─── Editorial strips ───────────────────────────────────────
   Curated, opinionated collections at the bottom of the homepage
   (SafeSpace picks, Tastemaker picks) — separate from the venue
   grid above, giving the platform an editorial point of view
   rather than reading as a plain directory.
   ─────────────────────────────────────────────────────────── */
function buildEditorialCard(v, type) {
  const div = document.createElement('div');
  div.className = 'editorial-card';
  div.style.background = v.color;
  div.setAttribute('role', 'article');
  div.setAttribute('aria-label', v.name);
  div.onclick = () => openDetail(v.id);

  const badgeHtml = type === 'ss'
    ? `<span class="editorial-badge ss">&#9792; SafeSpace ${v.safespace}</span>`
    : `<span class="editorial-badge tm"><i class="fa-solid fa-star" aria-hidden="true"></i> Tastemaker</span>`;

  div.innerHTML = `
    <div class="mosaic-scrim"></div>
    ${badgeHtml}
    <div class="editorial-info">
      <div class="editorial-name">${v.name}</div>
      <div class="editorial-meta">${v.location} &middot; ${v.type}</div>
    </div>
  `;

  if (v.photos && v.photos.length) startPhotoRotation(div, v.photos, 'editorial');

  return div;
}

function renderEditorialStrips() {
  clearPhotoRotations('editorial');

  const ssStrip = el('home-ss-strip');
  if (ssStrip) {
    ssStrip.innerHTML = '';
    VENUES.filter(v => v.safespace)
      .sort((a, b) => b.safespace - a.safespace)
      .forEach(v => ssStrip.appendChild(buildEditorialCard(v, 'ss')));
  }

  const tmStrip = el('home-tm-strip');
  if (tmStrip) {
    tmStrip.innerHTML = '';
    VENUES.filter(v => v.tastemaker)
      .forEach(v => tmStrip.appendChild(buildEditorialCard(v, 'tm')));
  }
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

/* Builds a Google Maps search deep-link from a venue's name and
   location — the "Maps URLs" scheme, which needs no API key and
   makes zero API calls on our end. Google resolves the query only
   when the user actually clicks through, on their own device. */
function buildMapsUrl(v) {
  const query = encodeURIComponent(`${v.name}, ${v.location}, Jamaica`);
  return `https://www.google.com/maps/search/?api=1&query=${query}`;
}

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
  { match: ['wheelchair', 'accessible'], icon: 'fa-solid fa-wheelchair' },
  { match: ['vegetarian', 'vegan'], icon: 'fa-solid fa-leaf' },
  { match: ['delivery'], icon: 'fa-solid fa-motorcycle' },
  { match: ['waterfront', 'beach'], icon: 'fa-solid fa-water' },
  { match: ['wifi'], icon: 'fa-solid fa-wifi' },
  { match: ['quiet', 'low noise'], icon: 'fa-solid fa-volume-low' },
  { match: ['full bar', 'cocktail'], icon: 'fa-solid fa-martini-glass' },
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
  const isSaved = State.savedVenues.has(id);

  /* Sync every control referencing this venue: the detail page's
     bookmark button, and any mosaic-card hearts on the home grid. */
  document.querySelectorAll(`[data-save-venue="${id}"]`).forEach(btn => {
    btn.classList.toggle('saved', isSaved);
    btn.setAttribute('aria-pressed', String(isSaved));
    const icon = btn.classList.contains('detail-save-btn') ? 'fa-bookmark' : 'fa-heart';
    btn.innerHTML = `<i class="${isSaved ? 'fa-solid' : 'fa-regular'} ${icon}" aria-hidden="true"></i>`;
  });

  const alert = document.querySelector(`[data-save-alert="${id}"]`);
  if (alert) {
    alert.textContent = isSaved ? 'Saved' : 'Removed';
    alert.classList.add('show');
    setTimeout(() => alert.classList.remove('show'), 1800);
  }
}

function renderDetail(v) {
  const isSaved = State.savedVenues.has(v.id);

  /* SafeSpace gets its own tile at the front of the grid — a curated,
     verified score rather than a plain yes/no amenity toggle, so it's
     visually set apart (rose tile) with a green dot when rated and a
     red dot when not, same as every other tile. */
  const safespaceTileHtml = v.safespace
    ? `<div class="feat-item safespace" title="SafeSpace ${v.safespace}/100">
         <span class="feat-dot" aria-hidden="true"></span>
         <span class="feat-icon safespace" aria-hidden="true">&#9792;</span>
         <span>SafeSpace ${v.safespace}</span>
       </div>`
    : `<div class="feat-item safespace off" title="SafeSpace: unrated">
         <span class="feat-dot" aria-hidden="true"></span>
         <span class="feat-icon safespace" aria-hidden="true">&#9792;</span>
         <span>SafeSpace unrated</span>
       </div>`;

  const featHtml = safespaceTileHtml + v.features.map(f => `
    <div class="feat-item ${f.yes ? '' : 'off'}" title="${f.label}${f.yes ? '' : ' (not available)'}">
      <span class="feat-dot" aria-hidden="true"></span>
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

    <a class="maps-tag" href="${buildMapsUrl(v)}" target="_blank" rel="noopener noreferrer"
       aria-label="Open ${v.name} in Google Maps">
      <i class="fa-solid fa-location-dot" aria-hidden="true"></i>
      Open in Google Maps
      <i class="fa-solid fa-arrow-up-right-from-square" aria-hidden="true" style="font-size:10px;"></i>
    </a>

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
