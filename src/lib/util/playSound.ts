import { spawn } from 'child_process';

export const playSound = async (soundPath: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    const sound = spawn('ffplay', ['-nodisp', '-autoexit', soundPath]);
    sound.on('close', () => {
      resolve();
    });
    sound.on('error', (err) => {
      reject(err);
    });
  });
};
