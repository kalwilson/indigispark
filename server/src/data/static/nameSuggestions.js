export const nameSuggestions = {
  dreamy: [
    {
      name: 'StarKind',
      meaning: 'A spirit rooted in kindness and celestial guidance.',
      tags: ['soft', 'celestial', 'hopeful', 'brandable', 'light'],
    },
    {
      name: 'Moonroot',
      meaning: 'Draws strength from the unseen and ancestral roots.',
      tags: ['ancestral', 'plant', 'mystical', 'earth', 'quiet'],
    },
    {
      name: 'Glowward',
      meaning: 'Moving gently toward healing and light.',
      tags: ['healing', 'gentle', 'light', 'directional', 'soft'],
    },
    {
      name: 'Star Thread',
      meaning:
        'A line of connection between us, stitched through sky and time.',
      tags: ['celestial', 'connection', 'ancestral', 'soft', 'dream'],
    },
    {
      name: 'Dream Bundle',
      meaning: 'A sacred collection of hopes, stories, and power.',
      tags: ['bundle', 'dream', 'ancestral', 'hopeful', 'sacred'],
    },
  ],
  grounded: [
    {
      name: 'Stone & Story',
      meaning: 'Legacy built on land and narrative.',
      tags: ['earth', 'storytelling', 'ancestral', 'compound', 'quiet'],
    },
    {
      name: 'Kindling Co.',
      meaning: 'Sparks of potential growing into flame.',
      tags: ['fire', 'potential', 'company', 'hopeful', 'growth'],
    },
    {
      name: 'Seedpath',
      meaning: 'Growth through soft steps and future vision.',
      tags: ['plant', 'journey', 'quiet', 'hopeful', 'earth'],
    },
    {
      name: 'Moss & Memory',
      meaning: 'Soft resilience rooted in generational knowing.',
      tags: ['plant', 'ancestral', 'earth', 'quiet', 'compound'],
    },
    {
      name: 'Hearthkin Studio',
      meaning: 'A home for warmth, making, and relation.',
      tags: ['home', 'kinship', 'studio', 'earth', 'relational'],
    },
  ],
  playful: [
    {
      name: 'Trickster Treehouse',
      meaning: 'Rooted mischief and cleverness.',
      tags: ['mischief', 'playful', 'plant', 'compound', 'cunning'],
    },
    {
      name: 'SnailMail Club',
      meaning: 'Slow joy, tiny wonders, and shared giggles.',
      tags: ['slow', 'community', 'nostalgia', 'compound', 'gentle'],
    },
    {
      name: 'Giggle Sprout',
      meaning: 'Laughing while growing — curious and soft.',
      tags: ['plant', 'playful', 'soft', 'growth', 'brandable'],
    },
    {
      name: 'Raven’s Pocket',
      meaning: 'A place where unexpected ideas live.',
      tags: ['trickster', 'playful', 'raven', 'myth', 'surprise'],
    },
    {
      name: 'Berry Mischief',
      meaning: 'Sweet, clever trouble — and laughter in the leaves.',
      tags: ['berry', 'trickster', 'land', 'joy', 'soft chaos'],
    },
  ],
  mystical: [
    {
      name: 'Wyrd Weaver',
      meaning: 'One who stitches fate with threads of mystery.',
      tags: ['myth', 'mystical', 'fate', 'weaving', 'compound'],
    },
    {
      name: 'Dreamchant',
      meaning: 'Echoes of inner magic guiding the way.',
      tags: ['mystical', 'song', 'dream', 'guidance', 'brandable'],
    },
    {
      name: 'Mythkin Studio',
      meaning: 'Crafted by the children of old stories.',
      tags: ['myth', 'ancestral', 'studio', 'storytelling', 'kinship'],
    },
    {
      name: 'Tidewalker',
      meaning: 'One who travels where land and sea meet, in between worlds.',
      tags: ['water', 'liminal', 'mystical', 'journey', 'soft power'],
    },
    {
      name: 'Smokeweave',
      meaning: 'Stories woven through breath, fire, and time.',
      tags: ['smoke', 'weaving', 'ceremony', 'ancestral', 'sacred'],
    },
  ],
  radiant: [
    {
      name: 'LumenKind',
      meaning: 'Beaming care that lights the path ahead.',
      tags: ['light', 'hopeful', 'brandable', 'soft power', 'care'],
    },
    {
      name: 'Glimmertide',
      meaning: 'An incoming wave of light, warmth, and hope.',
      tags: ['light', 'water', 'hopeful', 'poetic', 'gentle'],
    },
    {
      name: 'Bright Ember',
      meaning: 'A small spark with powerful staying power.',
      tags: ['fire', 'light', 'hopeful', 'resilient', 'compound'],
    },
    {
      name: 'Sun Thread',
      meaning: 'Connection and strength drawn from light.',
      tags: ['sun', 'thread', 'storytelling', 'bright', 'warm'],
    },
    {
      name: 'Lightling',
      meaning: 'A flicker of brilliance — small, brave, and bright.',
      tags: ['light', 'spark', 'soft power', 'radiant', 'brandable'],
    },
  ],
  sovereignFutures: [
    {
      name: 'Coded Ancestors',
      meaning: 'Honoring the ancestors by building futures in code.',
      tags: ['tech', 'ancestral', 'digital', 'sovereignty', 'futurism'],
    },
    {
      name: 'Signal Kin',
      meaning: 'Communicating through time and technology as kin.',
      tags: ['relational', 'tech', 'light', 'ancestral', 'network'],
    },
    {
      name: 'Rememory Works',
      meaning: 'Creative practice rooted in collective and cultural memory.',
      tags: ['memory', 'futurism', 'reclamation', 'studio', 'ancestral'],
    },
    {
      name: 'Quantum Canoe',
      meaning: 'Traveling forward through ancestral technologies.',
      tags: ['tech', 'canoe', 'journey', 'sci-fi', 'relational'],
    },
    {
      name: 'Next Lodge',
      meaning: 'The future gathering place for kin, code, and creativity.',
      tags: ['sovereignty', 'community', 'future', 'land', 'design'],
    },
  ],
};

// export const getNamesByVibe = (vibe, count = 3) => {
//   if (!nameSuggestions[vibe]) {
//     throw new Error(
//       `Invalid vibe: ${vibe}. Try one of these vibes: ${Object.keys(
//         nameSuggestions
//       ).join(', ')}`
//     );
//   }

//   const group = [...nameSuggestions[vibe]];
//   const shuffled = group.sort(() => 0.5 - Math.random());

//   const safeCount = Math.min(count, shuffled.length);
//   return shuffled.slice(0, safeCount);
// };
