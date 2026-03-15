import Groq from "groq-sdk";

const MODEL = "openai/gpt-oss-120b";

const SYSTEM_PROMPT = {
  role: "system",
  content: "Behave like a programming teacher and your answers should be simple and small"
};

const TITLE_PROMPT = {
  role: "system",
  content: "Generate a title for the conversation in no more than 4 words"
};

let groq;

export const initAIAssistant = async (cb) => {
  groq = new Groq({
    apiKey: process.env.OPENAI_API_KEY
  });

  cb();
};

export const generateContent = async (messages = []) => {

  const completion = await groq.chat.completions.create({
    model: MODEL,
    messages: [SYSTEM_PROMPT, ...messages]
  });

  return completion.choices[0].message.content;
};

export const generateTitle = async (messages) => {

  const completion = await groq.chat.completions.create({
    model: MODEL,
    messages: [TITLE_PROMPT, ...messages]
  });

  return completion.choices[0].message.content;
};