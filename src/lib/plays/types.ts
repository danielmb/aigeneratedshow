import { GoogleVoice } from 'lib/speech';

export interface Character {
  name: string;
  description: string;
  voice: GoogleVoice;
}
