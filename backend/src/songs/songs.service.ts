import { BadRequestException, Injectable } from '@nestjs/common';
import { SongEntity } from './entities/song.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ISongList } from './interfaces/song.response.interface';
import { BandsService } from 'src/bands/bands.service';
import { SongsQueryDto } from './dto/songs.query.dto';
import {
  PAGINATION_SKIP_DEFAULT,
  PAGINATION_TAKE_DEFAULT,
} from 'src/common/constants';
import { SongDto } from './dto/song.dto';

@Injectable()
export class SongsService {
  constructor(
    @InjectRepository(SongEntity)
    private songsRepository: Repository<SongEntity>,
    private BandService: BandsService,
  ) {}

  async getAllSongs(filters: SongsQueryDto): Promise<ISongList> {
    const Query = await this.songsRepository
      .createQueryBuilder('song')
      .leftJoinAndSelect('song.band', 'band')
      .orderBy('song.id', 'DESC')
      .take(filters.take || PAGINATION_TAKE_DEFAULT)
      .skip((filters.skip || PAGINATION_SKIP_DEFAULT) * filters.take);

    if (filters.minYear && filters.maxYear) {
      Query.andWhere('song.year >= :minYear AND song.year <= :maxYear', {
        minYear: filters.minYear,
        maxYear: filters.maxYear,
      });
    }

    if (filters.bands) {
      Query.andWhere('song.band IN (:...bands)', {
        bands: filters.bands,
      });
    }

    if (filters.search) {
      const searchTerm = filters.search.toLowerCase();
      Query.andWhere(
        'LOWER(song.name) LIKE :search OR LOWER(band.name) LIKE :search',
        {
          search: `%${searchTerm}%`,
        },
      );
    }

    const [data, number] = await Query.getManyAndCount();
    return {
      songs: data,
      total: number,
    };
  }

  async addSongsByCSV(file: Express.Multer.File) {
    const songsFileData = await this.parseCSV(file);
    if (songsFileData.length > 1) {
      for (let i = 0; i < songsFileData.length; i++) {
        const songRow = songsFileData[i];

        // band add
        try {
          let band = await this.BandService.getBandByName(songRow.Band);
          if (!band) {
            band = await this.BandService.addBand(songRow.Band);
          }

          // song add
          const songEntity = new SongEntity();
          songEntity.name = songRow['Song Name'];
          songEntity.year = parseInt(songRow.Year);
          songEntity.band = band;
          await this.addUpdateSong(songEntity);
        } catch (error) {
          console.log(error);
        }
      }
      console.log('All songs added successfully');
    } else {
      throw new BadRequestException('An error occurred while parsing the CSV');
    }
  }

  async addNewSong(songDto: SongDto): Promise<void> {
    try {
      let band = await this.BandService.getBandByName(songDto.band);
      if (!band) {
        band = await this.BandService.addBand(songDto.band);
      }
      const song = new SongEntity();
      song.name = songDto.name;
      song.band = band;
      song.year = songDto.year;
      await this.addUpdateSong(song);
    } catch (error) {
      throw new BadRequestException('An error occurred while adding the song');
    }
  }

  async addUpdateSong(song: SongEntity): Promise<void> {
    try {
      // we need to check if the song already exists
      const songExists = await this.findSong(song);
      if (songExists) {
        // if it exists, we update it
        song.id = songExists.id;
      }
      // save the song (or update it if it already exists)
      await this.songsRepository.save(song);
    } catch (error) {
      throw new BadRequestException('An error occurred while adding the song');
    }
  }

  async findSong(songEnt: SongEntity): Promise<SongEntity> {
    try {
      const song = await this.songsRepository.findOne({
        where: {
          name: songEnt.name,
          band: songEnt.band,
          year: songEnt.year,
        },
      });
      return song;
    } catch (error) {
      throw new BadRequestException('An error occurred while finding the song');
    }
  }

  async parseCSV(file: Express.Multer.File): Promise<any[]> {
    try {
      const fileStr = file.buffer.toString('utf8');
      const delimiter = ';';
      const lines = fileStr.split('\n');
      const result = [];
      const headers = lines[0].split(delimiter).map((item) => item.trim());

      for (let i = 1; i < lines.length; i++) {
        const obj = {};
        const currentline = lines[i]
          .split(delimiter)
          .map((item) => item.trim());
        // remove empty lines
        if (currentline.join('') === '') continue;

        for (let j = 0; j < headers.length; j++) {
          obj[headers[j]] = currentline[j];
        }
        result.push(obj);
      }
      return result;
    } catch (error) {
      console.error(`An error occurred: ${error.message}`);
      throw new BadRequestException('An error occurred while parsing the CSV');
    }
  }

  async deleteSong(id: number) {
    try {
      // try to find the song
      const song = await this.songsRepository.findOne({
        where: { id },
        relations: { band: true },
      });
      if (!song) {
        throw new BadRequestException('Song not found');
      }
      await this.songsRepository.softDelete(id);

      // check if the band has more songs if not we delete the band also
      const songsLeft = await this.songsRepository.count({
        where: { band: song.band },
      });

      if (songsLeft === 0) {
        await this.BandService.deleteBand(song.band.id);
      }
    } catch (error) {
      throw new BadRequestException(
        'An error occurred while deleting the song with id: ' + id,
      );
    }
  }
}
