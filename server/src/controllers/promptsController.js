import { getStaticSummary } from '../data/static/brandSummaries.js';
import { openai } from '../utils/openai.js';

export const analyzePrompts = async (req, res) => {
  const { purpose, goals, values, type = 'healer', mode = 'ai' } = req.body;

  // === Static Mode ===
  if (mode === 'static') {
    try {
      const summary = await getStaticSummary(type);

      return res.json({ summary });
    } catch (error) {
      console.error('Static error in promptsControler:', error);
      return res.status(400).json({ error: error.message });
    }
  }

  // === AI Mode ===
  try {
    const prompt = `Based on the following information from an Indigenous creator, generate a short brand summary using warm, supportive language: 
  Purpose: ${purpose}
  Goals: ${goals}
  Values: ${values}
  Focus on emotional impact, authenticity, and creative vision.`;

    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: prompt }],
    });

    const summary =
      response.choices[0]?.message?.content?.trim() || 'No summary generated.';

    res.json({ summary });
  } catch (error) {
    console.error('OpenAI error in promptsController:', error);
    res.status(500).json({ error: 'Failed to process prompts' });
  }
};
