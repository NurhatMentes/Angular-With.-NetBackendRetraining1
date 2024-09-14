import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Category } from '../models/category';
import { ListResponseModel } from '../models/listResponseModel';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  apiUrl="https://localhost:7228/api/categories/getall";


  constructor(private httpClient:HttpClient) { }

  getCategories():Observable<ListResponseModel<Category>>{
    return this.httpClient.get<ListResponseModel<Category>>(this.apiUrl);
    }
}
