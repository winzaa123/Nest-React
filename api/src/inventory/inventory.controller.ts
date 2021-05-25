import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  UseInterceptors,
  ClassSerializerInterceptor, Post,
} from '@nestjs/common';
import CategoryService from './categorie.service';
import ProductService from './product.service';

import CreateCategoryDto from './dto/createCategorie';
import UpdateCategoryDto from './dto/updateCategorie';

import CreatProductDto from './dto/createProduct';
import UpdatProductDto from './dto/updateProduct';

import {FindOneParams} from '../utils/validation';

@Controller('product')
@UseInterceptors(ClassSerializerInterceptor)
export default class InventoryController {
  constructor(
    private readonly categoriesService: CategoryService,
    private readonly productService: ProductService

  ) {}

  @Get('categories')
  getAllCategories() {
    return this.categoriesService.getAllCategories();
  }

  @Get('/categorie/:id')
  getCategoryById(@Param() { id }: FindOneParams) {
    return this.categoriesService.getCategoryById(Number(id));
  }

  @Post('/categorie')
  async createCategory(@Body() category: CreateCategoryDto) {
    return this.categoriesService.createCategory(category);
  }

  @Patch('/categorie/:id')
  async updateCategory(@Param() { id }: FindOneParams, @Body() category: UpdateCategoryDto) {
    return this.categoriesService.updateCategory(Number(id), category);
  }

  @Delete('/categorie/:id')
  async deleteCategory(@Param() { id }: FindOneParams) {
    return this.categoriesService.deleteCategory(Number(id));
  }


  @Get('search')
  getAllProducts() {
    return this.productService.getAllProducts();
  }

  @Get(':id')
  getProductById(@Param() { id }: FindOneParams) {
    return this.productService.getProductById(Number(id));
  }

  @Post()
  async createProduct(@Body() product: CreatProductDto) {
    return this.productService.createProduct(product);
  }

  @Patch(':id')
  async updateProduct(@Param() { id }: FindOneParams, @Body() product: UpdatProductDto) {
    return this.productService.updateProduct(Number(id), product);
  }

  @Delete(':id')
  async deleteProduct(@Param() { id }: FindOneParams) {
    return this.productService.deleteProduct(Number(id));
  }
  

}
