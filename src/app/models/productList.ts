import { Product } from "./product";
import { ResponseModel } from "./responseModel";

export interface ProductList extends ResponseModel{
    data:Product[];
}