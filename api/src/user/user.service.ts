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
    
      
      async findOneByEmail(email: string): Promise<User | undefined> {
        return this.userRepo.findOne({email},{select:["id","email","password"]});
      }
      
      getAllUsers() {
        return this.userRepo.find({   });
      }
    
      async getUserById(id: number) {
        const product = await this.userRepo.findOne(id, {   });
        if (product) {
          return product;
        }
        throw new DataNotFoundException(id);
      }
    
      async createUser(user: User) {
        const newData = await this.userRepo.create(user)
        await this.userRepo.save(newData)
        return newData
      }
    
      async updateUser(id: number, product: User) {
        await this.userRepo.update(id, product);
        const updatedData = await this.userRepo.findOne(id);
        if (updatedData) {
          return updatedData
        }
        throw new DataNotFoundException(id);
      }
    
      async deleteUser(id: number) {
        const deleteData = await this.userRepo.delete(id);
        if (!deleteData.affected) {
          throw new DataNotFoundException(id);
        }
      }
}
