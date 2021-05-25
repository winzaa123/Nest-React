import { Module } from '@nestjs/common';
import InventoryController from './inventory.controller';
import CategorieService from './categorie.service';
import ProductService from './product.service';

import {Product,ProductCategories} from './inventory.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Product,ProductCategories])],
  controllers: [InventoryController],
  providers: [CategorieService,ProductService],
})
export class InventoryModule {}
