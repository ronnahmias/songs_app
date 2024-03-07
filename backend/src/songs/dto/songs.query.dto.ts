import { ApiProperty } from '@nestjs/swagger';
import { ISongsQuery } from '../interfaces/songs.query.interface';
import { IsArray, IsNumberString, IsOptional, IsString } from 'class-validator';

export class SongsQueryDto implements ISongsQuery {
  @ApiProperty({ required: false, type: Number })
  @IsOptional()
  @IsNumberString()
  take?: string;

  @ApiProperty({ required: false, type: Number })
  @IsOptional()
  @IsNumberString()
  skip?: string;

  @ApiProperty({ required: false, type: String })
  @IsOptional()
  @IsString()
  search?: string;

  @ApiProperty({ required: false, type: Number })
  @IsOptional()
  @IsNumberString()
  minYear?: string;

  @ApiProperty({ required: false, type: Number })
  @IsOptional()
  @IsNumberString()
  maxYear?: string;

  @ApiProperty({ required: false, type: [Number] })
  @IsOptional()
  @IsArray()
  @IsNumberString({}, { each: true })
  bands?: number[];
}
