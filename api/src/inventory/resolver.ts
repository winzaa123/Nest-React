import { Injectable, Scope } from "@nestjs/common";
import { Resolver, Query, Mutation, Arg, FieldResolver } from "type-graphql";
import { Product } from "./inventory.entity";

import ProductService from "./product.service";

@Injectable({ scope: Scope.REQUEST })
@Resolver()
export class InventoryResolver {
    constructor(private readonly recipeService: ProductService) { }

    @Query(returns => [Product])
    recipes() {
        return this.recipeService.getAllProducts();
    }

}

