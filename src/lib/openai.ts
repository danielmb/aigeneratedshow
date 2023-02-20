import { ChatGPTUnofficialProxyAPI } from 'chatgpt';
import * as dotenv from 'dotenv';

dotenv.config();
if (!process.env.OPENAI_ACCESS_TOKEN)
  throw new Error('OPENAI_ACCESS_TOKEN is not defined');
if (!process.env.OPENAI_REVERSE_PROXY)
  throw new Error('OPENAI_REVERSE_PROXY is not defined');

const chatgpt = new ChatGPTUnofficialProxyAPI({
  accessToken: process.env.OPENAI_ACCESS_TOKEN,
  apiReverseProxyUrl: process.env.OPENAI_REVERSE_PROXY,
});

export default chatgpt;
