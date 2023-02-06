import { google } from '@google-cloud/text-to-speech/build/protos/protos';
import * as fs from 'fs';

let voices = JSON.parse(
  fs.readFileSync('./voices.json', 'utf8'),
) as google.cloud.texttospeech.v1beta1.IVoice[];

let males = voices
  .filter((voice) => {
    return voice.ssmlGender === 'MALE';
  })
  .map((voice) => {
    return voice.name;
  })
  .join(', ');

let females = voices
  .filter((voice) => {
    return voice.ssmlGender === 'FEMALE';
  })
  .map((voice) => {
    return voice.name;
  })
  .join(', ');

console.log(males);
console.log(females);
