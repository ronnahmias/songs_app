import { ApiProperty } from '@nestjs/swagger';
import { ISongsQuery } from '../interfaces/songs.query.interface';
import { IsArray, IsNumberString, IsOptional, IsString } from 'class-validator';

export class SongsQueryDto implements ISongsQuery {
  @ApiProperty({ required: false, type: Number })
  @IsOptional()
  @IsNumberString()
  take?: number;

  @ApiProperty({ required: false, type: Number })
  @IsOptional()
  @IsNumberString()
  skip?: number;

  @ApiProperty({ required: false, type: String })
  @IsOptional()
  @IsString()
  search?: string;

  @ApiProperty({ required: false, type: Number })
  @IsOptional()
  @IsNumberString()
  minYear?: number;

  @ApiProperty({ required: false, type: Number })
  @IsOptional()
  @IsNumberString()
  maxYear?: number;

  @ApiProperty({ required: false, type: [Number] })
  @IsOptional()
  @IsArray()
  @IsNumberString({}, { each: true })
  bands?: number[];
}
