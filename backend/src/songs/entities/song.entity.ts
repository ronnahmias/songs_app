import {
  Column,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ISong } from '../interfaces/song.interface';
import { IBand } from 'src/bands/interfaces/band.interface';
import { BandEntity } from '../../bands/entities/band.entity';

@Entity({
  name: 'songs',
  synchronize: true,
})
export class SongEntity implements ISong {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'varchar', length: 255, nullable: false })
  name: string;

  @ManyToOne(() => BandEntity, (band) => band.songs)
  band: IBand;

  @Column({ type: 'int', nullable: false })
  year: number;

  @DeleteDateColumn()
  deletedAt?: Date;
}
