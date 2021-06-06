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
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

  
import {FindOneParams} from '../utils/validation';
import UserService from './user.service';

@ApiBearerAuth()
@ApiTags('Manage Users')
@Controller('user')
export class UserController {
    constructor(
        private readonly userService: UserService
    
      ) {}
    
    
    
      @Get('search')
      getAllProducts() {
        return this.userService.getAllUsers();
      }
    
      @Get(':id')
      getProductById(@Param() { id }: FindOneParams) {
        return this.userService.getUserById(Number(id));
      }
    
      @Post()
      async createUser(@Body() product: any) {
        return this.userService.createUser(product);
      }
    
      @Patch(':id')
      async updateUser(@Param() { id }: FindOneParams, @Body() product: any) {
        return this.userService.updateUser(Number(id), product);
      }
    
      @Delete(':id')
      async deleteUser(@Param() { id }: FindOneParams) {
        return this.userService.deleteUser(Number(id));
      }
      
}
