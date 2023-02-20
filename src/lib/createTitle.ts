import { ChatGPTAPI, ChatGPTUnofficialProxyAPI } from 'chatgpt';
import chatgpt from './openai';
import { Character } from './plays/types';
import { isValidJSON } from './util/utils';

const generateTitle = async () => {
  const prompt = `You have to create a title for a sitcom. 
Only respond with one name. Do not write any other text. Just the name.
The sitcom is about a group of friends who are trying to make it in the world.`;
  console.log('Sending message to OpenAI');
  let response = await chatgpt.sendMessage(prompt).catch((err) => {
    throw new Error(err);
  });
  console.log('Message sent to OpenAI');
  let responseText = response.text.replace(/"'`/g, '');

  return {
    title: responseText,
    messageId: response.conversationId,
  };
};

export default generateTitle;

// test
