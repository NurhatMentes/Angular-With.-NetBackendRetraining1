import { Component, OnInit } from '@angular/core';
import { Category } from '../../models/category';
import { CategoryService } from '../../services/category.service';
import { right } from '@popperjs/core';
import { response } from 'express';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrl: './category.component.css'
})
export class CategoryComponent implements OnInit {
categories:Category[]=[];
dataLoaded = false;
currentCategory:Category={categoryId:1,categoryName:""};

constructor(private categoryService:CategoryService){}


ngOnInit(): void {
  this.getCategories();
}

getCategories(){
  this.categoryService.getProducts().subscribe(response=>{
    this.categories = response.data
   this.dataLoaded = true;
  });
}

setCurrentCategory(category:Category){
  this.currentCategory = category;
}

getCurrentCategoryClass(category:Category){
  if(category==this.currentCategory){
    return "list-group-item list-group-item-action active"
  }else{
    return "list-group-item list-group-item-action"
  }
}

}
