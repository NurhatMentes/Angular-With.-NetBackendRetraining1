import { Component, OnInit } from '@angular/core';
import { Product } from '../../models/product';
import { HttpClient } from '@angular/common/http';
import { ProductService } from '../../services/product.service';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CartService } from '../../services/cart.service';


@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent implements OnInit{
products:Product[]=[];
dataLoaded = false;
searchQuery: string = '';
filteredProducts: any[] = [];

constructor(private productService:ProductService, private activatedRoute:ActivatedRoute, 
  private toastr: ToastrService, private cartService:CartService){}

ngOnInit(): void {
  this.activatedRoute.params.subscribe(params=>{
    if(params["categoryId"])
    {
      this.getProductsByCategory(params["categoryId"])
    }else{
      this.getProducts();
    }
  })
}

getProducts() {
  this.productService.getProducts().subscribe(response => {
    this.products = response.data;
    this.filteredProducts = this.products; 
    this.dataLoaded = true;
  });
}

getProductsByCategory(categoryId:number){
  this.productService.getProductsByCategory(categoryId).subscribe(response=>{
    this.products = response.data
   this.dataLoaded = true;
  });
}

filterProducts() {
  this.filteredProducts = this.products.filter(product =>
    product.productName.toLowerCase().includes(this.searchQuery.toLowerCase())
  );
}

addToCard(product:Product){
this.toastr.success("Add to card",product.productName)
this.cartService.addToCart(product);
}

}
