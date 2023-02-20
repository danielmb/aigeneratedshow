import generateSpeech, { maleVoices } from 'lib/elevenlabs';
import { Character, Play } from 'lib/plays/types';
import { combineSounds } from 'lib/util/combineSounds';
import { playSound } from 'lib/util/playSound';

let debug = false;
export const setDebug = (value: boolean) => {
  debug = value;
};
let log = (text: string) => {
  if (debug) {
    console.log(text);
  }
};
const actPlay = async (play: Play, characters: Character[]) => {
  // let playGeneratedSound = play.map((scene) => {
  //   if ('speaker' in scene) {
  //     return {
  //       ...scene,
  //       sound: generateSpeech(scene.text, scene.speaker),
  //     };
  //   }
  //   return scene;
  // });
  console.log('Generating sounds');
  const playGeneratedSound = await Promise.all(
    play.map(async (scene) => {
      if ('speaker' in scene) {
        let speaker = scene.speaker;
        let character = characters.find((c) => {
          return c.name === speaker;
        });
        if (character) {
          return {
            ...scene,
            sound: await generateSpeech(scene.text, character.voice),
          };
        } else {
          return scene;
        }
      }
      return scene;
    }),
  );
  let sounds: string[] = [];
  for (let scene of playGeneratedSound) {
    if ('action' in scene) {
      log('ACTION: ' + scene.action);
      switch (scene.action) {
        case 'LAUGHTRACK':
          sounds.push('public/LAUGHTRACK.mp3');
          break;
        case 'APPLAUSE':
          sounds.push('public/APPLAUSE.mp3');
          break;
        case 'CROWD CHEER':
          sounds.push('public/CROWD CHEER.mp3');
          break;
        case 'CROWD BOO':
          sounds.push('public/CROWD BOO.wav');
          break;
        default:
          break;
      }
    } else {
      log('SPEECH: ' + scene.speaker + ' ' + scene.text);
      let speaker = scene.speaker;
      let character = characters.find((c) => {
        return c.name === speaker;
      });
      if (character) {
        if ('sound' in scene) {
          sounds.push(scene.sound);
        }
      }
    }
  }
  await combineSounds('public/combined.mp3', sounds);
  for (let scene of playGeneratedSound) {
    if ('action' in scene) {
      log('ACTION: ' + scene.action);
      switch (scene.action) {
        case 'LAUGHTRACK':
          await playSound('public/LAUGHTRACK.mp3');
          break;
        case 'APPLAUSE':
          await playSound('public/APPLAUSE.mp3');
          break;
        case 'CROWD CHEER':
          await playSound('public/CROWD CHEER.mp3');
          break;
        case 'CROWD BOO':
          await playSound('public/CROWD BOO.wav');
          break;
        default:
          break;
      }
    } else {
      log('SPEECH: ' + scene.speaker + ' ' + scene.text);
      let speaker = scene.speaker;
      let character = characters.find((c) => {
        return c.name === speaker;
      });
      if (character) {
        if ('sound' in scene) {
          await playSound(scene.sound);
        }
      }
      // switch (scene.speaker) {
      //   case 'Jake':
      //     await speak(scene.text, 'en-US-Standard-B');
      //     break;
      //   case 'Rachel':
      //     await speak(scene.text, 'en-US-Standard-F');
      //     break;
      //   case 'Mike':
      //     await speak(scene.text, 'en-US-Standard-D');
      //     break;
      //   default:
      //     break;
      // }
    }
  }
  // combine all sounds into one sound using ffmpeg

  log('Play complete');
};

export default actPlay;
