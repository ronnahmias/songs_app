import { ApiProperty } from '@nestjs/swagger';
import { ISongDto } from '../interfaces/song.dto.interface';
import { IsNotEmpty, IsNumber, IsString, Max, Min } from 'class-validator';

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
  @IsNumber()
  @Min(1900)
  @Max(new Date().getFullYear())
  year: number;
}
