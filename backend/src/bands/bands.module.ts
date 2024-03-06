import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BandEntity } from './entities/band.entity';
import { BandsService } from './bands.service';
import { BandsController } from './bands.controller';

@Module({
  imports: [TypeOrmModule.forFeature([BandEntity])],
  controllers: [BandsController],
  providers: [BandsService],
  exports: [BandsService],
})
export class BandsModule {}
