import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BandEntity } from './entities/band.entity';
import { BandsService } from './bands.service';

@Module({
  imports: [TypeOrmModule.forFeature([BandEntity])],
  providers: [BandsService],
  exports: [BandsService],
})
export class BandsModule {}
