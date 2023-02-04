import { ChatGPTAPI } from 'chatgpt';
import * as dotenv from 'dotenv';
import { Play } from '../../tts';
import { Character } from './types';
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
  {
    name: 'Rachel',
    description:
      'Rachel is a beautiful, petite brunette with a sassy attitude. She is independent, confident and speaks her mind, but is also a great listener and always there for her friends.',
    voice: 'en-US-Wavenet-C',
  },
  {
    name: 'Mike',
    description:
      'Mike is a big guy with a bigger personality. He is the comedian of the group and always has a funny story to tell. He is a loyal friend, but sometimes his jokes can get him into trouble.',
    voice: 'en-US-Wavenet-D',
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
try to make 10-15 json objects.`;
// ACTION: LAUGHTRACK
// ACTION: APPLAUSE
// ACTION: CROWD CHEER
// ACTION: CROWD BOO
// ACTION: CROWD WHISTLE
// ACTION: CROWD WHOO
// SPEECH: <character name>: <character speech>
// Each line needs to start with ACTION: or SPEECH:

const isValidJSON = (str: string) => {
  let json;
  try {
    json = JSON.parse(str);
  } catch (e) {
    return false;
  }
  return json;
};

// (async () => {
//   console.log('Sending message...');
//   let response = await chatgpt.sendMessage(prompt);
//   console.log('Response:', response.text);
//   // replace ``` with ''
//   let json = isValidJSON(response.text.replace(/```/g, ''));
//   if (json) {
//     console.log('IS VALID JSON');
//     fs.writeFileSync(`plays/${Date.now()}.json`, response.text);
//   }
// })();
interface GenerateJakeRachelMike {
  play: Play;
  characters: Character[];
}
let generateJakeRachelMike = async (): Promise<GenerateJakeRachelMike> => {
  console.log(prompt);

  let response = await chatgpt.sendMessage(prompt);
  let json = isValidJSON(response.text.replace(/```/g, ''));
  if (!json) {
    return await generateJakeRachelMike();
  }

  return {
    play: json,
    characters,
  };
};

export default generateJakeRachelMike;
