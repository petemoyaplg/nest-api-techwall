import { Type } from 'class-transformer';
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUrl,
  Max,
  Min,
} from 'class-validator';

export class AddCvDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  firstname: string;

  @IsNumber()
  @IsNotEmpty()
  @Type(() => Number)
  @Min(18)
  @Max(50)
  age: number;

  @IsNumber()
  @IsNotEmpty()
  cin: number;

  @IsNotEmpty()
  @IsString()
  job: string;

  @IsString()
  @IsOptional()
  path: string;

  @IsString()
  @IsOptional()
  @IsUrl()
  url: string;
}

export class UpdateCvDto {
  @IsString()
  @IsOptional()
  name: string;

  @IsString()
  @IsOptional()
  firstname: string;

  @IsNumber()
  @Type(() => Number)
  @Min(18)
  @Max(50)
  @IsOptional()
  age: number;

  @IsNumber()
  @IsOptional()
  cin: number;

  @IsOptional()
  @IsString()
  job: string;

  @IsString()
  @IsOptional()
  path: string;

  @IsString()
  @IsOptional()
  @IsUrl()
  url: string;
}
