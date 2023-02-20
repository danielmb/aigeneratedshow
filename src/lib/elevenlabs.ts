// import say from 'say';
import axios, { AxiosRequestConfig } from 'axios';
import dotenv from 'dotenv';
import fs from 'fs';
import { playSound } from './util/playSound';
dotenv.config();
if (typeof process.env.ELEVENLABS_API_KEY === 'undefined')
  throw new Error('ELEVENLABS_API_KEY is not defined');
console.log('ELEVENLABS_API_KEY', process.env.ELEVENLABS_API_KEY);
const url = 'https://api.elevenlabs.io/v1/';
export const maleVoices = [
  'yoZ06aMxZJJ28mfd3POQ',
  'pNInz6obpgDQGcFmaJgB',
  'VR6AewLTigWG4xSOukaG',
  'TxGEqnHWrfWFTfGW9XjX',
  'ErXwobaYiN019PkySvjV',
  'AZnzlk1XvdvUeBnXmlld',
];
export const femaleVoices = [
  '21m00Tcm4TlvDq8ikWAM',
  'EXAVITQu4vr4xnSDxMaL',
  'MF3mGyEYCl7XYWbV9V6O',
];
export type FemaleVoice = typeof femaleVoices[number];
export type MaleVoice = typeof maleVoices[number];
// combine both types
export type Voices = FemaleVoice | MaleVoice;

// /v1/text-to-speech/{voice_id}
export const ElevenLabsAPI = {
  voices: `${url}voices`,
  textToSpeech: (voice: string) => `${url}text-to-speech/${voice}`,
  textToSpeechStream: (voice: string) => `${url}text-to-speech/${voice}/stream`,
};

export const getVoices = async () => {
  const res = await fetch(ElevenLabsAPI.voices, {
    method: 'GET',
    headers: {
      'x-api-key': process.env.ELEVENLABS_API_KEY as string,
    },
  });
  if (!res.ok) throw new Error(res.statusText);
  let voices = res.json();
  return voices;
};

// get type of female voices

/*
Schema:
{
  "text": "string",
  "voice_settings": {
    "stability": 0,
    "similarity_boost": 0
  }
}
*/
const generateSpeech = async (text: string, voice: Voices) => {
  // const res = await fetch(ElevenLabsAPI.textToSpeech(voice), {
  //   method: 'POST',
  //   headers: {
  //     'x-api-key': process.env.ELEVENLABS_API_KEY as string,
  //     'Content-Type': 'application/json',
  //   },
  //   body: JSON.stringify({
  //     text,
  //     voice_settings: {
  //       stability: 0,
  //       similarity_boost: 0,
  //     },
  //   }),
  // });
  // if (!res.ok) throw new Error(res.statusText);
  var options: AxiosRequestConfig = {
    method: 'POST',
    url: ElevenLabsAPI.textToSpeech(voice),
    headers: {
      'Content-Type': 'application/json',
      'xi-api-key': process.env.ELEVENLABS_API_KEY as string,
    },
    data: {
      text: text,
      voice_settings: { stability: 0, similarity_boost: 0 },
    },
    responseType: 'stream',
  };

  const res = await axios.request(options).catch((err) => {
    throw new Error(err.response.data.statusMessage);
  });
  const soundPath = `./public/generatedVoices/${Date.now()}.mpeg`;
  const writeStream = fs.createWriteStream(soundPath);
  res.data.pipe(writeStream);
  await new Promise((resolve, reject) => {
    writeStream.on('finish', resolve);
    writeStream.on('error', reject);
  });
  return soundPath;
};

// export default speak;

export default generateSpeech;
