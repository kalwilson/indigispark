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
  {
    mood: 'Coded Kinship',
    colors: [
      { name: 'sage terminal', hex: '#7A9D79' },
      { name: 'coal black', hex: '#1A1A1A' },
      { name: 'glow ember', hex: '#FFB562' },
      { name: 'smoke veil', hex: '#CED3CF' },
    ],
    motifs: ['circuit basketry', 'data constellations', 'woven code'],
    styles: ['pixel embroidery', 'line-based futurism', 'digital beadwork'],
    vibe: 'Blends ancestral craft with digital tools, centering kinship, sovereignty, and futuristic remembering.',
  },
  {
    mood: 'Forest Ceremony',
    colors: [
      { name: 'cedar green', hex: '#3C6E56' },
      { name: 'sunlit ochre', hex: '#E1B07E' },
      { name: 'smoke brown', hex: '#6B4F3B' },
      { name: 'riverstone grey', hex: '#B0A89F' },
    ],
    motifs: ['medicine bundles', 'smoke tendrils', 'mossy altars'],
    styles: [
      'natural ink wash',
      'soft texture layering',
      'ritual illustration',
    ],
    vibe: 'Rooted in land and layered time, this aesthetic honors ceremony, plants, and quiet spiritual strength.',
  },
  {
    mood: 'Signal Sovereignty',
    colors: [
      { name: 'signal red', hex: '#D02B20' },
      { name: 'fog white', hex: '#F9F9F9' },
      { name: 'oceanic teal', hex: '#2C6E7F' },
      { name: 'nightwave blue', hex: '#1B2C4A' },
    ],
    motifs: ['transmission lines', 'coded beadwork', 'waveform spirals'],
    styles: ['lo-fi scanlines', 'zine print glitch', 'text overlay collage'],
    vibe: 'A digital warrior aesthetic shaped by media, resistance, and layered meaning in a connected world.',
  },
  {
    mood: 'Bundle of Light',
    colors: [
      { name: 'shell pink', hex: '#FDEAE9' },
      { name: 'woven gold', hex: '#F4B860' },
      { name: 'prairie grass', hex: '#BFAF80' },
      { name: 'stone shadow', hex: '#9A9082' },
    ],
    motifs: ['sun bundles', 'braided forms', 'woven prayers'],
    styles: ['soft paper texture', 'hand lettering', 'sunbeam gradient'],
    vibe: 'A healing, gentle aesthetic focused on hope, care, and the strength of soft brightness.',
  },
];

// export const getRandomAesthetic = () => {
//   return aestheticOptions[Math.floor(Math.random() * aestheticOptions.length)];
// };

// export const getAestheticByMood = (mood) => {
//   const selectedAesthetic = aestheticOptions.find(
//     (aesthetic) => aesthetic.mood === mood
//   );

//   if (!selectedAesthetic) {
//     throw new Error(`Invalid mood: "${mood}`);
//   }

//   return selectedAesthetic;
// };
