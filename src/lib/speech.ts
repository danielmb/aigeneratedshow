// import say from 'say';
import { spawn } from 'node:child_process';
import tts from '@google-cloud/text-to-speech';
import { google } from '@google-cloud/text-to-speech/build/protos/protos';
import * as fs from 'node:fs/promises';
import { playSound } from './util/playSound';
// const speak = async (text: string, speechvoice: number): Promise<void> => {
//   let voice: string[] = ['Microsoft David Desktop', 'Microsoft Zira Desktop'];

//   return new Promise((resolve, reject) => {
//     say.speak(text, voice[speechvoice], 1, (err) => {
//       if (err) {
//         reject(err);
//       } else {
//         resolve();
//       }
//     });
//   });
// };
export type GoogleVoice =
  | 'en-US-Wavenet-A'
  | 'en-US-Wavenet-B'
  | 'en-US-Wavenet-C'
  | 'en-US-Wavenet-D'
  | 'en-US-Wavenet-E'
  | 'en-US-Wavenet-F'
  | 'en-US-Wavenet-G'
  | 'en-US-Wavenet-H'
  | 'en-US-Wavenet-I'
  | 'en-US-Wavenet-J'
  | 'en-US-Wavenet-K'
  | 'en-US-Wavenet-L'
  | 'en-US-Wavenet-M'
  | 'en-US-Wavenet-N'
  | 'en-US-Wavenet-O'
  | 'en-US-Wavenet-P'
  | 'en-US-Wavenet-Q'
  | 'en-US-Wavenet-R'
  | 'en-US-Wavenet-S'
  | 'en-US-Wavenet-T'
  | 'en-US-Wavenet-U'
  | 'en-US-Wavenet-V'
  | 'en-US-Wavenet-W'
  | 'en-US-Wavenet-X'
  | 'en-US-Wavenet-Y'
  | 'en-US-Wavenet-Z'
  | 'en-US-Standard-A'
  | 'en-US-Standard-B'
  | 'en-US-Standard-C'
  | 'en-US-Standard-D'
  | 'en-US-Standard-E'
  | 'en-US-Standard-F'
  | 'en-US-Standard-G'
  | 'en-US-Standard-H'
  | 'en-US-Standard-I'
  | 'en-US-Standard-J';

const client = new tts.TextToSpeechClient();

export const listVoices = async () => {
  let [voices] = await client.listVoices({ languageCode: 'en-US' });
  return voices.voices;
};

const speak = async (text: string, speechvoice: GoogleVoice): Promise<void> => {
  const request: google.cloud.texttospeech.v1.ISynthesizeSpeechRequest = {
    input: { text },
    voice: {
      languageCode: 'en-US',
      name: speechvoice,
    },
    audioConfig: { audioEncoding: 'MP3' },
  };

  const [response] = await client.synthesizeSpeech(request);
  const soundPath = `./public/generatedVoices/${Date.now()}.mp3`;
  if (!response.audioContent) throw new Error('No audio content');
  await fs.writeFile(soundPath, response.audioContent, 'binary');
  await playSound(soundPath);
};

export default speak;
