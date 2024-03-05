import { Module } from '@nestjs/common';
import { SongsController } from './songs.controller';
import { SongsService } from './songs.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SongEntity } from './entities/song.entity';
import { BandsModule } from 'src/bands/bands.module';

@Module({
  imports: [TypeOrmModule.forFeature([SongEntity]), BandsModule],
  controllers: [SongsController],
  providers: [SongsService],
})
export class SongsModule {}
