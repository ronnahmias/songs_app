import { Injectable } from '@nestjs/common';
import { SongEntity } from './entities/song.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ISongResponse } from './interfaces/song.response.interface';

@Injectable()
export class SongsService {
  constructor(
    @InjectRepository(SongEntity)
    private songsRepository: Repository<SongEntity>,
  ) {}

  async getAllSongs(): Promise<ISongResponse[]> {
    return this.songsRepository.find({
      relations: {
        band: true,
      },
    });
  }
}
