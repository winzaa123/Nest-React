import { IsString, IsNotEmpty, IsNumber, IsOptional,IsEmpty } from 'class-validator';
import { ApiProperty,ApiPropertyOptional } from '@nestjs/swagger';

export class CreateProductDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  price:number

  @ApiPropertyOptional({default:null})
  @IsOptional()
  categorieId:number
}

export default CreateProductDto;