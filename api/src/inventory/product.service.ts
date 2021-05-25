
import { Injectable } from '@nestjs/common';
import {Product} from './inventory.entity';
import CreateProductDto from './dto/createProduct';
import UpdateProductDto from './dto/updateProduct';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';



class DataNotFoundException extends NotFoundException {
  constructor(postId: number) {
    super(`with id ${postId} not found`);
  }
}
@Injectable()
export default class ProductService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>

  ) {}

  
  
  getAllProducts() {
    return this.productRepository.find({ relations: ['categorie'] });
  }

  async getProductById(id: number) {
    const product = await this.productRepository.findOne(id, { relations: ['categorie'] });
    if (product) {
      return product;
    }
    throw new DataNotFoundException(id);
  }

  async createProduct(product: CreateProductDto) {
    const newData = await this.productRepository.create(product)
    await this.productRepository.save(newData)
    return newData
  }

  async updateProduct(id: number, product: UpdateProductDto) {
    await this.productRepository.update(id, product);
    const updatedData = await this.productRepository.findOne(id);
    if (updatedData) {
      return updatedData
    }
    throw new DataNotFoundException(id);
  }

  async deleteProduct(id: number) {
    const deleteData = await this.productRepository.delete(id);
    if (!deleteData.affected) {
      throw new DataNotFoundException(id);
    }
  }

  
}


