import { openai } from '../utils/openai.js';
import { getNamesByVibe } from '../data/static/index.js';

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

    const namesData = response.data.choices[0].message.content
      .trim()
      .split('\n');

    res.json({ namesData });
  } catch (error) {
    console.error('OpenAI error in generateNameContorller:', error);
    res.status(500).json({ error: 'Failed to generate names.' });
  }
};
