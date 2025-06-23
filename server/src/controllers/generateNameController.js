import { openai } from '../utils/openai.js';

export const generateName = async (req, res) => {
    const (values, audience, vibe) = req.body;

    const prompt = `Suggest 5 unique and creative brand names for an Indigenous creator whose values include: ${values}, whose audience is: ${audience}, and whose brand vibe is: ${vibe}.`;

    try {
        const response = await openai.createChatCompletion({
            model: 'gpt-3.5-turbo',
            messages: [{ role: 'user', content: prompt}],
        });

        const names = response.data.choices[0].message.content.trim().split('\n');

        res.json({names});
    } catch (error) {
        console.error('OpenAI error in generateNameContorller:', error);
        res.status(500).json({error: 'Failed to generate names.'})
    }
}
