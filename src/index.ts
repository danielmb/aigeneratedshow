import generateJakeRachelMike from 'lib/plays/JakeRachelMike';
import actPlay, { setDebug } from './tts';
import * as fs from 'fs/promises';
import generateJake from 'lib/plays/JakeStandUp';
import { Scene } from 'lib/plays/types';
import randomPlay from 'lib/plays/randomPlay';
import randomPlayFixedCharacter from 'lib/plays/randomPlayFixedCharacters';
setDebug(true);

(async () => {
  let plays: Scene[] = [];
  // plays.push(await generateJakeRachelMike());
  plays.push(await randomPlayFixedCharacter());
  for (let play of plays) {
    await fs.writeFile(
      `plays/${Date.now()}.json`,
      JSON.stringify(play.play, null, 2),
    );
    await actPlay(play.play, play.characters);
  }
})();
