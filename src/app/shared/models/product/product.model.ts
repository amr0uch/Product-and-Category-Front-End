import { Category } from "../category/category.model";

export class Product {
  id!:string ;
  name!:string;
  description!:string;
  sellPrice!: number;
  buyPrice!: number;
  stock!: number;
  categories!: Category ;
  //= new Category();
}
