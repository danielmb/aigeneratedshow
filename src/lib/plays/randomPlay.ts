import { ChatGPTAPI, ChatGPTUnofficialProxyAPI } from 'chatgpt';
import * as dotenv from 'dotenv';
import generateCharacters from 'lib/createCharacters';
import generateTitle from 'lib/createTitle';
import chatgpt from 'lib/openai';
import { isValidJSON, randomBetween } from 'lib/util/utils';
import { Character, Scene } from './types';
dotenv.config();

let randomPlay = async (): Promise<Scene> => {
  console.log('Generating title...');
  let titleRes = await generateTitle();
  console.log('Title generated!');
  const title = titleRes.title;
  let amountOfCharacters = randomBetween(4, 8);
  console.log(`Generating ${amountOfCharacters} characters...`);
  let characters = await generateCharacters(
    amountOfCharacters,
    title,
    titleRes.messageId,
  );
  console.log('Characters generated!');
  console.log(characters);
  let charactersStringified = characters
    .map((character) => {
      return `${character.name} - ${character.description}`;
    })
    .join(`\n`);
  let prompt = `You are tasked with creating a sitcom episode. The show is called "${title}".
The characters are in a blue room with a white couch and a white table. 
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
in the "text" field, do not start with the speaker's name.
try to make 10-15 json objects.`;
  console.log('Generating play...');
  let response = await chatgpt.sendMessage(prompt);
  let json = isValidJSON(response.text.replace(/```/g, ''));
  if (!json) {
    return await randomPlay();
  }

  return {
    play: json,
    characters,
  };
};

export default randomPlay;
