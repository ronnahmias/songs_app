import { Controller, Get, Post } from '@nestjs/common';
import { SongsService } from './songs.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { ISongResponse } from './interfaces/song.response.interface';

@ApiTags('Songs Controller')
@Controller({
  version: '1',
  path: 'songs',
})
export class SongsController {
  constructor(private readonly songsService: SongsService) {}

  @ApiOperation({ summary: 'Get All Songs From DB With filters' })
  @Get()
  async getSongs(): Promise<ISongResponse[]> {
    return this.songsService.getAllSongs();
  }

  @ApiOperation({ summary: 'Add New Song' })
  @Post()
  async addNewSong() {
    return 'hello from songs controller!';
  }

  @ApiOperation({ summary: 'Upload CSV file of songs' })
  @Post('upload')
  async uploadSongsCsv() {
    return 'hello from songs controller!';
  }
}
