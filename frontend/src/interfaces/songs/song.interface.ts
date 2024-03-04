import { IBand } from "../bands/band.interface";

export interface ISong {
  id: number;
  name: string;
  band: IBand;
  year: number;
}

export interface ISongList {
  songs: ISong[];
  total: number;
}
