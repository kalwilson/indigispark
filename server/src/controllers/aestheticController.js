import { openai } from '../utils/openai.js';
import {
  aestheticOptions,
  moodTagGroups,
  colorTagGroups,
} from '../data/static/index.js';

export const getTagGroups = (req, res) => {
  const moodGroups = Object.keys(moodTagGroups);
  const colorGroups = Object.keys(colorTagGroups);

  res.json({ moodGroups, colorGroups });
};

export const getRandomAesthetic = () => {
  return aestheticOptions[Math.floor(Math.random() * aestheticOptions.length)];
};

export const getAestheticByName = (name) => {
  const selectedAesthetic = aestheticOptions.find(
    (aesthetic) => aesthetic.name === name
  );

  if (!selectedAesthetic) {
    throw new Error(`Invalid name: "${name}"`);
  }

  return selectedAesthetic;
};

export const getAestheticsByGroup = (groupType, groupName) => {
  let nameList;
  if (groupType === 'mood') {
    nameList = moodTagGroups[groupName];
  } else if (groupType === 'color') {
    nameList = colorTagGroups[groupName];
  } else {
    throw new Error(`Static error in getting aesthetic by group: ${groupType}`);
  }

  if (!nameList)
    throw new Error(
      `No name list in getting aesthetics by group: ${groupName}`
    );

  return aestheticOptions.filter((aesthetic) =>
    nameList.includes(aesthetic.name)
  );
};

export const getAesthetic = async (req, res) => {
  const {
    name,
    mood,
    color,
    keywords = '',
    mode = 'ai',
    staticMode = 'byName',
  } = req.body;

  // === Static Mode ===

  if (mode === 'static') {
    try {
      let aestheticData;
      if (staticMode === 'random') {
        aestheticData = getRandomAesthetic();
      } else if (staticMode === 'byName') {
        aestheticData = getAestheticByName(name);
      } else if (staticMode === 'byMoodGroup') {
        aestheticData = getAestheticsByGroup('mood', mood);
      } else if (staticMode === 'byColorGroup') {
        aestheticData = getAestheticsByGroup('color', color);
      } else {
        throw new Error(`Unknown static mode: ${staticMode}`);
      }

      if (Array.isArray(aestheticData)) {
        return res.json({ aesthetics: aestheticData });
      } else {
        return res.json({ aestheticData });
      }
    } catch (error) {
      console.error('Static error in aestheticController:', error);
      return res.status(400).json({ error: error.message });
    }
  }

  // === AI Mode ===

  const prompt = `Based on the keywords: "${keywords}" and the selected mood category "${mood}", respond with a brand aesthetic object in this exact JSON format:


{
  "name": "Name of the aesthetic",
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
