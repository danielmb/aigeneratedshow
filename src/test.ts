import chatgpt from 'lib/openai';
// import play from '../plays/1676852500160.json';
import fs from 'fs';
import { Character, Play, Scene } from 'lib/plays/types';
import actPlay from 'tts';
import generateSpeech from 'lib/elevenlabs';
let playFs = fs.readFileSync('plays/1676852500160.json', 'utf8');
let play = JSON.parse(playFs) as Scene;
(async () => {
  await actPlay(play.play, play.characters);
})();
