import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { FormsModule, NgModel } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../interfaces/product';
import { ProductService } from '../services/product.service';
import { ComponentDeactivate } from '../guards/leave-page.guard';
import { MinDateDirective } from '../validators/min-date.directive';

@Component({
  selector: 'app-product-edit',
  standalone: true,
  imports: [FormsModule, CommonModule, MinDateDirective],
  templateUrl: './product-edit.component.html',
  styleUrl: './product-edit.component.css'
})
export class ProductEditComponent implements ComponentDeactivate {
  @ViewChild('productForm', {static: true}) productForm?: NgModel;

  product?: Product;
  productImage: string = '';

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private productService: ProductService
  ) { }

  ngOnInit() {
    this.product = this.route.snapshot.data['product'];
    this.product!.available = this.product!.available.replace('.000Z', '');
  }

  canDeactivate() {
    return confirm('¿Quiere abandonar la página?. Los cambios no se guardarán.');
  }

  saveChanges() {
    if (this.product && this.productForm!.valid) {
      this.productService.updateProduct(this.product).subscribe({
        next: prod => {
          this.product = prod;
          this.router.navigate(['/products', this.product.id]);
        },
        error: err => console.error(err)
      });
    }
  }

  validClasses(ngModel: NgModel, validClass: string, errorClass: string) {
    return {
      [validClass]: ngModel.touched && ngModel.valid,
      [errorClass]: ngModel.touched && ngModel.invalid
    };
  }

  changeImage(fileInput: HTMLInputElement) {
    if (!this.product) { return; }
    if (!fileInput.files || fileInput.files.length === 0) return;

    const reader: FileReader = new FileReader();
    reader.readAsDataURL(fileInput.files[0]);
    reader.addEventListener('loadend', e => {
      this.product!.imageUrl = reader.result as string;
    });
  }
}
