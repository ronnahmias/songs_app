import { BadRequestException, Injectable } from '@nestjs/common';
import { SongEntity } from './entities/song.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ISongList } from './interfaces/song.response.interface';
import { BandsService } from 'src/bands/bands.service';

@Injectable()
export class SongsService {
  constructor(
    @InjectRepository(SongEntity)
    private songsRepository: Repository<SongEntity>,
    private BandService: BandsService,
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
}
