import { IsString, IsNotEmpty, IsNumber, IsOptional, IsEmpty } from 'class-validator';

export class UpdateProductDto {
  @IsNumber()
  @IsOptional()
  id: number;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  name: string;

  @IsNumber()
  @IsNotEmpty()
  price:number;

  @IsOptional()
  categorieId:number
}

export default UpdateProductDto;