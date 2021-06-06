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

  
import {FindOneParams} from '../utils/validation';
import UserService from './user.service';
@Controller('user')
export class UserController {
    constructor(
        private readonly userService: UserService
    
      ) {}
    
    
    
      @Get('search')
      getAllProducts() {
        return this.userService.getAllProducts();
      }
    
      @Get(':id')
      getProductById(@Param() { id }: FindOneParams) {
        return this.userService.getProductById(Number(id));
      }
    
      @Post()
      async createUser(@Body() product: any) {
        return this.userService.createProduct(product);
      }
    
      @Patch(':id')
      async updateUser(@Param() { id }: FindOneParams, @Body() product: any) {
        return this.userService.updateProduct(Number(id), product);
      }
    
      @Delete(':id')
      async deleteUser(@Param() { id }: FindOneParams) {
        return this.userService.deleteProduct(Number(id));
      }
      
}
