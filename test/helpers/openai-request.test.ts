import axios from 'axios';
import { openAIRequest } from '../../src/helpers/openai-request';

const expectedResponse = {
  id: 'chatcmpl-9WzgIJJSZGhLfxJtoc3OqAruPZXPS',
  object: 'chat.completion',
  created: 1717650626,
  model: 'gpt-3.5-turbo-0125',
  choices: [
    {
      index: 0,
      message: {
        role: 'assistant',
        content: 'Hello! How can I assist you today?',
      },
      logprobs: null,
      finish_reason: 'stop',
    },
  ],
  usage: {
    prompt_tokens: 19,
    completion_tokens: 9,
    total_tokens: 28,
  },
  system_fingerprint: null,
};

jest.mock('axios');

describe('HELPER: openAIRequest', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('[SUCCESS] should return a mocked response', async () => {
    axios.post = jest.fn().mockResolvedValue({ data: expectedResponse });

    const userMessage = 'Hello!';
    const response = await openAIRequest(userMessage);

    expect(response).toBe(expectedResponse.choices[0].message.content);
  });

  it('[ERROR] should return an error message if `https://api.openai.com/v1/chat/completions` fails', async () => {
    axios.post = jest.fn().mockRejectedValue(new Error('Failed to fetch data'));

    const userMessage = 'Hello!';
    try {
      await openAIRequest(userMessage);
    } catch (error) {
      expect(error).toBeDefined();
      expect(error).toEqual(
        new Error('An error occurred while processing your request.'),
      );
    }
  });
});
