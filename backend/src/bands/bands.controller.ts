import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { BandsService } from './bands.service';
import { BandEntity } from './entities/band.entity';

@ApiTags('Band Controller')
@Controller({
  path: 'bands',
  version: '1',
})
export class BandsController {
  constructor(private readonly bandsService: BandsService) {}

  @Get()
  getBands(): Promise<BandEntity[]> {
    return this.bandsService.getBands();
  }
}
