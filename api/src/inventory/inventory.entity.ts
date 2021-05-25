import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany } from 'typeorm';

@Entity()
export class ProductCategories {
   @PrimaryGeneratedColumn({type:'bigint'})
   id: number;

  @Column()
  name: string;

  @OneToMany(type => Product, v => v.categorie, { lazy: true })
  products: Product[]

}
@Entity()
export class Product {
   @PrimaryGeneratedColumn({type:'bigint'})
   id: number;

  @Column()
  name: string;

  @Column({type:"numeric"})
  price: number;

  @ManyToOne(type => ProductCategories, v =>  v.id,{lazy:true})
  categorie: ProductCategories

  @Column({ type: 'bigint',nullable:true })
  categorieId: number;
}