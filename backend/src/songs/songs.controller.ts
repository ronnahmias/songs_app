import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { SongsService } from './songs.service';
import { ApiBody, ApiConsumes, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ISongList } from './interfaces/song.response.interface';
import { FileInterceptor } from '@nestjs/platform-express';
import { SongsQueryDto } from './dto/songs.query.dto';
import { SongDto } from './dto/song.dto';

@ApiTags('Songs Controller')
@Controller({
  version: '1',
  path: 'songs',
})
export class SongsController {
  constructor(private readonly songsService: SongsService) {}

  @ApiOperation({ summary: 'Get All Songs From DB With filters' })
  @Get()
  async getSongs(@Query() filters: SongsQueryDto): Promise<ISongList> {
    return this.songsService.getAllSongs(filters);
  }

  @ApiOperation({ summary: 'Add New Song' })
  @Post()
  async addNewSong(@Body() dto: SongDto) {
    console.log('add new song', dto);
    return await this.songsService.addNewSong(dto);
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
    await this.songsService.addSongsByCSV(file);
  }

  @Delete(':id')
  async deleteSong(@Param('id', ParseIntPipe) id: number) {
    return await this.songsService.deleteSong(id);
  }
}
