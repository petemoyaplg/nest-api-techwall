import { Type } from 'class-transformer';
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';

export class GetTodos {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  description: string;
}

export class AddTodoDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(6, { message: 'La taille minimal doit être superieur à 6' })
  name: string;

  @IsString()
  @IsNotEmpty()
  description: string;
}

export class UpdateTodoDto {
  @IsNumber()
  @IsNotEmpty()
  id: number;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  description: string;
}

export class GetPaginatedTodoDto {
  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  page: number;

  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  item: number;
}
