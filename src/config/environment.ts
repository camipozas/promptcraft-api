import dotenv from 'dotenv';

dotenv.config();

export default {
  port: process.env.PORT || 8080,
    openai: {
        apiKey: process.env.OPENAI_API_KEY,
        orgainizationId: process.env.OPENAI_ORGANIZATION_ID,
        projectId: process.env.OPENAI_PROJECT_ID,
    },
};