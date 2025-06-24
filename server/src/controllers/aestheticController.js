import { openai } from '../utils/openai.js';
import {
  getRandomAesthetic,
  getAestheticByMood,
} from '../data/static/index.js';

export const getAesthetic = async (req, res) => {
  const { vibe, keywords = '', mode = 'ai', staticMode = 'byMood' } = req.body;

  if (mode === 'static') {
    try {
      let aestheticData;

      if (staticMode === 'random') {
        aestheticData = getRandomAesthetic();
      } else {
        aestheticData = getAestheticByMood(vibe);
      }

      return res.json({ aestheticData });
    } catch (error) {
      console.error('Static error in aestheticController:', error);
      return res.status(400).json({ error: error.message });
    }
  }

  const prompt = `Based on the keywords: "${keywords}" and the vibe "${vibe}", describe a matching brand aesthetic. Include:
- A color palette (names, and their hex codes)
- Visual symbols or motifs
- Art or design style references (like cozy zine, anime realism, formline, vaporwave, etc)
Use soft and supportive tone, short bullet points.`;

  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: prompt }],
    });

    const aestheticData = response.data.choices[0].message.content.trim();

    res.json({ aestheticData });
  } catch (error) {
    console.error('OpenAI error in aestheticController', error);
    res.status(500).json({ error: 'Failed to generate aesthetic data.' });
  }
};
