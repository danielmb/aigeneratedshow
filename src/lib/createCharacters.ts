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
let isValidCharacters = (characters: Character[], amount) => {
  if (!Array.isArray(characters)) return false;
  if (characters.length === 0) return false;
  if (characters.length !== amount) return false;
  for (let character of characters) {
    if (
      !character.name ||
      character.name.length === 0 ||
      typeof character.name !== 'string'
    )
      return false;
    if (
      !character.description ||
      character.description.length === 0 ||
      typeof character.description !== 'string'
    )
      return false;
    if (
      !character.voice ||
      character.voice.length === 0 ||
      typeof character.voice !== 'string'
    )
      return false;
  }

  return true;
};
const generateCharacters = async (
  amount: number,
  title: string,
): Promise<Character[]> => {
  const prompt = `You have to create ${amount} characters for a sitcom called ${title}.
Use the following format:
{
  "name": "character name",
  "description": "character description",
  "voice": "voice name"
},

Available voices:
MALE: en-US-News-M, en-US-News-N, en-US-Wavenet-I, en-US-Wavenet-J, en-US-Wavenet-A, en-US-Wavenet-B, en-US-Wavenet-D, en-US-Neural2-A, en-US-Neural2-D, en-US-Neural2-I, en-US-Neural2-J
FEMALE: en-US-News-K, en-US-News-L, en-US-Wavenet-G, en-US-Wavenet-H, en-US-Wavenet-C, en-US-Wavenet-E, en-US-Wavenet-F, en-US-Neural2-C, en-US-Neural2-E, en-US-Neural2-F, en-US-Neural2-G, en-US-Neural2-H

The output needs to be valid JSON.
One of the characters has to be a hateable character. And everyone hates him.
`;
  let response = await chatgpt.sendMessage(prompt);
  let responseText = response.text.replace(/```/g, '');
  let json = isValidJSON(responseText);
  if (!json || !isValidCharacters(json, amount)) {
    return generateCharacters(amount, title);
  }
  let characters: Character[] = json;
  return characters;
};

export default generateCharacters;
