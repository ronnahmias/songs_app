import { IBand } from 'src/bands/interfaces/band.interface';

export interface ISong {
  id: number;
  name: string;
  band: IBand;
  year: number;
  ytVideoId: string;
  deletedAt?: Date;
}
