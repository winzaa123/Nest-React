import { Field, ObjectType } from 'type-graphql';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany } from 'typeorm';

@Entity()
export class ProductCategories {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column()
  name: string;

  @OneToMany(type => Product, v => v.categorie, { lazy: true })
  products: Product[]

}
@Entity()
@ObjectType()
export class Product {
  @Field()
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column()
  @Field()
  name: string;

  @Column({ type: "numeric" })
  @Field()
  price: number;

  @ManyToOne(type => ProductCategories, v => v.id, { lazy: true })
  categorie: ProductCategories

  @Column({ type: 'bigint', nullable: true })
  categorieId: number;
}