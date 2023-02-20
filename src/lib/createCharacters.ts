import { ChatGPTAPI, ChatGPTUnofficialProxyAPI } from 'chatgpt';
import { Character } from './plays/types';
import { isValidJSON } from './util/utils';
import * as dotenv from 'dotenv';
import { femaleVoices, maleVoices } from './elevenlabs';
import chatgpt from './openai';

dotenv.config();
let isValidCharacters = (characters: Character[], amount: number) => {
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
  messageId?: string,
): Promise<Character[]> => {
  const prompt = `You have to create ${amount} characters for a sitcom called ${title}.
Use the following format:
{
  "name": "character name",
  "description": "character description",
  "voice": "voice name"
},

Available voices:
MALE: ${maleVoices.join(', ')}
FEMALE: ${femaleVoices.join(', ')}

The output needs to be valid JSON. It has to be an array. '
Do not write additional text other than the json.
One of the characters has to be a hateable character. And everyone hates him.
`;
  console.log('Sending message to OpenAI');
  let response = await chatgpt.sendMessage(prompt);
  console.log('Message sent to OpenAI');
  let responseText = response.text.replace(/```/g, '');
  let json = isValidJSON(responseText);
  if (!json || !isValidCharacters(json, amount)) {
    console.log(responseText);
    console.log('Invalid characters, retrying...');
    return generateCharacters(amount, title);
  }
  let characters: Character[] = json;
  return characters;
};

export default generateCharacters;
