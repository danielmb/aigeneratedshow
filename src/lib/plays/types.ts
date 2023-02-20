import { Voices } from 'lib/elevenlabs';
import { GoogleVoice } from 'lib/speech';

export interface Character {
  name: string;
  description: string;
  // voice: GoogleVoice;
  voice: Voices;
}

export interface Scene {
  play: Play;
  characters: Character[];
}

export interface Action {
  action:
    | 'LAUGHTRACK'
    | 'APPLAUSE'
    | 'CROWD CHEER'
    | 'CROWD BOO'
    | 'CROWD WHISTLE'
    | 'CROWD WHOO';
}
export interface Speech {
  text: string;
  speaker: string;
}
export type PlayScene = Action | Speech;
export type Play = PlayScene[];
