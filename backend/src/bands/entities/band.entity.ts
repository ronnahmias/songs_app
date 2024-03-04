import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { IBand } from '../interfaces/band.interface';
import { ISong } from 'src/songs/interfaces/song.interface';
import { SongEntity } from '../../songs/entities/song.entity';

@Entity({
  name: 'bands',
  synchronize: true,
})
export class BandEntity implements IBand {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'varchar', length: 255, nullable: false })
  name: string;

  @OneToMany(() => SongEntity, (song) => song.band, {
    cascade: true,
  })
  songs: ISong[];
}
