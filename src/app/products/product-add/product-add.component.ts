import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, NgModel, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IProduct, Product } from '../../interfaces/product';
import { ProductService } from '../../services/product.service';
import { ComponentDeactivate } from '../../guards/leave-page.guard';
import { MinDateDirective } from '../../validators/min-date.directive';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { convertImageFromInput } from '../../image/imagetool';

@Component({
  selector: 'app-product-add',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MinDateDirective,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatDatepickerModule
  ],
  templateUrl: './product-add.component.html',
  styleUrl: './product-add.component.scss'
})
export class ProductAddComponent implements ComponentDeactivate {
  productForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(60)]),
    description: new FormControl(''),
    price: new FormControl('', [Validators.required, Validators.min(0)]),
    available: new FormControl(''),
    imageUrl: new FormControl('')
  });

  get name() {
    return this.productForm.get('name');
  }

  get description() {
    return this.productForm.get('description');
  }

  get price() {
    return this.productForm.get('price');
  }

  get available() {
    return this.productForm.get('available');
  }

  get imageUrl() {
    return this.productForm.get('imageUrl');
  }
  
  product: IProduct = new Product();
  productImage: string = '';

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private productService: ProductService
  ) { }

  canDeactivate() {
    if (this.productForm!.dirty)
      return confirm($localize`¿Quiere abandonar la página?. Los cambios no se guardarán.`);
    return true;
  }

  onSubmit() {
    if (this.product && this.productForm!.valid) {
      this.product.name = this.name!.value!;
      this.product.description = this.description!.value!;
      this.product.price = Number(this.price!.value!);
      this.product.available = this.available!.value!;
      this.product.imageUrl = this.imageUrl!.value!;

      this.productService.addProduct(this.product).subscribe({
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
    convertImageFromInput(fileInput, 200, 200).then((data: string) => {
      this.product!.imageUrl = data;
    });
  }
}
