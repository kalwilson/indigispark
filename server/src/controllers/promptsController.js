import { openai } from '../utils/openai.js';

export const analyzePrompts = async (req, res) => {
  const { purpose, goals, values } = req.body;

  const prompt = `Based on the following information from an Indigenous creator, generate a short brand summary using warm, supportive language: 
  Purpose: ${purpose}
  Goals: ${goals}
  Values: ${values}
  Focus on emotional impact, authenticity, and creative vision.`;

  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: prompt }],
    });

    const summary = response.data.choices[0].message.content.trim();

    res.json({ summary });
  } catch (error) {
    console.error('OpenAI error in promptsController:', error);
    res.status(500).json({ error: 'Failed to process prompts' });
  }
};
