import { openai } from '../utils/openai.js';
import { aestheticOptions } from '../data/static/index.js';

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

export const getAesthetic = async (req, res) => {
  const { mood, keywords = '', mode = 'ai', staticMode = 'byMood' } = req.body;

  // === Static Mode ===

  if (mode === 'static') {
    try {
      let aestheticData =
        staticMode === 'random'
          ? getRandomAesthetic()
          : getAestheticByMood(mood);

      return res.json({ aestheticData });
    } catch (error) {
      console.error('Static error in aestheticController:', error);
      return res.status(400).json({ error: error.message });
    }
  }

  // === AI Mode ===

  const prompt = `Based on the keywords: "${keywords}" and the overall mood "${mood}", respond with a brand aesthetic object in this exact JSON format:

{
  "mood": "Name of the aesthetic",
  "colors": [
    { "name": "juniper green", "hex": "#3E6259" },
    ...
  ],
  "motifs": ["herbal silhouettes", "ribbon trails"],
  "styles": ["zine collage", "minimal formline"],
  "vibe": "Short, warm description of the brand aesthetic"
}

Keep the tone gentle and supportive. Do not include any explanations or text outside the JSON.`;

  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: prompt }],
    });

    const content = response.choices[0].message.content.trim();
    let aestheticData;

    try {
      aestheticData = JSON.parse(content);
      res.json({ aestheticData });
    } catch (error) {
      console.error('Failed to parse aestheticData JSON:', error);
      res.status(500).json({ error: 'AI response was invalid JSON.' });
    }
  } catch (error) {
    console.error('OpenAI error in aestheticController', error);
    res.status(500).json({ error: 'Failed to generate aesthetic data.' });
  }
};
