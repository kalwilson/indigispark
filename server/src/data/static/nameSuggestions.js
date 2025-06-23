export const nameSuggestions = {
  dreamy: [
    {
      name: 'StarKind',
      meaning: 'A spirit rooted in kindness and celestial guidance.',
    },
    {
      name: 'Moonroot',
      meaning: 'Draws strength from the unseen and ancestral roots.',
    },
    { name: 'Glowward', meaning: 'Moving gently toward healing and light.' },
  ],
  grounded: [
    { name: 'Stone & Story', meaning: 'Legacy built on land and narrative.' },
    {
      name: 'Kindling Co.',
      meaning: 'Sparks of potential growing into flame.',
    },
    {
      name: 'Seedpath',
      meaning: 'Growth through soft steps and future vision.',
    },
  ],
  playful: [
    { name: 'PebblePop', meaning: 'Fun, bouncy, community-powered joy.' },
    { name: 'Soft Thunder', meaning: 'Quiet power that still makes waves.' },
    { name: 'Trickster Treehouse', meaning: 'Rooted mischief and cleverness.' },
  ],
};

export const getNamesByVibe = (vibe, count = 3) => {
  if (!nameSuggestions[vibe]) {
    throw new Error(
      `Invalid vibe: ${vibe}. Try one of these vibes: ${Object.keys(
        nameSuggestions
      ).join(', ')}`
    );
  }

  const group = [...nameSuggestions[vibe]];
  const shuffled = group.sort(() => 0.5 - Math.random());

  const safeCount = Math.min(count, shuffled.length);
  return shuffled.slice(0, safeCount);
};
