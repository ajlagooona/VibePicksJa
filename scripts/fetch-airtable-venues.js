/* ============================================================
   fetch-airtable-venues.js
   Runs ONLY inside the weekly GitHub Actions workflow (see
   .github/workflows/update-venues.yml) — never in the browser.
   Reads AIRTABLE_TOKEN from the environment (a GitHub Actions
   Secret), pulls published venues from Airtable, and writes the
   result to venues.json at the repo root. The live site fetches
   that static file — the Airtable token never ships to visitors.

   Field IDs below were verified directly against the live base
   schema before writing this (not guessed/trusted from memory).
   ============================================================ */

'use strict';

const fs = require('fs');

const AIRTABLE_TOKEN   = process.env.AIRTABLE_TOKEN;
const AIRTABLE_BASE_ID = 'app8Oy3gvRnP8kSvU';
const AIRTABLE_TABLE   = 'tblI4c3Tc6E0jiuGt'; // Google Places Sweep
const OUTPUT_FILE      = 'venues.json';

// Requested by field name (Airtable's documented API usage) — these
// names were confirmed against the live schema, not assumed.
const FIELDS = [
  'venue_name', 'address', 'parish', 'phone', 'opening_hours',
  'cuisine', 'vibe_tags', 'vibe_category',
  'published', 'restricted_category',
];

/* Category colour map — used when a venue has no local photo */
const CATEGORY_COLORS = {
  dining:   '#C6553D',
  cafe:     '#BA7517',
  bar:      '#534AB7',
  club:     '#993556',
  park:     '#639922',
  outdoor:  '#378ADD',
  wellness: '#1D9E75',
  family:   '#D85A30',
};

function mapRecord(rec) {
  const f = rec.fields || {};

  const parish    = f.parish || '';
  const vibecat   = (f.vibe_category || 'dining').toLowerCase();
  const cuisine   = Array.isArray(f.cuisine) ? f.cuisine.join(' / ') : '';
  const vibeTag   = Array.isArray(f.vibe_tags) && f.vibe_tags.length ? f.vibe_tags[0] : '';
  const parishSlug = parish.toLowerCase().replace(/\./g, '').replace(/\s+/g, '-');

  const tags = [cuisine, vibeTag].filter(Boolean);
  while (tags.length < 2) tags.push(vibecat === 'dining' ? 'Dine in' : 'Local pick');
  const tagStyles = ['tag-teal', 'tag-amber', 'tag-green'].slice(0, tags.length);

  return {
    id:       rec.id,
    name:     f.venue_name || '',
    location: (f.address || '').replace(/\s{2,}/g, ', '),
    parish:   parishSlug,
    category: vibecat,
    type:     cuisine || (vibecat.charAt(0).toUpperCase() + vibecat.slice(1)),
    color:    CATEGORY_COLORS[vibecat] || '#1D9E75',
    photos:   [], // not part of this integration — flat colour used instead
    price_jmd: 'JMD —',
    price_usd: '',
    rating:   0,
    reviews:  0,
    safespace:  null,
    tastemaker: false,
    badge:      `${parish || 'Jamaica'} pick`,
    phone:          f.phone || '',
    opening_hours:  f.opening_hours || '',
    description: cuisine
      ? `${f.venue_name} — ${cuisine} cuisine in ${parish || 'Jamaica'}.`
      : `${f.venue_name} in ${parish || 'Jamaica'}.`,
    tags,
    tagStyles,
    features: [{ label: 'Google verified', yes: true }],
    reviews_sample: [],
    occasion_scores: {
      chill:     vibecat === 'park' || vibecat === 'wellness' ? 0.88 : 0.65,
      celebrate: vibecat === 'bar'  || vibecat === 'club'     ? 0.85 : 0.60,
      date:      vibecat === 'dining'                          ? 0.80 : 0.55,
      family:    vibecat === 'family' || vibecat === 'park'    ? 0.92 : 0.45,
      work:      vibecat === 'cafe' || vibecat === 'dining'    ? 0.75 : 0.50,
      explore:   0.70,
    },
  };
}

async function fetchAllRecords() {
  const filterFormula = encodeURIComponent('AND({published},{restricted_category}=BLANK())');
  const fieldParams    = FIELDS.map(f => `fields%5B%5D=${encodeURIComponent(f)}`).join('&');
  const baseUrl        = `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${AIRTABLE_TABLE}`;
  const headers        = { Authorization: `Bearer ${AIRTABLE_TOKEN}` };

  const allRecords = [];
  let offset = '';

  do {
    const url = `${baseUrl}?filterByFormula=${filterFormula}&${fieldParams}&pageSize=100${offset ? `&offset=${offset}` : ''}`;
    const res = await fetch(url, { headers });
    if (!res.ok) {
      throw new Error(`Airtable fetch failed: ${res.status} ${res.statusText}`);
    }
    const data = await res.json();
    if (data.error) throw new Error(`Airtable error: ${JSON.stringify(data.error)}`);
    (data.records || []).forEach(rec => allRecords.push(rec));
    offset = data.offset || '';
  } while (offset);

  return allRecords;
}

async function main() {
  if (!AIRTABLE_TOKEN) {
    console.error('AIRTABLE_TOKEN is not set — refusing to run.');
    process.exit(1);
  }

  const records = await fetchAllRecords();
  const venues  = records.map(mapRecord);

  fs.writeFileSync(OUTPUT_FILE, JSON.stringify(venues, null, 2));
  console.log(`Wrote ${venues.length} venues to ${OUTPUT_FILE}`);
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
