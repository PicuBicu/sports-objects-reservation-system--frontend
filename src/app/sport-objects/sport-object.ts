import { Address } from "app/models/entities/address";
import { Category } from "app/models/entities/category";

export interface SportObject {
  id: number;
  name: string;
  imageName: string;
  address: Address;
  categories: Set<Category>;
}
