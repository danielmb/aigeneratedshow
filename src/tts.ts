import { Character, Play } from 'lib/plays/types';
import speak, { playSound } from './lib/speech';

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
  for (let scene of play) {
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
        await speak(scene.text, character.voice);
      } else {
        await speak(scene.text, 'en-US-Standard-B');
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
  log('Play complete');
};

export default actPlay;
