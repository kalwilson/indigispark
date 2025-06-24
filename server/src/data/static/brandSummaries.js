export const brandSummaries = {
  healer: [
    'Your brand is a gentle invitation to remember...',
    "A healer's brand soothes like a balm...",
    'You mend the unseen. Your brand whispers to the weary...',
  ],
  teacher: [
    'Rooted in knowledge-sharing and intergenerational wisdom...',
    "A teacher's brand illuminates...",
    'Your brand is a compass...',
  ],
  visionary: [
    'This brand pulses with future-dreaming...',
    "A visionary's brand bends time...",
    'Your brand is a beacon...',
  ],
};

export const getStaticSummary = (type) => {
  if (!brandSummaries[type]) {
    throw new Error(
      `Invalid type: ${type}. Try one of these types: ${Object.keys(
        brandSummaries
      ).join(', ')}`
    );
  }

  const summaries = brandSummaries[type];
  return (
    summaries[Math.floor(Math.random() * summaries.length)] ||
    'No summary available.'
  );
};
