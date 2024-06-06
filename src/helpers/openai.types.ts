export interface OpenAIRequest {
    model: string;
    messages: { role: string; content: string }[];
    temperature?: number;
}