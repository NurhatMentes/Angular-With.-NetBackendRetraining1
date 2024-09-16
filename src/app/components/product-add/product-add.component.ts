import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Category } from '../../models/category';
import { CategoryService } from '../../services/category.service';
import { ProductService } from '../../services/product.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrl: './product-add.component.css'
})
export class ProductAddComponent implements OnInit{

  productAddForm:FormGroup;
  categories: Category[] = [];

  constructor(private formBuilder:FormBuilder,private categoryService: CategoryService, 
    private productService:ProductService, private toastr: ToastrService,){}

  ngOnInit(): void {
    this.createProductAddForm();
    this.getCategories();
  }


  createProductAddForm() {
    this.productAddForm = this.formBuilder.group({   
      productName: ["", Validators.required],        
      categoryId: ["", Validators.required],              
      unitsInStock: ["", [Validators.required, Validators.min(1)]],  
      unitPrice: ["", [Validators.required, Validators.min(0.01)]]   
    });
  }

  getCategories() {
    this.categoryService.getCategories().subscribe(response => {
      this.categories = response.data;
    });
  }

  addProduct() {
    if (this.productAddForm.valid) {
      let product = Object.assign({}, this.productAddForm.value);
      this.productAddForm.reset();  
      this.productService.addProduct(product).subscribe(response => {
        this.toastr.success(response.message, "Success");
      }, responseError => {
        if (responseError.error && responseError.error.ValidationErrors) {
          for (let i = 0; i < responseError.error.ValidationErrors.length; i++) {
            this.toastr.error(responseError.error.ValidationErrors[i].ErrorMessage);
          }
        } else {
          // Eğer başka bir hata durumu varsa
          this.toastr.error("An unexpected error occurred.");
        }
      });
    } else {
      console.log("Check the form.", "Attention");
    }
  }
  

}