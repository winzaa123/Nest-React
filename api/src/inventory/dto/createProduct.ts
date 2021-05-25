import { IsString, IsNotEmpty, IsNumber, IsOptional,IsEmpty } from 'class-validator';

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  @IsNotEmpty()
  price:number

  @IsOptional()
  categorieId:number
}

export default CreateProductDto;