import { Module } from '@nestjs/common';
import InventoryController from './inventory.controller';
import CategorieService from './categorie.service';
import ProductService from './product.service';

import { Product, ProductCategories } from './inventory.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InventoryResolver } from './resolver';

@Module({
  imports: [TypeOrmModule.forFeature([Product, ProductCategories])],
  controllers: [InventoryController],
  providers: [CategorieService, ProductService, InventoryResolver],
})
export class InventoryModule { }
