import { Injectable } from '@nestjs/common';
import CreateCategoryDto from './dto/createCategorie';
import {ProductCategories} from './inventory.entity';
import UpdateCategoryDto from './dto/updateCategorie';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';



class DataNotFoundException extends NotFoundException {
  constructor(postId: number) {
    super(`with id ${postId} not found`);
  }
}
@Injectable()
export default class CategoryService {
  constructor(
    @InjectRepository(ProductCategories)
    private categoriesRepository: Repository<ProductCategories>

  ) {}

  getAllCategories() {
    return this.categoriesRepository.find({  });
  }

  async getCategoryById(id: number) {
    const category = await this.categoriesRepository.findOne(id, {  });
    if (category) {
      return category;
    }
    throw new DataNotFoundException(id);
  }

  async createCategory(category: CreateCategoryDto) {
    const newCategory = await this.categoriesRepository.create(category);
    await this.categoriesRepository.save(newCategory);
    return newCategory;
  }

  async updateCategory(id: number, category: UpdateCategoryDto) {
    await this.categoriesRepository.update(id, category);
    const updatedCategory = await this.categoriesRepository.findOne(id, {  });
    if (updatedCategory) {
      return updatedCategory
    }
    throw new DataNotFoundException(id);
  }

  async deleteCategory(id: number) {
    const deleteResponse = await this.categoriesRepository.delete(id);
    if (!deleteResponse.affected) {
      throw new DataNotFoundException(id);
    }
  }


  
}
