import { spawn } from 'child_process';

export const combineSounds = async (
  outputName: string,
  soundPaths: string[],
): Promise<string> => {
  return new Promise((resolve, reject) => {
    const sound = spawn('ffmpeg', [
      '-i',
      'concat:' + soundPaths.join('|'),
      '-c',
      'copy',
      outputName,
    ]);
    sound.on('close', () => {
      resolve('output.mp3');
    });
    sound.on('error', (err) => {
      reject(err);
    });
  });
};
