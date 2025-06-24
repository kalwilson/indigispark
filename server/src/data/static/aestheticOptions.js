export const aestheticOptions = [
  {
    mood: 'Soft Sovereignty',
    colors: [
      { name: 'juniper green', hex: '#3E6259' },
      { name: 'warm clay', hex: '#C96F4D' },
      { name: 'sun-faded rose', hex: '#F1C2BE' },
      { name: 'birch white', hex: '#F8F5F0' },
    ],
    motifs: ['handmade textures', 'herbal silhouettes', 'ribbon trails'],
    styles: ['zine collage', 'minimal formline', 'lo-fi pixel art'],
    vibe: 'Quiet power expressed through handmade aesthetics and ancestral softness.',
  },
  {
    mood: 'Starborn Mischief',
    colors: [
      { name: 'midnight purple', hex: '#3E2D60' },
      { name: 'moon silver', hex: '#D8D8E0' },
      { name: 'trickster orange', hex: '#F77F00' },
      { name: 'inky blue', hex: '#1E2B4D' },
    ],
    motifs: ['starscapes', 'trickster masks', 'spiral glyphs'],
    styles: ['neon sketch', 'Ghibli-inspired ink', 'glitch animation'],
    vibe: 'A playful and mysterious brand that celebrates movement, curiosity, and cosmic humor.',
  },
  {
    mood: 'Bloomcraft',
    colors: [
      { name: 'dusk violet', hex: '#8C6BB1' },
      { name: 'soft peach', hex: '#FAD4C0' },
      { name: 'moss green', hex: '#7C9A7E' },
      { name: 'cloud grey', hex: '#E5E7EB' },
    ],
    motifs: ['flower bundles', 'brush strokes', 'dream symbols'],
    styles: ['soft watercolor', 'cozy gradient vector', 'hand-drawn'],
    vibe: 'Centered in care and dreamy rebirth, this aesthetic invites emotional storytelling.',
  },
];

export const getRandomAesthetic = () => {
  return aestheticOptions[Math.floor(Math.random() * aestheticOptions.length)];
};

export const getAestheticByMood = (mood) => {
  const selectedAesthetic = aestheticOptions.find(
    (aesthetic) => aesthetic.mood === mood
  );

  if (!selectedAesthetic) {
    throw new Error(`Invalid mood: "${mood}`);
  }

  return selectedAesthetic;
};
