import { openai } from '../utils/openai.js';
import { nameSuggestions } from '../data/static/index.js';

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

export const generateName = async (req, res) => {
  const { values, audience, vibe, mode = 'ai' } = req.body;

  // === Static Mode ===

  if (mode === 'static') {
    try {
      const namesData = getNamesByVibe(vibe);
      return res.json({ namesData });
    } catch (error) {
      console.error('Static error in generateName:', error);
      return res.status(400).json({ error: error.message });
    }
  }

  // === AI Mode ===

  const prompt = `Suggest 5 unique and creative brand names for an Indigenous creator whose values include: ${values}, whose audience is: ${audience}, and whose brand vibe is: ${vibe}. Make them poetic, relevant, and short.`;

  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: prompt }],
    });

    const namesDataRaw = response.choices[0].message.content.trim().split('\n');

    const namesData = namesDataRaw.map((line) => {
      // this should remove the 1. before the name in the summary...hopefully.
      return line.replace(/^\d+\.\s*/, '');
    });

    res.json({ namesData });
  } catch (error) {
    console.error('OpenAI error in generateNameContorller:', error);
    res.status(500).json({ error: 'Failed to generate names.' });
  }
};
