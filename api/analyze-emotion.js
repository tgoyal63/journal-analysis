require('dotenv').config();
import { Configuration, OpenAIApi } from "openai";

const handler = async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { input, prompt } = req.body;

  const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  });

  const openai = new OpenAIApi(configuration);
  const newPrompt = prompt ? prompt : "Analyse the emotion, which type of emotion it is in the above text: anger, disgust, fear, happiness, sadness, and surprise? Also provide me the rating of the emotion on a scale of 1-5, and justify your choice of rating.";
  const appendedInput = input + "\n" + newPrompt;
  
  try {
    const response = await openai.createChatCompletion({
      "model": "gpt-4",
      "messages": [{ "role": "user", "content": appendedInput }]
    });

    const data = response.data;
    let message =  data.choices[0].message.content;

    // Convert all \n to <br> in message
    message = message.replace(/\n/g, '<br>');

    res.status(200).json({ message });
  } catch (error) {
    if (error.response) {
        console.error(error.response.status);
        console.error(error.response.data);
    } else {
        console.error(error.message);
    }
    res.status(500).json({ error: 'Internal server error' });
  }
}

export default handler;