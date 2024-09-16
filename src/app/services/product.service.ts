import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../models/product';
import { map, Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  apiUrl = 'https://localhost:7228/api/';

  constructor(private httpClient: HttpClient) {}

  getProducts(): Observable<ListResponseModel<Product>> {
    let newPath = this.apiUrl + 'products/getall';
    return this.httpClient.get<ListResponseModel<Product>>(newPath);
  }

  getProduct(productId: number): Observable<Product> {
    return this.httpClient.get<{data: Product}>(`${this.apiUrl}products/getbyid?productid=${productId}`) 
    .pipe(
      map(response => response.data) 
    );
  }

  getProductsByCategory(
    categoryId: number
  ): Observable<ListResponseModel<Product>> {
    let newPath =
      this.apiUrl + 'products/getallbycategoryid?categoryId=' + categoryId;
    return this.httpClient.get<ListResponseModel<Product>>(newPath);
  }

  addProduct(product: Product): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(
      this.apiUrl + 'products/productadd',
      product
    );
  }

  updateProduct(product: Product): Observable<ResponseModel> {
    return this.httpClient.put<ResponseModel>(
        `${this.apiUrl}products/productupdate`,
         product,
        { headers: { 'Content-Type': 'application/json' } }
    );
}

}


