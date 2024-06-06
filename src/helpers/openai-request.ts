import axios from 'axios';
import config from '../config/environment';
import { OpenAIRequest } from './openai.types';

/**
 * Sends a request to the OpenAI API to generate a response to the user's message.
 * @param userMessage The message from the user.
 * @returns The response from the OpenAI API.
 * @throws An error if the request fails.
 */
export async function openAIRequest(userMessage: string): Promise<unknown> {
  const openAIRequest: OpenAIRequest = {
    model: 'gpt-3.5-turbo',
    messages: [
      { role: 'system', content: 'You are a helpful assistant.' },
      { role: 'user', content: userMessage },
    ],
    temperature: 0.7,
  };

  try {
    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      openAIRequest,
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${config.openai.apiKey}`,
        },
      },
    );

    return response.data.choices[0].message.content;
  } catch (error) {
    console.error(error);
    return new Error('An error occurred while processing your request.');
  }
}
