import { Injectable } from '@nestjs/common';


import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';
import {User,UserSocial} from './user.entity';


class DataNotFoundException extends NotFoundException {
    constructor(postId: number) {
      super(`with id ${postId} not found`);
    }
  }
@Injectable()
export default class UserService {
    constructor(
        @InjectRepository(User)
        private userRepo: Repository<User>
    
      ) {}
    
      
      
      getAllProducts() {
        return this.userRepo.find({   });
      }
    
      async getProductById(id: number) {
        const product = await this.userRepo.findOne(id, {   });
        if (product) {
          return product;
        }
        throw new DataNotFoundException(id);
      }
    
      async createProduct(product: any) {
        const newData = await this.userRepo.create(product)
        await this.userRepo.save(newData)
        return newData
      }
    
      async updateProduct(id: number, product: any) {
        await this.userRepo.update(id, product);
        const updatedData = await this.userRepo.findOne(id);
        if (updatedData) {
          return updatedData
        }
        throw new DataNotFoundException(id);
      }
    
      async deleteProduct(id: number) {
        const deleteData = await this.userRepo.delete(id);
        if (!deleteData.affected) {
          throw new DataNotFoundException(id);
        }
      }
}
