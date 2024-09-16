import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoryService } from '../../services/category.service';
import { ProductService } from '../../services/product.service';
import { ToastrService } from 'ngx-toastr';
import { Category } from '../../models/category';
import { Product } from '../../models/product';

@Component({
  selector: 'app-product-update',
  templateUrl: './product-update.component.html',
  styleUrls: ['./product-update.component.css']
})
export class ProductUpdateComponent implements OnInit {
  productUpdateForm: FormGroup;
  categories: Category[] = [];
  products: Product[] = []; 
  selectedProductId: number | null = null;

  constructor(
    private formBuilder: FormBuilder,
    private categoryService: CategoryService,
    private productService: ProductService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.createProductUpdateForm();
    this.getCategories();
    this.getProducts(); 
  }

  createProductUpdateForm() {
    this.productUpdateForm = this.formBuilder.group({
        productId: [null], 
        categoryId: ["", Validators.required],
        productName: ["", Validators.required],
        unitsInStock: ["", [Validators.required, Validators.min(1)]],
        unitPrice: ["", [Validators.required, Validators.min(0.01)]]
    });
}


  getCategories() {
    this.categoryService.getCategories().subscribe(response => {
      this.categories = response.data;
    });
  }

  getProducts() {
    this.productService.getProducts().subscribe(response => {
      this.products = response.data;
    });
  }

  onProductChange(event: any): void {
    const target = event.target as HTMLSelectElement;
    const selectedProductId = +target.value;

    if (selectedProductId) {
        this.productService.getProduct(selectedProductId).subscribe(product => {
            this.productUpdateForm.patchValue({
                productId: product.productId, 
                categoryId: product.categoryId,
                productName: product.productName,
                unitsInStock: product.unitsInStock,
                unitPrice: product.unitPrice
            });
        }, error => {
            console.error("Error fetching product:", error);
        });
    }
}

  
updateProduct() {
  if (this.productUpdateForm.valid) {
      const formValues = this.productUpdateForm.value;
      console.log('Form values:', formValues);

      const product: Product = {
          productId: formValues.productId, 
          categoryId: formValues.categoryId,
          productName: formValues.productName,
          unitsInStock: formValues.unitsInStock,
          unitPrice: formValues.unitPrice
      };


      this.productService.updateProduct(product).subscribe(response => {
          this.toastr.success(response.message, "Success");
      }, error => {
          console.error('Error:', error); 
          if (error.error && error.error.errors) {
              const validationErrors = error.error.errors;
              for (const key in validationErrors) {
                  if (validationErrors.hasOwnProperty(key)) {
                      const errors = validationErrors[key];
                      errors.forEach((err: string) => this.toastr.error(err));
                  }
              }
          } else {
              this.toastr.error("An unexpected error occurred.");
          }
      });
  } else {
      this.toastr.error("Please correct the errors in the form.");
  }
}





}
