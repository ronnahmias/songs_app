import { Repository } from 'typeorm';
import { BandEntity } from './entities/band.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';

@Injectable()
export class BandsService {
  constructor(
    @InjectRepository(BandEntity)
    private bandsRepository: Repository<BandEntity>,
  ) {}

  async getBandByName(name: string): Promise<BandEntity> {
    return this.bandsRepository.findOne({ where: { name } });
  }

  async addBand(name: string): Promise<BandEntity> {
    const band = new BandEntity();
    band.name = name;
    return this.bandsRepository.save(band);
  }

  async getBands(): Promise<BandEntity[]> {
    return this.bandsRepository.find({
      order: {
        name: 'ASC',
      },
    });
  }

  async deleteBand(id: number): Promise<void> {
    this.bandsRepository.softDelete(id);
  }
}
