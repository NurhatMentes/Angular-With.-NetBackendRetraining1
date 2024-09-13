import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ProductList } from '../models/productList';
import { Product } from '../models/product';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  apiUrl="https://localhost:7228/api/Products/GetAll";


  constructor(private httpClient:HttpClient) { }

  getProducts():Observable<ProductList>{
    return this.httpClient.get<ProductList>(this.apiUrl);
    }
}
