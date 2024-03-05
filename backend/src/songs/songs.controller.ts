import {
  BadRequestException,
  Controller,
  Get,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { SongsService } from './songs.service';
import { ApiBody, ApiConsumes, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ISongList } from './interfaces/song.response.interface';
import { FileInterceptor } from '@nestjs/platform-express';

@ApiTags('Songs Controller')
@Controller({
  version: '1',
  path: 'songs',
})
export class SongsController {
  constructor(private readonly songsService: SongsService) {}

  @ApiOperation({ summary: 'Get All Songs From DB With filters' })
  @Get()
  async getSongs(): Promise<ISongList> {
    return this.songsService.getAllSongs();
  }

  @ApiOperation({ summary: 'Add New Song' })
  @Post()
  async addNewSong() {
    return 'hello from songs controller!';
  }

  @ApiOperation({ summary: 'Upload CSV file of songs' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'CSV file',
    type: 'object',
    schema: {
      type: 'object',
      properties: {
        csv: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @Post('upload')
  @UseInterceptors(
    FileInterceptor('csv', {
      fileFilter: (req, file, callback) => {
        if (!file.originalname.match(/\.(csv)$/)) {
          return callback(
            new BadRequestException('Only CSV files are allowed!'),
            false,
          );
        }
        callback(null, true);
      },
    }),
  )
  async uploadSongsCsv(@UploadedFile() file: Express.Multer.File) {
    console.log('upload file');

    this.songsService.addSongsByCSV(file);
  }
}
