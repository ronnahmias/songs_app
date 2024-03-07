import { IBand } from "../bands/band.interface";

export interface ISong {
  id: number;
  name: string;
  band: IBand;
  year: number;
  ytVideoId: string;
}

export interface ISongList {
  songs: ISong[];
  total: number;
}
