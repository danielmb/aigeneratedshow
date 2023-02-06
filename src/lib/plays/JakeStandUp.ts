import { ChatGPTAPI } from 'chatgpt';
import * as dotenv from 'dotenv';
import { isValidJSON } from 'lib/util/utils';
import { Character, Scene } from './types';
dotenv.config();
if (!process.env.OPENAI_API_KEY)
  throw new Error('OPENAI_API_KEY is not defined');
const chatgpt = new ChatGPTAPI({
  apiKey: process.env.OPENAI_API_KEY,
});

const characters: Character[] = [
  {
    name: 'Jake',
    description:
      'Jake is a tall and lanky guy with a friendly smile. He is the life of the party and always has a joke to tell. He is spontaneous and loves to live life to the fullest.',
    voice: 'en-US-Wavenet-B',
  },
];
let charactersStringified = characters
  .map((character) => {
    return `${character.name} - ${character.description}`;
  })
  .join(`\n`);
let prompt = `You are tasked with creating a sitcom about a group of friends. The show is called "Friends".
The characters are:
${charactersStringified}
Available actions: LAUGHTRACK, APPLAUSE, CROWD CHEER, CROWD BOO, CROWD WHISTLE, CROWD WHOO

Format:
Put speech in a JSON object with key "text" as the speech and key "speaker" as the character name.
Put actions in a JSON object with key "action" as the action.
Example:
[
  {
  "text": "Hello, my name is Jake.",
  "speaker": "Jake"
  },
  {
    "action": "LAUGHTRACK"
  }
]
Do not write any additional text before or after the JSON objects
Add some humor to the show! Make it funny!
Do not add any additional speakers that are not in the list above.
try to make 10-15 json objects.`;

let generateJake = async (): Promise<Scene> => {
  let response = await chatgpt.sendMessage(prompt);
  let json = isValidJSON(response.text.replace(/```/g, ''));
  if (!json) {
    return await generateJake();
  }

  return {
    play: json,
    characters,
  };
};

export default generateJake;
