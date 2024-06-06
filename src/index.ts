import OpenAI from 'openai';
import dotenv from 'dotenv';

dotenv.config();

interface OpenAIConfig {
  organization: string;
  project: string;
}

const openai = new OpenAI({
    organization: process.env.ORGANIZATION_ID,
    project: process.env.PROJECT_ID,
} as OpenAIConfig);

const main = async (): Promise<void> => {
  const completion = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "system",
        content:
          "You are a helpful assistant. Your response should be in JSON format.",
      },
      { role: "user", content: "wena como estay" },
    ],
    response_format: { type: "json_object" },
  });

  const isJSON = (obj: string | null): boolean => {
    if (obj === null) {
      return false;
    }
    try {
      JSON.parse(obj);
      return true;
    } catch (e) {
      return false;
    }
  };
  
  const jsonData = isJSON(completion.choices[0].message.content)
      ? JSON.parse(completion.choices[0].message.content ?? "")
      : null;

  console.log(jsonData);
};

main();