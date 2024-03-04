import { ISong } from 'src/songs/interfaces/song.interface';

export interface IBand {
  id: number;
  name: string;
  songs: ISong[];
}
