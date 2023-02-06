import { ChatGPTAPI } from 'chatgpt';
import { Character } from './plays/types';
import { isValidJSON } from './util/utils';
import * as dotenv from 'dotenv';

dotenv.config();
if (!process.env.OPENAI_API_KEY)
  throw new Error('OPENAI_API_KEY is not defined');
const chatgpt = new ChatGPTAPI({
  apiKey: process.env.OPENAI_API_KEY,
});

const generateTitle = async (): Promise<string> => {
  const prompt = `You have to create a title for a sitcom. 
Only respond with one name. Do not write any other text. Just the name.
The sitcom is about a group of friends who are trying to make it in the world.`;
  let response = await chatgpt.sendMessage(prompt);
  let responseText = response.text.replace(/"'`/g, '');
  return responseText;
};

export default generateTitle;

// test
