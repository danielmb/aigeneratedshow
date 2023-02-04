import generateJakeRachelMike from 'lib/plays/JakeRachelMike';
import actPlay, { setDebug } from './tts';
import * as fs from 'fs/promises';
setDebug(true);
(async () => {
  let { play, characters } = await generateJakeRachelMike();
  await fs.writeFile(
    `./plays/${Date.now()}.json`,
    JSON.stringify(play, null, 2),
  );
  console.log(play);
  await actPlay(play, characters);
})();
