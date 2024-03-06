import { ApiProperty } from '@nestjs/swagger';
import { ISongDto } from '../interfaces/song.dto.interface';
import { IsNotEmpty, IsString } from 'class-validator';
import { IsYearRange } from 'src/common/year.decorator';

export class SongDto implements ISongDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  band: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsYearRange({ message: 'Year must be between 1900 and current year' })
  year: number;
}
