import { IsString, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateCategoryDto {
  @ApiProperty()
  @IsNumber()
  @IsOptional()
  id: number;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;
}

export default UpdateCategoryDto;