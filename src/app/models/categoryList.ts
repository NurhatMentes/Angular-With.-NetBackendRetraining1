import { Category } from "./category";
import { ResponseModel } from "./responseModel";

export interface CategortList extends ResponseModel{
    data:Category[]
}