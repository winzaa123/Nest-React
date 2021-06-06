import { IsString, IsNotEmpty, IsNumber, IsOptional, IsEmpty } from 'class-validator';
import { ApiProperty,ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateProductDto {
  @ApiProperty({})
  @IsNumber()
  @IsOptional()
  id: number;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  name: string;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  price:number;

  @ApiPropertyOptional({default:null})
  @IsOptional()
  categorieId:number
}

export default UpdateProductDto;