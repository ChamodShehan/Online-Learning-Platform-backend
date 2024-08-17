const axios = require('axios');

exports.getCourseRecommendations = async (req, res) => {
    const { prompt } = req.body;
    
    try {
        const response = await axios.post(
            'https://api.openai.com/v1/chat/completions',
            {
                model: 'gpt-3.5-turbo',
                messages: [
                    { role: 'system', content: 'You are a helpful assistant.' },
                    { role: 'user', content: `Given the user input: "${prompt}", suggest courses for them.` }
                ],
                max_tokens: 100,
            },
            {
                headers: {
                    'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
                    'Content-Type': 'application/json',
                },
            }
        );

        const recommendations = response.data.choices[0].message.content.trim();
        res.json({ recommendations });
    } catch (err) {
        console.error('GPT-3 API Error:', err.response ? err.response.data : err.message);
        res.status(500).json({ message: 'Error fetching recommendations from GPT-3' });
    }
};
