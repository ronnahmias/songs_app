import { Injectable } from '@nestjs/common';
import { SongEntity } from './entities/song.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ISongList } from './interfaces/song.response.interface';

@Injectable()
export class SongsService {
  constructor(
    @InjectRepository(SongEntity)
    private songsRepository: Repository<SongEntity>,
  ) {}

  async getAllSongs(): Promise<ISongList> {
    const [data, number] = await this.songsRepository.findAndCount({
      relations: {
        band: true,
      },
    });

    return {
      songs: data,
      total: number,
    };
  }
}
